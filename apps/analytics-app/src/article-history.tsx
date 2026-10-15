import {useDocumentProjection, type DocumentHandle} from "@sanity/sdk-react";
import {articleHistory, articleTotals, formatCount, formatReadTime} from "./history";
import {studioDataset, studioProjectId} from "./studio";

const sectionLabels: Record<string, string> = {
  news: "News",
  culture: "Culture",
  opinion: "Opinion",
  features: "Features",
};

type ArticleDetail = {
  title: string | null;
  dek: string | null;
  section: string | null;
};

export function ArticleHistory({
  documentId,
  onBack,
}: {
  documentId: string;
  onBack?: () => void;
}) {
  const handle = {
    documentId,
    documentType: "article",
    projectId: studioProjectId,
    dataset: studioDataset,
  } as const satisfies DocumentHandle;
  const {data} = useDocumentProjection({
    ...handle,
    projection: `{
      title,
      dek,
      section
    }`,
  });
  const article = data as ArticleDetail | null;
  const history = articleHistory(documentId);
  const totals = articleTotals(history);
  const peak = Math.max(...history.map((point) => point.views));

  return (
    <article className="history">
      {onBack ? (
        <button className="back" type="button" onClick={onBack}>
          All articles
        </button>
      ) : null}
      <p className="kicker">{sectionLabels[article?.section ?? ""] ?? "Desk"}</p>
      <h2>{article?.title || "Untitled article"}</h2>
      {article?.dek ? <p className="dek">{article.dek}</p> : null}
      <dl className="totals">
        <div>
          <dt>Views, 24h</dt>
          <dd>{formatCount(totals.views)}</dd>
        </div>
        <div>
          <dt>Readers</dt>
          <dd>{formatCount(totals.readers)}</dd>
        </div>
        <div>
          <dt>Avg read</dt>
          <dd>{formatReadTime(totals.readSeconds)}</dd>
        </div>
        <div>
          <dt>Peak hour</dt>
          <dd>{totals.peak.label}</dd>
        </div>
      </dl>
      <h3>Last 24 hours</h3>
      <ol className="hours">
        {history.map((point) => (
          <li key={point.label}>
            <span
              className="bar"
              style={{height: `${Math.max(6, (point.views / peak) * 100)}%`}}
              title={`${point.label}: ${point.views} views`}
            />
            <span className="hour-label">{point.label}</span>
            <span className="sr-only">
              {point.views} views, {point.readers} readers, average read{" "}
              {formatReadTime(point.readSeconds)}
            </span>
          </li>
        ))}
      </ol>
      <p className="note">Readership is mocked from the article id and stays steady within each hour.</p>
    </article>
  );
}
