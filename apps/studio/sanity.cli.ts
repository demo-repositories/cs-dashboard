import {defineApplication, defineCliConfig} from 'sanity/cli'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET
const organizationId = process.env.SANITY_STUDIO_ORGANIZATION_ID

if (!projectId || !dataset || !organizationId) {
  throw new Error(
    'Set SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_DATASET, and SANITY_STUDIO_ORGANIZATION_ID',
  )
}

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  app: defineApplication({
    title: 'Studio',
    name: 'studio',
    slug: 'studio',
    organizationId,
  }),
  deployment: {
    autoUpdates: true,
  },
})
