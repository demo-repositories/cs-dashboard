import {SanityApp, type SanityConfig} from "@sanity/sdk-react";
import type {ReactNode} from "react";
import {studioDataset, studioProjectId} from "./studio";
import "./analytics.css";

const config: SanityConfig[] = [
  {
    projectId: studioProjectId,
    dataset: studioDataset,
  },
];

export function Providers({children}: {children: ReactNode}) {
  return (
    <SanityApp config={config} fallback={<p className="status">Opening the desk…</p>}>
      {children}
    </SanityApp>
  );
}
