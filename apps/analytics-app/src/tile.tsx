import {Suspense, useState} from "react";
import {useDocumentProjection, useDocuments, type DocumentHandle} from "@sanity/sdk-react";
import {unstable_defineView} from "sanity/dashboard";
import {articleHistory, articleTotals, formatCount, formatReadTime} from "./history";
import {Providers} from "./Providers";

function Summary() {
  const {data} = useDocuments({
    documentType: "article",
    perspective: "published",
    batchSize: 50,
  });
  const views = data.reduce(
    (sum, handle) => sum + articleTotals(articleHistory(handle.documentId)).views,
    0,
  );

  return (
    <div className="tile">
      <p className="kicker">Circulation</p>
      <p className="tile-count">{data.length === 0 ? "—" : formatCount(views)}</p>
      <p className="tile-caption">
        {data.length === 0
          ? "No published articles"
          : `views across ${data.length} article${data.length === 1 ? "" : "s"}, last 24h`}
      </p>
    </div>
  );
}

export default unstable_defineView("tile", {
  tile: () => (
    <Providers>
      <Suspense fallback={<p className="tile-caption">Counting…</p>}>
        <Summary />
      </Suspense>
    </Providers>
  ),
});
