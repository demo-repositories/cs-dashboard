import {Suspense} from "react";
import {useDocumentProjection, useDocuments, type DocumentHandle} from "@sanity/sdk-react";
import {articleHistory, articleTotals, formatCount, formatReadTime} from "./history";

const sectionLabels: Record<string, string> = {
  news: "News",
  culture: "Culture",
  opinion: "Opinion",
  features: "Features",
};

type ArticleCard = {
  title: string | null;
  dek: string | null;
  section: string | null;
};

export function ArticleList({onOpen}: {onOpen: (documentId: string) => void}) {
  const {data} = useDocuments({
    documentType: "article",
    perspective: "published",
    batchSize: 20,
    orderings: [{field: "publishedAt", direction: "desc"}],
  });

  if (data.length === 0) {
    return (
      <p className="status">
        No published articles yet. Publish one in Studio and this desk will attach mocked
        readership to it.
      </p>
    );
  }

  return (
    <ul className="index">
      {data.map((handle) => (
        <li key={handle.documentId}>
          <Suspense fallback={<p className="status">Loading article…</p>}>
            <ArticleRow handle={handle} onOpen={onOpen} />
          </Suspense>
        </li>
      ))}
    </ul>
  );
}

function ArticleRow({
  handle,
  onOpen,
}: {
  handle: DocumentHandle;
  onOpen: (documentId: string) => void;
}) {
  const {data} = useDocumentProjection({
    ...handle,
    projection: `{
      title,
      dek,
      section
    }`,
  });
  const article = data as ArticleCard | null;
  const history = articleHistory(handle.documentId);
  const totals = articleTotals(history);
  const peak = Math.max(...history.map((point) => point.views));

  return (
    <button className="story" type="button" onClick={() => onOpen(handle.documentId)}>
      <span className="kicker">{sectionLabels[article?.section ?? ""] ?? "Desk"}</span>
      <span className="story-title">{article?.title || "Untitled article"}</span>
      {article?.dek ? <span className="dek">{article.dek}</span> : null}
      <span className="story-meta">
        <span>
          <strong>{formatCount(totals.views)}</strong> views
        </span>
        <span>
          <strong>{formatCount(totals.readers)}</strong> readers
        </span>
        <span>
          <strong>{formatReadTime(totals.readSeconds)}</strong> avg read
        </span>
      </span>
      <span className="spark" aria-hidden="true">
        {history.map((point) => (
          <i key={point.label} style={{height: `${Math.max(8, (point.views / peak) * 100)}%`}} />
        ))}
      </span>
    </button>
  );
}
