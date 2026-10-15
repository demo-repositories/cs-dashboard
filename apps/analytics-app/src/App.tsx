import { Suspense, useState } from "react";
import { useNavigate } from "@sanity/sdk-react/dashboard";
import { ArticleHistory } from "./article-history";
import { ArticleList } from "./article-list";
import { Providers } from "./Providers";

function articleIdFromPath(path: string) {
  const match = path.match(/^articles\/([^/?#]+)/);
  return match?.[1] ?? null;
}

function Desk() {
  const [articleId, setArticleId] = useState<string | null>(null);
  const navigate = useNavigate(({ path }) => {
    setArticleId(articleIdFromPath(path));
  });

  function openArticle(documentId: string) {
    setArticleId(documentId);
    navigate({ path: `articles/${documentId}` });
  }

  function closeArticle() {
    setArticleId(null);
    navigate({ path: "" });
  }

  return (
    <main className="desk">
      <header className="mast">
        <p className="kicker">Analytics app</p>
        <h1>Circulation</h1>
        <p className="lede">
          Mocked readership for every article published in Studio.
        </p>
      </header>
      <Suspense fallback={<p className="status">Counting the last day…</p>}>
        {articleId ? (
          <ArticleHistory documentId={articleId} onBack={closeArticle} />
        ) : (
          <ArticleList onOpen={openArticle} />
        )}
      </Suspense>
    </main>
  );
}

export default function App() {
  return (
    <Providers>
      <Desk />
    </Providers>
  );
}
