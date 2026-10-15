import { unstable_defineView } from "sanity/dashboard";
import { Providers } from "./Providers";
import { useTopic } from "@sanity/sdk-react/dashboard";
import { ArticleHistory } from "./article-history";

function Panel() {
  const topic = useTopic("applications.context");
  console.log(topic);
  return (
    <div>
      <h1>Analytics panel</h1>
      {topic?.document?.id ? (
        <ArticleHistory documentId={topic.document.id} />
      ) : (
        <p>No document selected</p>
      )}
    </div>
  );
}
export default unstable_defineView("panel", {
  title: ({ view }) => view.title,
  panel: () => (
    <Providers>
      <Panel />
    </Providers>
  ),
});
