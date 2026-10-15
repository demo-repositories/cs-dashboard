import {Suspense} from "react";
import {unstable_defineView} from "sanity/dashboard";
import {useOpenArticleId} from "./article-context";
import {ArticleHistory} from "./article-history";
import {Providers} from "./Providers";

function PanelBody() {
  const documentId = useOpenArticleId();

  return (
    <section className="panel">
      <p className="kicker">Open article</p>
      {documentId ? (
        <>
          <p className="doc-id">{documentId}</p>
          <Suspense fallback={<p className="status">Loading the article…</p>}>
            <ArticleHistory documentId={documentId} />
          </Suspense>
        </>
      ) : (
        <p className="status">Open an article in Circulation to follow it here.</p>
      )}
    </section>
  );
}

export default unstable_defineView("panel", {
  title: ({view}) => view.title,
  panel: () => (
    <Providers>
      <Suspense fallback={<p className="status">Waiting for an article…</p>}>
        <PanelBody />
      </Suspense>
    </Providers>
  ),
});
