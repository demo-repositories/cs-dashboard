import {
  defineApplication,
  defineCliConfig,
  definePanelView,
  defineTileView,
  defineWebWorker,
  defineWindowView,
} from "sanity/cli";

const organizationId = process.env.SANITY_APP_ORGANIZATION_ID;

if (!organizationId) {
  throw new Error("Set SANITY_APP_ORGANIZATION_ID");
}

export default defineCliConfig({
  app: defineApplication({
    title: "Analytics app",
    name: "analytics-app",
    slug: "analytics-app",
    organizationId,
    // entry: "./src/App.tsx",
    views: [
      defineWindowView({
        name: "main",
        title: "Analytics",
        src: "./src/window.tsx",
      }),
      defineTileView({
        name: "circulation",
        title: "Circulation",
        src: "./src/tile.tsx",
        size: "large",
        order: 10,
      }),
      definePanelView({
        name: "analytics",
        title: "Analytics Panel",
        src: "./src/panel.tsx",
      }),
    ],
    // webWorkers: [
    //   defineWebWorker({name: 'sync', title: 'Content sync', src: './src/worker.ts'}),
    // ],
  }),
});
