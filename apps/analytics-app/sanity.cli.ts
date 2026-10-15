import { defineApplication, defineCliConfig } from "sanity/cli";

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
    entry: "./src/App.tsx",
    views: [
      // known issue with window views so use the entry for displaying the app
      // defineWindowView({
      //   name: "main",
      //   title: "Analytics",
      //   src: "./src/window.tsx",
      // }),
    ],
  }),
});
