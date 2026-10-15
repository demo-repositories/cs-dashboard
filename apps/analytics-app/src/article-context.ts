import {useMemo} from "react";
import {useApplicationContext, useTopic} from "@sanity/sdk-react/dashboard";
import {studioDataset, studioProjectId} from "./studio";

const resource = {
  id: `${studioProjectId}.${studioDataset}`,
  type: "dataset" as const,
};

export function usePublishArticle(documentId: string | null) {
  const context = useMemo(
    () => (documentId ? {resource, document: {id: documentId}} : null),
    [documentId],
  );
  useApplicationContext(context);
}

export function useOpenArticleId() {
  const context = useTopic("applications.context");
  return context?.document?.id ?? null;
}
