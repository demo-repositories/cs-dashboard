const projectId = process.env.SANITY_APP_PROJECT_ID;
const dataset = process.env.SANITY_APP_DATASET;

if (!projectId || !dataset) {
  throw new Error("Set SANITY_APP_PROJECT_ID and SANITY_APP_DATASET");
}

export const studioProjectId = projectId;
export const studioDataset = dataset;
