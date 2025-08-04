import { createJiti } from "../../../node_modules/.pnpm/jiti@2.4.2/node_modules/jiti/lib/jiti.mjs";

const jiti = createJiti(import.meta.url, {
  "interopDefault": true,
  "alias": {
    "@vben/tailwind-config": "D:/流量录制和回放/osmo-vue3/internal/tailwind-config"
  },
  "transformOptions": {
    "babel": {
      "plugins": []
    }
  }
})

/** @type {import("D:/流量录制和回放/osmo-vue3/internal/tailwind-config/src/postcss.config.js")} */
const _module = await jiti.import("D:/流量录制和回放/osmo-vue3/internal/tailwind-config/src/postcss.config.ts");

export default _module?.default ?? _module;