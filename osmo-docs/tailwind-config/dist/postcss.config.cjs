const { createJiti } = require("../../../node_modules/.pnpm/jiti@2.4.2/node_modules/jiti/lib/jiti.cjs")

const jiti = createJiti(__filename, {
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
module.exports = jiti("D:/流量录制和回放/osmo-vue3/internal/tailwind-config/src/postcss.config.ts")