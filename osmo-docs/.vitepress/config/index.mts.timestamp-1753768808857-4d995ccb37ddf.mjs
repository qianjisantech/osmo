// .vitepress/config/index.mts
import { withPwa } from "file:///D:/%E6%B5%81%E9%87%8F%E5%BD%95%E5%88%B6%E5%92%8C%E5%9B%9E%E6%94%BE/osmo-vue3/node_modules/.pnpm/@vite-pwa+vitepress@1.0.0_vite-plugin-pwa@1.0.1_vite@5.4.18_@types+node@22.16.0_less@4._05fae118853e191cc54f7527ee997d31/node_modules/@vite-pwa/vitepress/dist/index.mjs";
import { defineConfigWithTheme } from "file:///D:/%E6%B5%81%E9%87%8F%E5%BD%95%E5%88%B6%E5%92%8C%E5%9B%9E%E6%94%BE/osmo-vue3/node_modules/.pnpm/vitepress@1.6.3_@algolia+client-search@5.23.4_@types+node@22.16.0_async-validator@4.2.5_ad674ef88d58bdb2716d55dc92f3e305/node_modules/vitepress/dist/node/index.js";

// .vitepress/config/en.mts
import { defineConfig } from "file:///D:/%E6%B5%81%E9%87%8F%E5%BD%95%E5%88%B6%E5%92%8C%E5%9B%9E%E6%94%BE/osmo-vue3/node_modules/.pnpm/vitepress@1.6.3_@algolia+client-search@5.23.4_@types+node@22.16.0_async-validator@4.2.5_ad674ef88d58bdb2716d55dc92f3e305/node_modules/vitepress/dist/node/index.js";

// ../package.json
var version = "5.5.7";

// .vitepress/config/en.mts
var en = defineConfig({
  description: "Osmo & Enterprise level management system framework",
  lang: "en-US",
  themeConfig: {
    darkModeSwitchLabel: "Theme",
    darkModeSwitchTitle: "Switch to Dark Mode",
    docFooter: {
      next: "Next Page",
      prev: "Previous Page"
    },
    editLink: {
      pattern: "https://github.com/vbenjs/vue-vben-admin/edit/main/docs/src/:path",
      text: "Edit this page on GitHub"
    },
    footer: {
      copyright: `Copyright \xA9 2020-${(/* @__PURE__ */ new Date()).getFullYear()} Vben`,
      message: "Released under the MIT License."
    },
    langMenuLabel: "Language",
    lastUpdated: {
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium"
      },
      text: "Last updated on"
    },
    lightModeSwitchTitle: "Switch to Light Mode",
    nav: nav(),
    outline: {
      label: "Navigate"
    },
    returnToTopLabel: "Back to top",
    sidebar: {
      "/en/commercial/": {
        base: "/en/commercial/",
        items: sidebarCommercial()
      },
      "/en/guide/": { base: "/en/guide/", items: sidebarGuide() }
    }
  }
});
function sidebarGuide() {
  return [
    {
      collapsed: false,
      text: "Introduction",
      items: [
        {
          link: "introduction/vben",
          text: "About Osmo"
        },
        {
          link: "introduction/why",
          text: "Why Choose Us?"
        },
        { link: "introduction/quick-start", text: "Quick Start" },
        { link: "introduction/thin", text: "Lite Version" }
      ]
    },
    {
      text: "Basics",
      items: [
        { link: "essentials/concept", text: "Basic Concepts" },
        { link: "essentials/development", text: "Local Development" },
        { link: "essentials/route", text: "Routing and Menu" },
        { link: "essentials/settings", text: "Configuration" },
        { link: "essentials/icons", text: "Icons" },
        { link: "essentials/styles", text: "Styles" },
        { link: "essentials/external-module", text: "External Modules" },
        { link: "essentials/build", text: "Build and Deployment" },
        { link: "essentials/server", text: "Server Interaction and Data Mock" }
      ]
    },
    {
      text: "Advanced",
      items: [
        { link: "in-depth/login", text: "Login" },
        { link: "in-depth/theme", text: "Theme" },
        { link: "in-depth/access", text: "Access Control" },
        { link: "in-depth/locale", text: "Internationalization" },
        { link: "in-depth/features", text: "Common Features" },
        { link: "in-depth/check-updates", text: "Check Updates" },
        { link: "in-depth/loading", text: "Global Loading" },
        { link: "in-depth/ui-framework", text: "UI Framework Switching" }
      ]
    },
    {
      text: "Engineering",
      items: [
        { link: "project/standard", text: "Standards" },
        { link: "project/cli", text: "CLI" },
        { link: "project/dir", text: "Directory Explanation" },
        { link: "project/test", text: "Unit Testing" },
        { link: "project/tailwindcss", text: "Tailwind CSS" },
        { link: "project/changeset", text: "Changeset" },
        { link: "project/vite", text: "Vite Config" }
      ]
    },
    {
      text: "Others",
      items: [
        { link: "other/project-update", text: "Project Update" },
        { link: "other/remove-code", text: "Remove Code" },
        { link: "other/faq", text: "FAQ" }
      ]
    }
  ];
}
function sidebarCommercial() {
  return [
    {
      link: "community",
      text: "Community"
    },
    {
      link: "technical-support",
      text: "Technical-support"
    },
    {
      link: "customized",
      text: "Customized"
    }
  ];
}
function nav() {
  return [
    {
      activeMatch: "^/en/(guide|components)/",
      text: "Doc",
      items: [
        {
          activeMatch: "^/en/guide/",
          link: "/en/guide/introduction/vben",
          text: "Guide"
        },
        // {
        //   activeMatch: '^/en/components/',
        //   link: '/en/components/introduction',
        //   text: 'Components',
        // },
        {
          text: "Historical Versions",
          items: [
            {
              link: "https://doc.vvbin.cn",
              text: "2.x Version Documentation"
            }
          ]
        }
      ]
    },
    {
      text: "Demo",
      items: [
        {
          text: "Osmo",
          items: [
            {
              link: "https://www.vben.pro",
              text: "Demo Version"
            },
            {
              link: "https://ant.vben.pro",
              text: "Ant Design Vue Version"
            },
            {
              link: "https://naive.vben.pro",
              text: "Naive Version"
            },
            {
              link: "https://ele.vben.pro",
              text: "Element Plus Version"
            }
          ]
        },
        {
          text: "Others",
          items: [
            {
              link: "https://vben.vvbin.cn",
              text: "Osmo 2.x"
            }
          ]
        }
      ]
    },
    {
      text: version,
      items: [
        {
          link: "https://github.com/vbenjs/vue-vben-admin/releases",
          text: "Changelog"
        },
        {
          link: "https://github.com/orgs/vbenjs/projects/5",
          text: "Roadmap"
        },
        {
          link: "https://github.com/vbenjs/vue-vben-admin/blob/main/.github/contributing.md",
          text: "Contribution"
        }
      ]
    },
    {
      link: "/commercial/technical-support",
      text: "\u{1F984} Tech Support"
    },
    {
      link: "/sponsor/personal",
      text: "\u2728 Sponsor"
    },
    {
      link: "/commercial/community",
      text: "\u{1F468}\u200D\u{1F466}\u200D\u{1F466} Community"
    }
    // {
    //   link: '/friend-links/',
    //   text: '🤝 Friend Links',
    // },
  ];
}

// .vitepress/config/shared.mts
import { resolve } from "node:path";
import {
  viteArchiverPlugin,
  viteVxeTableImportsPlugin
} from "file:///D:/%E6%B5%81%E9%87%8F%E5%BD%95%E5%88%B6%E5%92%8C%E5%9B%9E%E6%94%BE/osmo-vue3/internal/vite-config/dist/index.mjs";
import {
  GitChangelog,
  GitChangelogMarkdownSection
} from "file:///D:/%E6%B5%81%E9%87%8F%E5%BD%95%E5%88%B6%E5%92%8C%E5%9B%9E%E6%94%BE/osmo-vue3/node_modules/.pnpm/@nolebase+vitepress-plugin-git-changelog@2.18.0_typescript@5.8.3_vitepress@1.6.3_@algol_e9c330cce53c87984f3933f09e8f6773/node_modules/@nolebase/vitepress-plugin-git-changelog/dist/vite/index.mjs";
import tailwind from "file:///D:/%E6%B5%81%E9%87%8F%E5%BD%95%E5%88%B6%E5%92%8C%E5%9B%9E%E6%94%BE/osmo-vue3/node_modules/.pnpm/tailwindcss@3.4.17/node_modules/tailwindcss/lib/index.js";
import { defineConfig as defineConfig3, postcssIsolateStyles } from "file:///D:/%E6%B5%81%E9%87%8F%E5%BD%95%E5%88%B6%E5%92%8C%E5%9B%9E%E6%94%BE/osmo-vue3/node_modules/.pnpm/vitepress@1.6.3_@algolia+client-search@5.23.4_@types+node@22.16.0_async-validator@4.2.5_ad674ef88d58bdb2716d55dc92f3e305/node_modules/vitepress/dist/node/index.js";
import {
  groupIconMdPlugin,
  groupIconVitePlugin
} from "file:///D:/%E6%B5%81%E9%87%8F%E5%BD%95%E5%88%B6%E5%92%8C%E5%9B%9E%E6%94%BE/osmo-vue3/node_modules/.pnpm/vitepress-plugin-group-icons@1.6.1_markdown-it@14.1.0_vite@5.4.18_@types+node@22.16.0_l_064b5a096b6908f4fb4f59f2da0be951/node_modules/vitepress-plugin-group-icons/dist/index.js";

// .vitepress/config/plugins/demo-preview.ts
import crypto from "node:crypto";
import { readdirSync } from "node:fs";
import { join } from "node:path";
var rawPathRegexp = (
  // eslint-disable-next-line regexp/no-super-linear-backtracking, regexp/strict
  /^(.+?(?:\.([\da-z]+))?)(#[\w-]+)?(?: ?{(\d+(?:[,-]\d+)*)? ?(\S+)?})? ?(?:\[(.+)])?$/
);
function rawPathToToken(rawPath) {
  const [
    filepath = "",
    extension = "",
    region = "",
    lines = "",
    lang = "",
    rawTitle = ""
  ] = (rawPathRegexp.exec(rawPath) || []).slice(1);
  const title = rawTitle || filepath.split("/").pop() || "";
  return { extension, filepath, lang, lines, region, title };
}
var demoPreviewPlugin = (md) => {
  md.core.ruler.after("inline", "demo-preview", (state) => {
    const insertComponentImport = (importString) => {
      const index = state.tokens.findIndex(
        (i) => i.type === "html_block" && i.content.match(/<script setup>/g)
      );
      if (index === -1) {
        const importComponent = new state.Token("html_block", "", 0);
        importComponent.content = `<script setup>
${importString}
</script>
`;
        state.tokens.splice(0, 0, importComponent);
      } else {
        if (state.tokens[index]) {
          const content = state.tokens[index].content;
          state.tokens[index].content = content.replace(
            "</script>",
            `${importString}
</script>`
          );
        }
      }
    };
    const regex = /<DemoPreview[^>]*\sdir="([^"]*)"/g;
    state.src = state.src.replaceAll(regex, (_match, dir) => {
      const componentDir = join(process.cwd(), "src", dir).replaceAll(
        "\\",
        "/"
      );
      let childFiles = [];
      let dirExists = true;
      try {
        childFiles = readdirSync(componentDir, {
          encoding: "utf8",
          recursive: false,
          withFileTypes: false
        }) || [];
      } catch {
        dirExists = false;
      }
      if (!dirExists) {
        return "";
      }
      const uniqueWord = generateContentHash(componentDir);
      const ComponentName = `DemoComponent_${uniqueWord}`;
      insertComponentImport(
        `import ${ComponentName} from '${componentDir}/index.vue'`
      );
      const { path: _path } = state.env;
      const index = state.tokens.findIndex((i) => i.content.match(regex));
      if (!state.tokens[index]) {
        return "";
      }
      const firstString = "index.vue";
      childFiles = childFiles.sort((a, b) => {
        if (a === firstString) return -1;
        if (b === firstString) return 1;
        return a.localeCompare(b, "en", { sensitivity: "base" });
      });
      state.tokens[index].content = `<DemoPreview files="${encodeURIComponent(JSON.stringify(childFiles))}" ><${ComponentName}/>
        `;
      const _dummyToken = new state.Token("", "", 0);
      const tokenArray = [];
      childFiles.forEach((filename) => {
        const templateStart = new state.Token("html_inline", "", 0);
        templateStart.content = `<template #${filename}>`;
        tokenArray.push(templateStart);
        const resolvedPath = join(componentDir, filename);
        const { extension, filepath, lang, lines, title } = rawPathToToken(resolvedPath);
        const token = new state.Token("fence", "code", 0);
        token.info = `${lang || extension}${lines ? `{${lines}}` : ""}${title ? `[${title}]` : ""}`;
        token.content = `<<< ${filepath}`;
        token.src = [resolvedPath];
        tokenArray.push(token);
        const templateEnd = new state.Token("html_inline", "", 0);
        templateEnd.content = "</template>";
        tokenArray.push(templateEnd);
      });
      const endTag = new state.Token("html_inline", "", 0);
      endTag.content = "</DemoPreview>";
      tokenArray.push(endTag);
      state.tokens.splice(index + 1, 0, ...tokenArray);
      return "";
    });
  });
};
function generateContentHash(input, length = 10) {
  const hash = crypto.createHash("sha256").update(input).digest("hex");
  return Number.parseInt(hash, 16).toString(36).slice(0, length);
}

// .vitepress/config/zh.mts
import { defineConfig as defineConfig2 } from "file:///D:/%E6%B5%81%E9%87%8F%E5%BD%95%E5%88%B6%E5%92%8C%E5%9B%9E%E6%94%BE/osmo-vue3/node_modules/.pnpm/vitepress@1.6.3_@algolia+client-search@5.23.4_@types+node@22.16.0_async-validator@4.2.5_ad674ef88d58bdb2716d55dc92f3e305/node_modules/vitepress/dist/node/index.js";
var zh = defineConfig2({
  description: "Vben Admin & \u4F01\u4E1A\u7EA7\u7BA1\u7406\u7CFB\u7EDF\u6846\u67B6",
  lang: "zh-Hans",
  themeConfig: {
    darkModeSwitchLabel: "\u4E3B\u9898",
    darkModeSwitchTitle: "\u5207\u6362\u5230\u6DF1\u8272\u6A21\u5F0F",
    docFooter: {
      next: "\u4E0B\u4E00\u9875",
      prev: "\u4E0A\u4E00\u9875"
    },
    editLink: {
      pattern: "https://github.com/vbenjs/vue-vben-admin/edit/main/docs/src/:path",
      text: "\u5728 GitHub \u4E0A\u7F16\u8F91\u6B64\u9875\u9762"
    },
    footer: {
      copyright: `Copyright \xA9 2020-${(/* @__PURE__ */ new Date()).getFullYear()} Vben`,
      message: "\u57FA\u4E8E MIT \u8BB8\u53EF\u53D1\u5E03."
    },
    langMenuLabel: "\u591A\u8BED\u8A00",
    lastUpdated: {
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium"
      },
      text: "\u6700\u540E\u66F4\u65B0\u4E8E"
    },
    lightModeSwitchTitle: "\u5207\u6362\u5230\u6D45\u8272\u6A21\u5F0F",
    nav: nav2(),
    outline: {
      label: "\u9875\u9762\u5BFC\u822A"
    },
    returnToTopLabel: "\u56DE\u5230\u9876\u90E8",
    sidebar: {
      "/commercial/": { base: "/commercial/", items: sidebarCommercial2() },
      "/components/": { base: "/components/", items: sidebarComponents() },
      "/guide/": { base: "/guide/", items: sidebarGuide2() }
    },
    sidebarMenuLabel: "\u83DC\u5355"
  }
});
function sidebarGuide2() {
  return [
    {
      collapsed: false,
      text: "\u7B80\u4ECB",
      items: [
        {
          link: "introduction/vben",
          text: "\u5173\u4E8E Osmo"
        },
        {
          link: "introduction/why",
          text: "\u4E3A\u4EC0\u4E48\u9009\u62E9\u6211\u4EEC?"
        },
        { link: "introduction/quick-start", text: "\u5FEB\u901F\u5F00\u59CB" },
        { link: "introduction/thin", text: "\u7CBE\u7B80\u7248\u672C" },
        {
          base: "/",
          link: "components/introduction",
          text: "\u7EC4\u4EF6\u6587\u6863"
        }
      ]
    },
    {
      text: "\u57FA\u7840",
      items: [
        { link: "essentials/concept", text: "\u57FA\u7840\u6982\u5FF5" },
        { link: "essentials/development", text: "\u672C\u5730\u5F00\u53D1" },
        { link: "essentials/route", text: "\u8DEF\u7531\u548C\u83DC\u5355" },
        { link: "essentials/settings", text: "\u914D\u7F6E" },
        { link: "essentials/icons", text: "\u56FE\u6807" },
        { link: "essentials/styles", text: "\u6837\u5F0F" },
        { link: "essentials/external-module", text: "\u5916\u90E8\u6A21\u5757" },
        { link: "essentials/build", text: "\u6784\u5EFA\u4E0E\u90E8\u7F72" },
        { link: "essentials/server", text: "\u670D\u52A1\u7AEF\u4EA4\u4E92\u4E0E\u6570\u636EMock" }
      ]
    },
    {
      text: "\u6DF1\u5165",
      items: [
        { link: "in-depth/login", text: "\u767B\u5F55" },
        // { link: 'in-depth/layout', text: '布局' },
        { link: "in-depth/theme", text: "\u4E3B\u9898" },
        { link: "in-depth/access", text: "\u6743\u9650" },
        { link: "in-depth/locale", text: "\u56FD\u9645\u5316" },
        { link: "in-depth/features", text: "\u5E38\u7528\u529F\u80FD" },
        { link: "in-depth/check-updates", text: "\u68C0\u67E5\u66F4\u65B0" },
        { link: "in-depth/loading", text: "\u5168\u5C40loading" },
        { link: "in-depth/ui-framework", text: "\u7EC4\u4EF6\u5E93\u5207\u6362" }
      ]
    },
    {
      text: "\u5DE5\u7A0B",
      items: [
        { link: "project/standard", text: "\u89C4\u8303" },
        { link: "project/cli", text: "CLI" },
        { link: "project/dir", text: "\u76EE\u5F55\u8BF4\u660E" },
        { link: "project/test", text: "\u5355\u5143\u6D4B\u8BD5" },
        { link: "project/tailwindcss", text: "Tailwind CSS" },
        { link: "project/changeset", text: "Changeset" },
        { link: "project/vite", text: "Vite Config" }
      ]
    },
    {
      text: "\u5176\u4ED6",
      items: [
        { link: "other/project-update", text: "\u9879\u76EE\u66F4\u65B0" },
        { link: "other/remove-code", text: "\u79FB\u9664\u4EE3\u7801" },
        { link: "other/faq", text: "\u5E38\u89C1\u95EE\u9898" }
      ]
    }
  ];
}
function sidebarCommercial2() {
  return [
    {
      link: "community",
      text: "\u4EA4\u6D41\u7FA4"
    },
    {
      link: "technical-support",
      text: "\u6280\u672F\u652F\u6301"
    },
    {
      link: "customized",
      text: "\u5B9A\u5236\u5F00\u53D1"
    }
  ];
}
function sidebarComponents() {
  return [
    {
      text: "\u7EC4\u4EF6",
      items: [
        {
          link: "introduction",
          text: "\u4ECB\u7ECD"
        }
      ]
    },
    {
      collapsed: false,
      text: "\u5E03\u5C40\u7EC4\u4EF6",
      items: [
        {
          link: "layout-ui/page",
          text: "Page \u9875\u9762"
        }
      ]
    },
    {
      collapsed: false,
      text: "\u901A\u7528\u7EC4\u4EF6",
      items: [
        {
          link: "common-ui/vben-api-component",
          text: "ApiComponent Api\u7EC4\u4EF6\u5305\u88C5\u5668"
        },
        {
          link: "common-ui/vben-alert",
          text: "Alert \u8F7B\u91CF\u63D0\u793A\u6846"
        },
        {
          link: "common-ui/vben-modal",
          text: "Modal \u6A21\u6001\u6846"
        },
        {
          link: "common-ui/vben-drawer",
          text: "Drawer \u62BD\u5C49"
        },
        {
          link: "common-ui/vben-form",
          text: "Form \u8868\u5355"
        },
        {
          link: "common-ui/vben-vxe-table",
          text: "Vxe Table \u8868\u683C"
        },
        {
          link: "common-ui/vben-count-to-animator",
          text: "CountToAnimator \u6570\u5B57\u52A8\u753B"
        },
        {
          link: "common-ui/vben-ellipsis-text",
          text: "EllipsisText \u7701\u7565\u6587\u672C"
        }
      ]
    }
  ];
}
function nav2() {
  return [
    {
      activeMatch: "^/(guide|components)/",
      text: "\u6587\u6863",
      items: [
        {
          activeMatch: "^/guide/",
          link: "/guide/introduction/vben",
          text: "\u6307\u5357"
        },
        {
          activeMatch: "^/components/",
          link: "/components/introduction",
          text: "\u7EC4\u4EF6"
        },
        {
          text: "\u5386\u53F2\u7248\u672C",
          items: [
            {
              link: "https://doc.vvbin.cn",
              text: "2.x\u7248\u672C\u6587\u6863"
            }
          ]
        }
      ]
    },
    {
      text: "\u7CFB\u7EDF\u5730\u5740",
      items: [
        {
          text: "Osmo",
          items: [
            {
              link: "https://www.vben.pro",
              text: "0.0.1\u7248\u672C"
            }
            // {
            //   link: 'https://ant.vben.pro',
            //   text: 'Ant Design Vue 版本',
            // },
            // {
            //   link: 'https://naive.vben.pro',
            //   text: 'Naive 版本',
            // },
            // {
            //   link: 'https://ele.vben.pro',
            //   text: 'Element Plus版本',
            // },
          ]
        }
        // {
        //   text: '其他',
        //   items: [
        //     {
        //       link: 'https://vben.vvbin.cn',
        //       text: 'Osmo 2.x',
        //     },
        //   ],
        // },
      ]
    },
    // {
    //   text: version,
    //   items: [
    //     {
    //       link: 'https://github.com/vbenjs/vue-vben-admin/releases',
    //       text: '更新日志',
    //     },
    //     {
    //       link: 'https://github.com/orgs/vbenjs/projects/5',
    //       text: '路线图',
    //     },
    //     {
    //       link: 'https://github.com/vbenjs/vue-vben-admin/blob/main/.github/contributing.md',
    //       text: '贡献',
    //     },
    //   ],
    // },{
    //   text: version,
    //   items: [
    //     {
    //       link: 'https://github.com/vbenjs/vue-vben-admin/releases',
    //       text: '更新日志',
    //     },
    //     {
    //       link: 'https://github.com/orgs/vbenjs/projects/5',
    //       text: '路线图',
    //     },
    //     {
    //       link: 'https://github.com/vbenjs/vue-vben-admin/blob/main/.github/contributing.md',
    //       text: '贡献',
    //     },
    //   ],
    // },
    // {
    //   link: '/commercial/technical-support',
    //   text: '🦄 技术支持',
    // },
    // {
    //   link: '/sponsor/personal',
    //   text: '✨ 赞助',
    // },
    {
      link: "/commercial/community",
      text: "\u{1F468}\u200D\u{1F466}\u200D\u{1F466} \u4EA4\u6D41\u7FA4"
      // items: [
      //   {
      //     link: 'https://qun.qq.com/qqweb/qunpro/share?_wv=3&_wwv=128&appChannel=share&inviteCode=22ySzj7pKiw&businessType=9&from=246610&biz=ka&mainSourceId=share&subSourceId=others&jumpsource=shorturl#/pc',
      //     text: 'QQ频道',
      //   },
      //   {
      //     link: 'https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=mjZmlhgVzzUxvdxllB6C1vHpX8O8QRL0&authKey=DBdFbBwERmfaKY95JvRWqLCJIRGJAmKyZbrpzZ41EKDMZ5SR6MfbjOBaaNRN73fr&noverify=0&group_code=4286109',
      //     text: 'QQ群',
      //   },
      //   {
      //     link: 'https://discord.gg/VU62jTecad',
      //     text: 'Discord',
      //   },
      // ],
    }
    // {
    //   link: '/friend-links/',
    //   text: '🤝 友情链接',
    // },
  ];
}
var search = {
  root: {
    placeholder: "\u641C\u7D22\u6587\u6863",
    translations: {
      button: {
        buttonAriaLabel: "\u641C\u7D22\u6587\u6863",
        buttonText: "\u641C\u7D22\u6587\u6863"
      },
      modal: {
        errorScreen: {
          helpText: "\u4F60\u53EF\u80FD\u9700\u8981\u68C0\u67E5\u4F60\u7684\u7F51\u7EDC\u8FDE\u63A5",
          titleText: "\u65E0\u6CD5\u83B7\u53D6\u7ED3\u679C"
        },
        footer: {
          closeText: "\u5173\u95ED",
          navigateText: "\u5207\u6362",
          searchByText: "\u641C\u7D22\u63D0\u4F9B\u8005",
          selectText: "\u9009\u62E9"
        },
        noResultsScreen: {
          noResultsText: "\u65E0\u6CD5\u627E\u5230\u76F8\u5173\u7ED3\u679C",
          reportMissingResultsLinkText: "\u70B9\u51FB\u53CD\u9988",
          reportMissingResultsText: "\u4F60\u8BA4\u4E3A\u8BE5\u67E5\u8BE2\u5E94\u8BE5\u6709\u7ED3\u679C\uFF1F",
          suggestedQueryText: "\u4F60\u53EF\u4EE5\u5C1D\u8BD5\u67E5\u8BE2"
        },
        searchBox: {
          cancelButtonAriaLabel: "\u53D6\u6D88",
          cancelButtonText: "\u53D6\u6D88",
          resetButtonAriaLabel: "\u6E05\u9664\u67E5\u8BE2\u6761\u4EF6",
          resetButtonTitle: "\u6E05\u9664\u67E5\u8BE2\u6761\u4EF6"
        },
        startScreen: {
          favoriteSearchesTitle: "\u6536\u85CF",
          noRecentSearchesText: "\u6CA1\u6709\u641C\u7D22\u5386\u53F2",
          recentSearchesTitle: "\u641C\u7D22\u5386\u53F2",
          removeFavoriteSearchButtonTitle: "\u4ECE\u6536\u85CF\u4E2D\u79FB\u9664",
          removeRecentSearchButtonTitle: "\u4ECE\u641C\u7D22\u5386\u53F2\u4E2D\u79FB\u9664",
          saveRecentSearchButtonTitle: "\u4FDD\u5B58\u81F3\u641C\u7D22\u5386\u53F2"
        }
      }
    }
  }
};

// .vitepress/config/shared.mts
var shared = defineConfig3({
  appearance: "dark",
  head: head(),
  markdown: {
    preConfig(md) {
      md.use(demoPreviewPlugin);
      md.use(groupIconMdPlugin);
    }
  },
  pwa: pwa(),
  srcDir: "src",
  themeConfig: {
    i18nRouting: true,
    logo: "https://unpkg.com/@vbenjs/static-source@0.1.7/source/logo-v1.webp",
    search: {
      options: {
        locales: {
          ...search
        }
      },
      provider: "local"
    },
    siteTitle: "Osmo",
    socialLinks: [
      { icon: "github", link: "https://github.com/vbenjs/vue-vben-admin" }
    ]
  },
  title: "Osmo",
  vite: {
    build: {
      chunkSizeWarningLimit: Infinity,
      minify: "terser"
    },
    css: {
      postcss: {
        plugins: [
          tailwind(),
          postcssIsolateStyles({ includeFiles: [/vp-doc\.css/] })
        ]
      },
      preprocessorOptions: {
        scss: {
          api: "modern"
        }
      }
    },
    json: {
      stringify: true
    },
    plugins: [
      GitChangelog({
        mapAuthors: [
          {
            mapByNameAliases: ["Vben"],
            name: "vben",
            username: "anncwb"
          },
          {
            name: "vince",
            username: "vince292007"
          },
          {
            name: "Li Kui",
            username: "likui628"
          }
        ],
        repoURL: () => "https://github.com/vbenjs/vue-vben-admin"
      }),
      GitChangelogMarkdownSection(),
      viteArchiverPlugin({ outputDir: ".vitepress" }),
      groupIconVitePlugin(),
      await viteVxeTableImportsPlugin()
    ],
    server: {
      fs: {
        allow: ["../.."]
      },
      host: true,
      port: 6173
    },
    ssr: {
      external: ["@vue/repl"]
    }
  }
});
function head() {
  return [
    ["meta", { content: "Vbenjs Team", name: "author" }],
    [
      "meta",
      {
        content: "vben, vitejs, vite, shacdn-ui, vue",
        name: "keywords"
      }
    ],
    ["link", { href: "/favicon.ico", rel: "icon", type: "image/svg+xml" }],
    [
      "meta",
      {
        content: "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
        name: "viewport"
      }
    ],
    ["meta", { content: "vben admin docs", name: "keywords" }],
    ["link", { href: "/favicon.ico", rel: "icon" }]
    // [
    //   'script',
    //   {
    //     src: 'https://cdn.tailwindcss.com',
    //   },
    // ],
  ];
}
function pwa() {
  return {
    includeManifestIcons: false,
    manifest: {
      description: "Osmo is a modern admin dashboard template based on Vue 3. ",
      icons: [
        {
          sizes: "192x192",
          src: "https://unpkg.com/@vbenjs/static-source@0.1.7/source/pwa-icon-192.png",
          type: "image/png"
        },
        {
          sizes: "512x512",
          src: "https://unpkg.com/@vbenjs/static-source@0.1.7/source/pwa-icon-512.png",
          type: "image/png"
        }
      ],
      id: "/",
      name: "Osmo Doc",
      short_name: "vben_admin_doc",
      theme_color: "#ffffff"
    },
    outDir: resolve(process.cwd(), ".vitepress/dist"),
    registerType: "autoUpdate",
    workbox: {
      globPatterns: ["**/*.{css,js,html,svg,png,ico,txt,woff2}"],
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
    }
  };
}

// .vitepress/config/index.mts
var index_default = withPwa(
  defineConfigWithTheme({
    ...shared,
    locales: {
      en: {
        label: "English",
        lang: "en",
        link: "/en/",
        ...en
      },
      root: {
        label: "\u7B80\u4F53\u4E2D\u6587",
        lang: "zh-CN",
        ...zh
      }
    }
  })
);
export {
  index_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcvaW5kZXgubXRzIiwgIi52aXRlcHJlc3MvY29uZmlnL2VuLm10cyIsICIuLi9wYWNrYWdlLmpzb24iLCAiLnZpdGVwcmVzcy9jb25maWcvc2hhcmVkLm10cyIsICIudml0ZXByZXNzL2NvbmZpZy9wbHVnaW5zL2RlbW8tcHJldmlldy50cyIsICIudml0ZXByZXNzL2NvbmZpZy96aC5tdHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxcdTZENDFcdTkxQ0ZcdTVGNTVcdTUyMzZcdTU0OENcdTU2REVcdTY1M0VcXFxcb3Ntby12dWUzXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxjb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFx1NkQ0MVx1OTFDRlx1NUY1NVx1NTIzNlx1NTQ4Q1x1NTZERVx1NjUzRVxcXFxvc21vLXZ1ZTNcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFxpbmRleC5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6LyVFNiVCNSU4MSVFOSU4NyU4RiVFNSVCRCU5NSVFNSU4OCVCNiVFNSU5MiU4QyVFNSU5QiU5RSVFNiU5NCVCRS9vc21vLXZ1ZTMvZG9jcy8udml0ZXByZXNzL2NvbmZpZy9pbmRleC5tdHNcIjtpbXBvcnQgeyB3aXRoUHdhIH0gZnJvbSAnQHZpdGUtcHdhL3ZpdGVwcmVzcyc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWdXaXRoVGhlbWUgfSBmcm9tICd2aXRlcHJlc3MnO1xuXG5pbXBvcnQgeyBlbiB9IGZyb20gJy4vZW4ubXRzJztcbmltcG9ydCB7IHNoYXJlZCB9IGZyb20gJy4vc2hhcmVkLm10cyc7XG5pbXBvcnQgeyB6aCB9IGZyb20gJy4vemgubXRzJztcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFB3YShcbiAgZGVmaW5lQ29uZmlnV2l0aFRoZW1lKHtcbiAgICAuLi5zaGFyZWQsXG4gICAgbG9jYWxlczoge1xuICAgICAgZW46IHtcbiAgICAgICAgbGFiZWw6ICdFbmdsaXNoJyxcbiAgICAgICAgbGFuZzogJ2VuJyxcbiAgICAgICAgbGluazogJy9lbi8nLFxuICAgICAgICAuLi5lbixcbiAgICAgIH0sXG4gICAgICByb290OiB7XG4gICAgICAgIGxhYmVsOiAnXHU3QjgwXHU0RjUzXHU0RTJEXHU2NTg3JyxcbiAgICAgICAgbGFuZzogJ3poLUNOJyxcbiAgICAgICAgLi4uemgsXG4gICAgICB9LFxuICAgIH0sXG4gIH0pLFxuKTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcXHU2RDQxXHU5MUNGXHU1RjU1XHU1MjM2XHU1NDhDXHU1NkRFXHU2NTNFXFxcXG9zbW8tdnVlM1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxcdTZENDFcdTkxQ0ZcdTVGNTVcdTUyMzZcdTU0OENcdTU2REVcdTY1M0VcXFxcb3Ntby12dWUzXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxjb25maWdcXFxcZW4ubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi8lRTYlQjUlODElRTklODclOEYlRTUlQkQlOTUlRTUlODglQjYlRTUlOTIlOEMlRTUlOUIlOUUlRTYlOTQlQkUvb3Ntby12dWUzL2RvY3MvLnZpdGVwcmVzcy9jb25maWcvZW4ubXRzXCI7aW1wb3J0IHR5cGUgeyBEZWZhdWx0VGhlbWUgfSBmcm9tICd2aXRlcHJlc3MnO1xuXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlcHJlc3MnO1xuXG5pbXBvcnQgeyB2ZXJzaW9uIH0gZnJvbSAnLi4vLi4vLi4vcGFja2FnZS5qc29uJztcblxuZXhwb3J0IGNvbnN0IGVuID0gZGVmaW5lQ29uZmlnKHtcbiAgZGVzY3JpcHRpb246ICdPc21vICYgRW50ZXJwcmlzZSBsZXZlbCBtYW5hZ2VtZW50IHN5c3RlbSBmcmFtZXdvcmsnLFxuICBsYW5nOiAnZW4tVVMnLFxuICB0aGVtZUNvbmZpZzoge1xuICAgIGRhcmtNb2RlU3dpdGNoTGFiZWw6ICdUaGVtZScsXG4gICAgZGFya01vZGVTd2l0Y2hUaXRsZTogJ1N3aXRjaCB0byBEYXJrIE1vZGUnLFxuICAgIGRvY0Zvb3Rlcjoge1xuICAgICAgbmV4dDogJ05leHQgUGFnZScsXG4gICAgICBwcmV2OiAnUHJldmlvdXMgUGFnZScsXG4gICAgfSxcbiAgICBlZGl0TGluazoge1xuICAgICAgcGF0dGVybjpcbiAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS92YmVuanMvdnVlLXZiZW4tYWRtaW4vZWRpdC9tYWluL2RvY3Mvc3JjLzpwYXRoJyxcbiAgICAgIHRleHQ6ICdFZGl0IHRoaXMgcGFnZSBvbiBHaXRIdWInLFxuICAgIH0sXG4gICAgZm9vdGVyOiB7XG4gICAgICBjb3B5cmlnaHQ6IGBDb3B5cmlnaHQgXHUwMEE5IDIwMjAtJHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9IFZiZW5gLFxuICAgICAgbWVzc2FnZTogJ1JlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4nLFxuICAgIH0sXG4gICAgbGFuZ01lbnVMYWJlbDogJ0xhbmd1YWdlJyxcbiAgICBsYXN0VXBkYXRlZDoge1xuICAgICAgZm9ybWF0T3B0aW9uczoge1xuICAgICAgICBkYXRlU3R5bGU6ICdzaG9ydCcsXG4gICAgICAgIHRpbWVTdHlsZTogJ21lZGl1bScsXG4gICAgICB9LFxuICAgICAgdGV4dDogJ0xhc3QgdXBkYXRlZCBvbicsXG4gICAgfSxcbiAgICBsaWdodE1vZGVTd2l0Y2hUaXRsZTogJ1N3aXRjaCB0byBMaWdodCBNb2RlJyxcbiAgICBuYXY6IG5hdigpLFxuICAgIG91dGxpbmU6IHtcbiAgICAgIGxhYmVsOiAnTmF2aWdhdGUnLFxuICAgIH0sXG4gICAgcmV0dXJuVG9Ub3BMYWJlbDogJ0JhY2sgdG8gdG9wJyxcbiAgICBzaWRlYmFyOiB7XG4gICAgICAnL2VuL2NvbW1lcmNpYWwvJzoge1xuICAgICAgICBiYXNlOiAnL2VuL2NvbW1lcmNpYWwvJyxcbiAgICAgICAgaXRlbXM6IHNpZGViYXJDb21tZXJjaWFsKCksXG4gICAgICB9LFxuICAgICAgJy9lbi9ndWlkZS8nOiB7IGJhc2U6ICcvZW4vZ3VpZGUvJywgaXRlbXM6IHNpZGViYXJHdWlkZSgpIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuXG5mdW5jdGlvbiBzaWRlYmFyR3VpZGUoKTogRGVmYXVsdFRoZW1lLlNpZGViYXJJdGVtW10ge1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICB0ZXh0OiAnSW50cm9kdWN0aW9uJyxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnaW50cm9kdWN0aW9uL3ZiZW4nLFxuICAgICAgICAgIHRleHQ6ICdBYm91dCBPc21vJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICdpbnRyb2R1Y3Rpb24vd2h5JyxcbiAgICAgICAgICB0ZXh0OiAnV2h5IENob29zZSBVcz8nLFxuICAgICAgICB9LFxuICAgICAgICB7IGxpbms6ICdpbnRyb2R1Y3Rpb24vcXVpY2stc3RhcnQnLCB0ZXh0OiAnUXVpY2sgU3RhcnQnIH0sXG4gICAgICAgIHsgbGluazogJ2ludHJvZHVjdGlvbi90aGluJywgdGV4dDogJ0xpdGUgVmVyc2lvbicgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnQmFzaWNzJyxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHsgbGluazogJ2Vzc2VudGlhbHMvY29uY2VwdCcsIHRleHQ6ICdCYXNpYyBDb25jZXB0cycgfSxcbiAgICAgICAgeyBsaW5rOiAnZXNzZW50aWFscy9kZXZlbG9wbWVudCcsIHRleHQ6ICdMb2NhbCBEZXZlbG9wbWVudCcgfSxcbiAgICAgICAgeyBsaW5rOiAnZXNzZW50aWFscy9yb3V0ZScsIHRleHQ6ICdSb3V0aW5nIGFuZCBNZW51JyB9LFxuICAgICAgICB7IGxpbms6ICdlc3NlbnRpYWxzL3NldHRpbmdzJywgdGV4dDogJ0NvbmZpZ3VyYXRpb24nIH0sXG4gICAgICAgIHsgbGluazogJ2Vzc2VudGlhbHMvaWNvbnMnLCB0ZXh0OiAnSWNvbnMnIH0sXG4gICAgICAgIHsgbGluazogJ2Vzc2VudGlhbHMvc3R5bGVzJywgdGV4dDogJ1N0eWxlcycgfSxcbiAgICAgICAgeyBsaW5rOiAnZXNzZW50aWFscy9leHRlcm5hbC1tb2R1bGUnLCB0ZXh0OiAnRXh0ZXJuYWwgTW9kdWxlcycgfSxcbiAgICAgICAgeyBsaW5rOiAnZXNzZW50aWFscy9idWlsZCcsIHRleHQ6ICdCdWlsZCBhbmQgRGVwbG95bWVudCcgfSxcbiAgICAgICAgeyBsaW5rOiAnZXNzZW50aWFscy9zZXJ2ZXInLCB0ZXh0OiAnU2VydmVyIEludGVyYWN0aW9uIGFuZCBEYXRhIE1vY2snIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ0FkdmFuY2VkJyxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHsgbGluazogJ2luLWRlcHRoL2xvZ2luJywgdGV4dDogJ0xvZ2luJyB9LFxuICAgICAgICB7IGxpbms6ICdpbi1kZXB0aC90aGVtZScsIHRleHQ6ICdUaGVtZScgfSxcbiAgICAgICAgeyBsaW5rOiAnaW4tZGVwdGgvYWNjZXNzJywgdGV4dDogJ0FjY2VzcyBDb250cm9sJyB9LFxuICAgICAgICB7IGxpbms6ICdpbi1kZXB0aC9sb2NhbGUnLCB0ZXh0OiAnSW50ZXJuYXRpb25hbGl6YXRpb24nIH0sXG4gICAgICAgIHsgbGluazogJ2luLWRlcHRoL2ZlYXR1cmVzJywgdGV4dDogJ0NvbW1vbiBGZWF0dXJlcycgfSxcbiAgICAgICAgeyBsaW5rOiAnaW4tZGVwdGgvY2hlY2stdXBkYXRlcycsIHRleHQ6ICdDaGVjayBVcGRhdGVzJyB9LFxuICAgICAgICB7IGxpbms6ICdpbi1kZXB0aC9sb2FkaW5nJywgdGV4dDogJ0dsb2JhbCBMb2FkaW5nJyB9LFxuICAgICAgICB7IGxpbms6ICdpbi1kZXB0aC91aS1mcmFtZXdvcmsnLCB0ZXh0OiAnVUkgRnJhbWV3b3JrIFN3aXRjaGluZycgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnRW5naW5lZXJpbmcnLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAgeyBsaW5rOiAncHJvamVjdC9zdGFuZGFyZCcsIHRleHQ6ICdTdGFuZGFyZHMnIH0sXG4gICAgICAgIHsgbGluazogJ3Byb2plY3QvY2xpJywgdGV4dDogJ0NMSScgfSxcbiAgICAgICAgeyBsaW5rOiAncHJvamVjdC9kaXInLCB0ZXh0OiAnRGlyZWN0b3J5IEV4cGxhbmF0aW9uJyB9LFxuICAgICAgICB7IGxpbms6ICdwcm9qZWN0L3Rlc3QnLCB0ZXh0OiAnVW5pdCBUZXN0aW5nJyB9LFxuICAgICAgICB7IGxpbms6ICdwcm9qZWN0L3RhaWx3aW5kY3NzJywgdGV4dDogJ1RhaWx3aW5kIENTUycgfSxcbiAgICAgICAgeyBsaW5rOiAncHJvamVjdC9jaGFuZ2VzZXQnLCB0ZXh0OiAnQ2hhbmdlc2V0JyB9LFxuICAgICAgICB7IGxpbms6ICdwcm9qZWN0L3ZpdGUnLCB0ZXh0OiAnVml0ZSBDb25maWcnIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ090aGVycycsXG4gICAgICBpdGVtczogW1xuICAgICAgICB7IGxpbms6ICdvdGhlci9wcm9qZWN0LXVwZGF0ZScsIHRleHQ6ICdQcm9qZWN0IFVwZGF0ZScgfSxcbiAgICAgICAgeyBsaW5rOiAnb3RoZXIvcmVtb3ZlLWNvZGUnLCB0ZXh0OiAnUmVtb3ZlIENvZGUnIH0sXG4gICAgICAgIHsgbGluazogJ290aGVyL2ZhcScsIHRleHQ6ICdGQVEnIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIF07XG59XG5cbmZ1bmN0aW9uIHNpZGViYXJDb21tZXJjaWFsKCk6IERlZmF1bHRUaGVtZS5TaWRlYmFySXRlbVtdIHtcbiAgcmV0dXJuIFtcbiAgICB7XG4gICAgICBsaW5rOiAnY29tbXVuaXR5JyxcbiAgICAgIHRleHQ6ICdDb21tdW5pdHknLFxuICAgIH0sXG4gICAge1xuICAgICAgbGluazogJ3RlY2huaWNhbC1zdXBwb3J0JyxcbiAgICAgIHRleHQ6ICdUZWNobmljYWwtc3VwcG9ydCcsXG4gICAgfSxcbiAgICB7XG4gICAgICBsaW5rOiAnY3VzdG9taXplZCcsXG4gICAgICB0ZXh0OiAnQ3VzdG9taXplZCcsXG4gICAgfSxcbiAgXTtcbn1cblxuZnVuY3Rpb24gbmF2KCk6IERlZmF1bHRUaGVtZS5OYXZJdGVtW10ge1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIGFjdGl2ZU1hdGNoOiAnXi9lbi8oZ3VpZGV8Y29tcG9uZW50cykvJyxcbiAgICAgIHRleHQ6ICdEb2MnLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGFjdGl2ZU1hdGNoOiAnXi9lbi9ndWlkZS8nLFxuICAgICAgICAgIGxpbms6ICcvZW4vZ3VpZGUvaW50cm9kdWN0aW9uL3ZiZW4nLFxuICAgICAgICAgIHRleHQ6ICdHdWlkZScsXG4gICAgICAgIH0sXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICBhY3RpdmVNYXRjaDogJ14vZW4vY29tcG9uZW50cy8nLFxuICAgICAgICAvLyAgIGxpbms6ICcvZW4vY29tcG9uZW50cy9pbnRyb2R1Y3Rpb24nLFxuICAgICAgICAvLyAgIHRleHQ6ICdDb21wb25lbnRzJyxcbiAgICAgICAgLy8gfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdIaXN0b3JpY2FsIFZlcnNpb25zJyxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsaW5rOiAnaHR0cHM6Ly9kb2MudnZiaW4uY24nLFxuICAgICAgICAgICAgICB0ZXh0OiAnMi54IFZlcnNpb24gRG9jdW1lbnRhdGlvbicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ0RlbW8nLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdPc21vJyxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsaW5rOiAnaHR0cHM6Ly93d3cudmJlbi5wcm8nLFxuICAgICAgICAgICAgICB0ZXh0OiAnRGVtbyBWZXJzaW9uJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxpbms6ICdodHRwczovL2FudC52YmVuLnBybycsXG4gICAgICAgICAgICAgIHRleHQ6ICdBbnQgRGVzaWduIFZ1ZSBWZXJzaW9uJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxpbms6ICdodHRwczovL25haXZlLnZiZW4ucHJvJyxcbiAgICAgICAgICAgICAgdGV4dDogJ05haXZlIFZlcnNpb24nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGluazogJ2h0dHBzOi8vZWxlLnZiZW4ucHJvJyxcbiAgICAgICAgICAgICAgdGV4dDogJ0VsZW1lbnQgUGx1cyBWZXJzaW9uJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdPdGhlcnMnLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxpbms6ICdodHRwczovL3ZiZW4udnZiaW4uY24nLFxuICAgICAgICAgICAgICB0ZXh0OiAnT3NtbyAyLngnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6IHZlcnNpb24sXG4gICAgICBpdGVtczogW1xuICAgICAgICB7XG4gICAgICAgICAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS92YmVuanMvdnVlLXZiZW4tYWRtaW4vcmVsZWFzZXMnLFxuICAgICAgICAgIHRleHQ6ICdDaGFuZ2Vsb2cnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS9vcmdzL3ZiZW5qcy9wcm9qZWN0cy81JyxcbiAgICAgICAgICB0ZXh0OiAnUm9hZG1hcCcsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL3ZiZW5qcy92dWUtdmJlbi1hZG1pbi9ibG9iL21haW4vLmdpdGh1Yi9jb250cmlidXRpbmcubWQnLFxuICAgICAgICAgIHRleHQ6ICdDb250cmlidXRpb24nLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxpbms6ICcvY29tbWVyY2lhbC90ZWNobmljYWwtc3VwcG9ydCcsXG4gICAgICB0ZXh0OiAnXHVEODNFXHVERDg0IFRlY2ggU3VwcG9ydCcsXG4gICAgfSxcbiAgICB7XG4gICAgICBsaW5rOiAnL3Nwb25zb3IvcGVyc29uYWwnLFxuICAgICAgdGV4dDogJ1x1MjcyOCBTcG9uc29yJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxpbms6ICcvY29tbWVyY2lhbC9jb21tdW5pdHknLFxuICAgICAgdGV4dDogJ1x1RDgzRFx1REM2OFx1MjAwRFx1RDgzRFx1REM2Nlx1MjAwRFx1RDgzRFx1REM2NiBDb21tdW5pdHknLFxuICAgIH0sXG4gICAgLy8ge1xuICAgIC8vICAgbGluazogJy9mcmllbmQtbGlua3MvJyxcbiAgICAvLyAgIHRleHQ6ICdcdUQ4M0VcdUREMUQgRnJpZW5kIExpbmtzJyxcbiAgICAvLyB9LFxuICBdO1xufVxuIiwgIntcbiAgXCJuYW1lXCI6IFwidmJlbi1hZG1pbi1tb25vcmVwb1wiLFxuICBcInZlcnNpb25cIjogXCI1LjUuN1wiLFxuICBcInByaXZhdGVcIjogdHJ1ZSxcbiAgXCJrZXl3b3Jkc1wiOiBbXG4gICAgXCJtb25vcmVwb1wiLFxuICAgIFwidHVyYm9cIixcbiAgICBcInZiZW5cIixcbiAgICBcInZiZW4gYWRtaW5cIixcbiAgICBcInZiZW4gcHJvXCIsXG4gICAgXCJ2dWVcIixcbiAgICBcInZ1ZSBhZG1pblwiLFxuICAgIFwidnVlIHZiZW4gYWRtaW5cIixcbiAgICBcInZ1ZSB2YmVuIGFkbWluIHByb1wiLFxuICAgIFwidnVlM1wiXG4gIF0sXG4gIFwiaG9tZXBhZ2VcIjogXCJodHRwczovL2dpdGh1Yi5jb20vdmJlbmpzL3Z1ZS12YmVuLWFkbWluXCIsXG4gIFwiYnVnc1wiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS92YmVuanMvdnVlLXZiZW4tYWRtaW4vaXNzdWVzXCIsXG4gIFwicmVwb3NpdG9yeVwiOiBcInZiZW5qcy92dWUtdmJlbi1hZG1pbi5naXRcIixcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gIFwiYXV0aG9yXCI6IHtcbiAgICBcIm5hbWVcIjogXCJ2YmVuXCIsXG4gICAgXCJlbWFpbFwiOiBcImFubi52YmVuQGdtYWlsLmNvbVwiLFxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2FubmN3YlwiXG4gIH0sXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiYnVpbGRcIjogXCJjcm9zcy1lbnYgTk9ERV9PUFRJT05TPS0tbWF4LW9sZC1zcGFjZS1zaXplPTgxOTIgdHVyYm8gYnVpbGRcIixcbiAgICBcImJ1aWxkOmFuYWx5emVcIjogXCJ0dXJibyBidWlsZDphbmFseXplXCIsXG4gICAgXCJidWlsZDphbnRkXCI6IFwicG5wbSBydW4gYnVpbGQgLS1maWx0ZXI9QHZiZW4vd2ViLWFudGRcIixcbiAgICBcImJ1aWxkOmRvY2tlclwiOiBcIi4vc2NyaXB0cy9kZXBsb3kvYnVpbGQtbG9jYWwtZG9ja2VyLWltYWdlLnNoXCIsXG4gICAgXCJidWlsZDpkb2NzXCI6IFwicG5wbSBydW4gYnVpbGQgLS1maWx0ZXI9QHZiZW4vZG9jc1wiLFxuICAgIFwiYnVpbGQ6ZWxlXCI6IFwicG5wbSBydW4gYnVpbGQgLS1maWx0ZXI9QHZiZW4vd2ViLWVsZVwiLFxuICAgIFwiYnVpbGQ6bmFpdmVcIjogXCJwbnBtIHJ1biBidWlsZCAtLWZpbHRlcj1AdmJlbi93ZWItbmFpdmVcIixcbiAgICBcImJ1aWxkOnBsYXlcIjogXCJwbnBtIHJ1biBidWlsZCAtLWZpbHRlcj1AdmJlbi9wbGF5Z3JvdW5kXCIsXG4gICAgXCJjaGFuZ2VzZXRcIjogXCJwbnBtIGV4ZWMgY2hhbmdlc2V0XCIsXG4gICAgXCJjaGVja1wiOiBcInBucG0gcnVuIGNoZWNrOmNpcmN1bGFyICYmIHBucG0gcnVuIGNoZWNrOmRlcCAmJiBwbnBtIHJ1biBjaGVjazp0eXBlICYmIHBucG0gY2hlY2s6Y3NwZWxsXCIsXG4gICAgXCJjaGVjazpjaXJjdWxhclwiOiBcInZzaCBjaGVjay1jaXJjdWxhclwiLFxuICAgIFwiY2hlY2s6Y3NwZWxsXCI6IFwiY3NwZWxsIGxpbnQgKiovKi50cyAqKi9SRUFETUUubWQgLmNoYW5nZXNldC8qLm1kIC0tbm8tcHJvZ3Jlc3NcIixcbiAgICBcImNoZWNrOmRlcFwiOiBcInZzaCBjaGVjay1kZXBcIixcbiAgICBcImNoZWNrOnR5cGVcIjogXCJ0dXJibyBydW4gdHlwZWNoZWNrXCIsXG4gICAgXCJjbGVhblwiOiBcIm5vZGUgLi9zY3JpcHRzL2NsZWFuLm1qc1wiLFxuICAgIFwiY29tbWl0XCI6IFwiY3pnXCIsXG4gICAgXCJkZXZcIjogXCJ0dXJiby1ydW4gZGV2XCIsXG4gICAgXCJkZXY6YW50ZFwiOiBcInBucG0gLUYgQHZiZW4vd2ViLWFudGQgcnVuIGRldlwiLFxuICAgIFwiZGV2OmRvY3NcIjogXCJwbnBtIC1GIEB2YmVuL2RvY3MgcnVuIGRldlwiLFxuICAgIFwiZGV2OmVsZVwiOiBcInBucG0gLUYgQHZiZW4vd2ViLWVsZSBydW4gZGV2XCIsXG4gICAgXCJkZXY6bmFpdmVcIjogXCJwbnBtIC1GIEB2YmVuL3dlYi1uYWl2ZSBydW4gZGV2XCIsXG4gICAgXCJkZXY6cGxheVwiOiBcInBucG0gLUYgQHZiZW4vcGxheWdyb3VuZCBydW4gZGV2XCIsXG4gICAgXCJmb3JtYXRcIjogXCJ2c2ggbGludCAtLWZvcm1hdFwiLFxuICAgIFwibGludFwiOiBcInZzaCBsaW50XCIsXG4gICAgXCJwb3N0aW5zdGFsbFwiOiBcInBucG0gLXIgcnVuIHN0dWIgLS1pZi1wcmVzZW50XCIsXG4gICAgXCJwcmVpbnN0YWxsXCI6IFwibnB4IG9ubHktYWxsb3cgcG5wbVwiLFxuICAgIFwicHJldmlld1wiOiBcInR1cmJvLXJ1biBwcmV2aWV3XCIsXG4gICAgXCJwdWJsaW50XCI6IFwidnNoIHB1YmxpbnRcIixcbiAgICBcInJlaW5zdGFsbFwiOiBcInBucG0gY2xlYW4gLS1kZWwtbG9jayAmJiBwbnBtIGluc3RhbGxcIixcbiAgICBcInRlc3Q6dW5pdFwiOiBcInZpdGVzdCBydW4gLS1kb21cIixcbiAgICBcInRlc3Q6ZTJlXCI6IFwidHVyYm8gcnVuIHRlc3Q6ZTJlXCIsXG4gICAgXCJ1cGRhdGU6ZGVwc1wiOiBcIm5weCB0YXplIC1yIC13XCIsXG4gICAgXCJ2ZXJzaW9uXCI6IFwicG5wbSBleGVjIGNoYW5nZXNldCB2ZXJzaW9uICYmIHBucG0gaW5zdGFsbCAtLW5vLWZyb3plbi1sb2NrZmlsZVwiLFxuICAgIFwiY2F0YWxvZ1wiOiBcInBucHggY29kZW1vZCBwbnBtL2NhdGFsb2dcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAY2hhbmdlc2V0cy9jaGFuZ2Vsb2ctZ2l0aHViXCI6IFwiY2F0YWxvZzpcIixcbiAgICBcIkBjaGFuZ2VzZXRzL2NsaVwiOiBcImNhdGFsb2c6XCIsXG4gICAgXCJAcGxheXdyaWdodC90ZXN0XCI6IFwiY2F0YWxvZzpcIixcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiY2F0YWxvZzpcIixcbiAgICBcIkB2YmVuL2NvbW1pdGxpbnQtY29uZmlnXCI6IFwid29ya3NwYWNlOipcIixcbiAgICBcIkB2YmVuL2VzbGludC1jb25maWdcIjogXCJ3b3Jrc3BhY2U6KlwiLFxuICAgIFwiQHZiZW4vcHJldHRpZXItY29uZmlnXCI6IFwid29ya3NwYWNlOipcIixcbiAgICBcIkB2YmVuL3N0eWxlbGludC1jb25maWdcIjogXCJ3b3Jrc3BhY2U6KlwiLFxuICAgIFwiQHZiZW4vdGFpbHdpbmQtY29uZmlnXCI6IFwid29ya3NwYWNlOipcIixcbiAgICBcIkB2YmVuL3RzY29uZmlnXCI6IFwid29ya3NwYWNlOipcIixcbiAgICBcIkB2YmVuL3R1cmJvLXJ1blwiOiBcIndvcmtzcGFjZToqXCIsXG4gICAgXCJAdmJlbi92aXRlLWNvbmZpZ1wiOiBcIndvcmtzcGFjZToqXCIsXG4gICAgXCJAdmJlbi92c2hcIjogXCJ3b3Jrc3BhY2U6KlwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI6IFwiY2F0YWxvZzpcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZS1qc3hcIjogXCJjYXRhbG9nOlwiLFxuICAgIFwiQHZ1ZS90ZXN0LXV0aWxzXCI6IFwiY2F0YWxvZzpcIixcbiAgICBcImF1dG9wcmVmaXhlclwiOiBcImNhdGFsb2c6XCIsXG4gICAgXCJjcm9zcy1lbnZcIjogXCJjYXRhbG9nOlwiLFxuICAgIFwiY3NwZWxsXCI6IFwiY2F0YWxvZzpcIixcbiAgICBcImhhcHB5LWRvbVwiOiBcImNhdGFsb2c6XCIsXG4gICAgXCJpcy1jaVwiOiBcImNhdGFsb2c6XCIsXG4gICAgXCJsZWZ0aG9va1wiOiBcImNhdGFsb2c6XCIsXG4gICAgXCJwbGF5d3JpZ2h0XCI6IFwiY2F0YWxvZzpcIixcbiAgICBcInJpbXJhZlwiOiBcImNhdGFsb2c6XCIsXG4gICAgXCJ0YWlsd2luZGNzc1wiOiBcImNhdGFsb2c6XCIsXG4gICAgXCJ0dXJib1wiOiBcImNhdGFsb2c6XCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiY2F0YWxvZzpcIixcbiAgICBcInVuYnVpbGRcIjogXCJjYXRhbG9nOlwiLFxuICAgIFwidml0ZVwiOiBcImNhdGFsb2c6XCIsXG4gICAgXCJ2aXRlc3RcIjogXCJjYXRhbG9nOlwiLFxuICAgIFwidnVlXCI6IFwiY2F0YWxvZzpcIixcbiAgICBcInZ1ZS10c2NcIjogXCJjYXRhbG9nOlwiXG4gIH0sXG4gIFwiZW5naW5lc1wiOiB7XG4gICAgXCJub2RlXCI6IFwiPj0yMC4xMC4wXCIsXG4gICAgXCJwbnBtXCI6IFwiPj05LjEyLjBcIlxuICB9LFxuICBcInBhY2thZ2VNYW5hZ2VyXCI6IFwicG5wbUAxMC4xMi40XCIsXG4gIFwicG5wbVwiOiB7XG4gICAgXCJwZWVyRGVwZW5kZW5jeVJ1bGVzXCI6IHtcbiAgICAgIFwiYWxsb3dlZFZlcnNpb25zXCI6IHtcbiAgICAgICAgXCJlc2xpbnRcIjogXCIqXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIFwib3ZlcnJpZGVzXCI6IHtcbiAgICAgIFwiQGFzdC1ncmVwL25hcGlcIjogXCJjYXRhbG9nOlwiLFxuICAgICAgXCJAY3RybC90aW55Y29sb3JcIjogXCJjYXRhbG9nOlwiLFxuICAgICAgXCJjbHN4XCI6IFwiY2F0YWxvZzpcIixcbiAgICAgIFwiZXNidWlsZFwiOiBcIjAuMjUuM1wiLFxuICAgICAgXCJwaW5pYVwiOiBcImNhdGFsb2c6XCIsXG4gICAgICBcInZ1ZVwiOiBcImNhdGFsb2c6XCJcbiAgICB9LFxuICAgIFwibmV2ZXJCdWlsdERlcGVuZGVuY2llc1wiOiBbXG4gICAgICBcImNhbnZhc1wiLFxuICAgICAgXCJub2RlLWd5cFwiXG4gICAgXVxuICB9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFx1NkQ0MVx1OTFDRlx1NUY1NVx1NTIzNlx1NTQ4Q1x1NTZERVx1NjUzRVxcXFxvc21vLXZ1ZTNcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcXHU2RDQxXHU5MUNGXHU1RjU1XHU1MjM2XHU1NDhDXHU1NkRFXHU2NTNFXFxcXG9zbW8tdnVlM1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnXFxcXHNoYXJlZC5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6LyVFNiVCNSU4MSVFOSU4NyU4RiVFNSVCRCU5NSVFNSU4OCVCNiVFNSU5MiU4QyVFNSU5QiU5RSVFNiU5NCVCRS9vc21vLXZ1ZTMvZG9jcy8udml0ZXByZXNzL2NvbmZpZy9zaGFyZWQubXRzXCI7aW1wb3J0IHR5cGUgeyBQd2FPcHRpb25zIH0gZnJvbSAnQHZpdGUtcHdhL3ZpdGVwcmVzcyc7XG5pbXBvcnQgdHlwZSB7IEhlYWRDb25maWcgfSBmcm9tICd2aXRlcHJlc3MnO1xuXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJztcblxuaW1wb3J0IHtcbiAgdml0ZUFyY2hpdmVyUGx1Z2luLFxuICB2aXRlVnhlVGFibGVJbXBvcnRzUGx1Z2luLFxufSBmcm9tICdAdmJlbi92aXRlLWNvbmZpZyc7XG5cbmltcG9ydCB7XG4gIEdpdENoYW5nZWxvZyxcbiAgR2l0Q2hhbmdlbG9nTWFya2Rvd25TZWN0aW9uLFxufSBmcm9tICdAbm9sZWJhc2Uvdml0ZXByZXNzLXBsdWdpbi1naXQtY2hhbmdlbG9nL3ZpdGUnO1xuaW1wb3J0IHRhaWx3aW5kIGZyb20gJ3RhaWx3aW5kY3NzJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgcG9zdGNzc0lzb2xhdGVTdHlsZXMgfSBmcm9tICd2aXRlcHJlc3MnO1xuaW1wb3J0IHtcbiAgZ3JvdXBJY29uTWRQbHVnaW4sXG4gIGdyb3VwSWNvblZpdGVQbHVnaW4sXG59IGZyb20gJ3ZpdGVwcmVzcy1wbHVnaW4tZ3JvdXAtaWNvbnMnO1xuXG5pbXBvcnQgeyBkZW1vUHJldmlld1BsdWdpbiB9IGZyb20gJy4vcGx1Z2lucy9kZW1vLXByZXZpZXcnO1xuaW1wb3J0IHsgc2VhcmNoIGFzIHpoU2VhcmNoIH0gZnJvbSAnLi96aC5tdHMnO1xuXG5leHBvcnQgY29uc3Qgc2hhcmVkID0gZGVmaW5lQ29uZmlnKHtcbiAgYXBwZWFyYW5jZTogJ2RhcmsnLFxuICBoZWFkOiBoZWFkKCksXG4gIG1hcmtkb3duOiB7XG4gICAgcHJlQ29uZmlnKG1kKSB7XG4gICAgICBtZC51c2UoZGVtb1ByZXZpZXdQbHVnaW4pO1xuICAgICAgbWQudXNlKGdyb3VwSWNvbk1kUGx1Z2luKTtcbiAgICB9LFxuICB9LFxuICBwd2E6IHB3YSgpLFxuICBzcmNEaXI6ICdzcmMnLFxuICB0aGVtZUNvbmZpZzoge1xuICAgIGkxOG5Sb3V0aW5nOiB0cnVlLFxuICAgIGxvZ286ICdodHRwczovL3VucGtnLmNvbS9AdmJlbmpzL3N0YXRpYy1zb3VyY2VAMC4xLjcvc291cmNlL2xvZ28tdjEud2VicCcsXG4gICAgc2VhcmNoOiB7XG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGxvY2FsZXM6IHtcbiAgICAgICAgICAuLi56aFNlYXJjaCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBwcm92aWRlcjogJ2xvY2FsJyxcbiAgICB9LFxuICAgIHNpdGVUaXRsZTogJ09zbW8nLFxuICAgIHNvY2lhbExpbmtzOiBbXG4gICAgICB7IGljb246ICdnaXRodWInLCBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL3ZiZW5qcy92dWUtdmJlbi1hZG1pbicgfSxcbiAgICBdLFxuICB9LFxuICB0aXRsZTogJ09zbW8nLFxuICB2aXRlOiB7XG4gICAgYnVpbGQ6IHtcbiAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogSW5maW5pdHksXG4gICAgICBtaW5pZnk6ICd0ZXJzZXInLFxuICAgIH0sXG4gICAgY3NzOiB7XG4gICAgICBwb3N0Y3NzOiB7XG4gICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICB0YWlsd2luZCgpLFxuICAgICAgICAgIHBvc3Rjc3NJc29sYXRlU3R5bGVzKHsgaW5jbHVkZUZpbGVzOiBbL3ZwLWRvY1xcLmNzcy9dIH0pLFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgICAgc2Nzczoge1xuICAgICAgICAgIGFwaTogJ21vZGVybicsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAganNvbjoge1xuICAgICAgc3RyaW5naWZ5OiB0cnVlLFxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgR2l0Q2hhbmdlbG9nKHtcbiAgICAgICAgbWFwQXV0aG9yczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1hcEJ5TmFtZUFsaWFzZXM6IFsnVmJlbiddLFxuICAgICAgICAgICAgbmFtZTogJ3ZiZW4nLFxuICAgICAgICAgICAgdXNlcm5hbWU6ICdhbm5jd2InLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3ZpbmNlJyxcbiAgICAgICAgICAgIHVzZXJuYW1lOiAndmluY2UyOTIwMDcnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0xpIEt1aScsXG4gICAgICAgICAgICB1c2VybmFtZTogJ2xpa3VpNjI4JyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICByZXBvVVJMOiAoKSA9PiAnaHR0cHM6Ly9naXRodWIuY29tL3ZiZW5qcy92dWUtdmJlbi1hZG1pbicsXG4gICAgICB9KSxcbiAgICAgIEdpdENoYW5nZWxvZ01hcmtkb3duU2VjdGlvbigpLFxuICAgICAgdml0ZUFyY2hpdmVyUGx1Z2luKHsgb3V0cHV0RGlyOiAnLnZpdGVwcmVzcycgfSksXG4gICAgICBncm91cEljb25WaXRlUGx1Z2luKCksXG4gICAgICBhd2FpdCB2aXRlVnhlVGFibGVJbXBvcnRzUGx1Z2luKCksXG4gICAgXSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIGZzOiB7XG4gICAgICAgIGFsbG93OiBbJy4uLy4uJ10sXG4gICAgICB9LFxuICAgICAgaG9zdDogdHJ1ZSxcbiAgICAgIHBvcnQ6IDYxNzMsXG4gICAgfSxcblxuICAgIHNzcjoge1xuICAgICAgZXh0ZXJuYWw6IFsnQHZ1ZS9yZXBsJ10sXG4gICAgfSxcbiAgfSxcbn0pO1xuXG5mdW5jdGlvbiBoZWFkKCk6IEhlYWRDb25maWdbXSB7XG4gIHJldHVybiBbXG4gICAgWydtZXRhJywgeyBjb250ZW50OiAnVmJlbmpzIFRlYW0nLCBuYW1lOiAnYXV0aG9yJyB9XSxcbiAgICBbXG4gICAgICAnbWV0YScsXG4gICAgICB7XG4gICAgICAgIGNvbnRlbnQ6ICd2YmVuLCB2aXRlanMsIHZpdGUsIHNoYWNkbi11aSwgdnVlJyxcbiAgICAgICAgbmFtZTogJ2tleXdvcmRzJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBbJ2xpbmsnLCB7IGhyZWY6ICcvZmF2aWNvbi5pY28nLCByZWw6ICdpY29uJywgdHlwZTogJ2ltYWdlL3N2Zyt4bWwnIH1dLFxuICAgIFtcbiAgICAgICdtZXRhJyxcbiAgICAgIHtcbiAgICAgICAgY29udGVudDpcbiAgICAgICAgICAnd2lkdGg9ZGV2aWNlLXdpZHRoLGluaXRpYWwtc2NhbGU9MSxtaW5pbXVtLXNjYWxlPTEuMCxtYXhpbXVtLXNjYWxlPTEuMCx1c2VyLXNjYWxhYmxlPW5vJyxcbiAgICAgICAgbmFtZTogJ3ZpZXdwb3J0JyxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBbJ21ldGEnLCB7IGNvbnRlbnQ6ICd2YmVuIGFkbWluIGRvY3MnLCBuYW1lOiAna2V5d29yZHMnIH1dLFxuICAgIFsnbGluaycsIHsgaHJlZjogJy9mYXZpY29uLmljbycsIHJlbDogJ2ljb24nIH1dLFxuICAgIC8vIFtcbiAgICAvLyAgICdzY3JpcHQnLFxuICAgIC8vICAge1xuICAgIC8vICAgICBzcmM6ICdodHRwczovL2Nkbi50YWlsd2luZGNzcy5jb20nLFxuICAgIC8vICAgfSxcbiAgICAvLyBdLFxuICBdO1xufVxuXG5mdW5jdGlvbiBwd2EoKTogUHdhT3B0aW9ucyB7XG4gIHJldHVybiB7XG4gICAgaW5jbHVkZU1hbmlmZXN0SWNvbnM6IGZhbHNlLFxuICAgIG1hbmlmZXN0OiB7XG4gICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgJ09zbW8gaXMgYSBtb2Rlcm4gYWRtaW4gZGFzaGJvYXJkIHRlbXBsYXRlIGJhc2VkIG9uIFZ1ZSAzLiAnLFxuICAgICAgaWNvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHNpemVzOiAnMTkyeDE5MicsXG4gICAgICAgICAgc3JjOiAnaHR0cHM6Ly91bnBrZy5jb20vQHZiZW5qcy9zdGF0aWMtc291cmNlQDAuMS43L3NvdXJjZS9wd2EtaWNvbi0xOTIucG5nJyxcbiAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXG4gICAgICAgICAgc3JjOiAnaHR0cHM6Ly91bnBrZy5jb20vQHZiZW5qcy9zdGF0aWMtc291cmNlQDAuMS43L3NvdXJjZS9wd2EtaWNvbi01MTIucG5nJyxcbiAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBpZDogJy8nLFxuICAgICAgbmFtZTogJ09zbW8gRG9jJyxcbiAgICAgIHNob3J0X25hbWU6ICd2YmVuX2FkbWluX2RvYycsXG4gICAgICB0aGVtZV9jb2xvcjogJyNmZmZmZmYnLFxuICAgIH0sXG4gICAgb3V0RGlyOiByZXNvbHZlKHByb2Nlc3MuY3dkKCksICcudml0ZXByZXNzL2Rpc3QnKSxcbiAgICByZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcbiAgICB3b3JrYm94OiB7XG4gICAgICBnbG9iUGF0dGVybnM6IFsnKiovKi57Y3NzLGpzLGh0bWwsc3ZnLHBuZyxpY28sdHh0LHdvZmYyfSddLFxuICAgICAgbWF4aW11bUZpbGVTaXplVG9DYWNoZUluQnl0ZXM6IDUgKiAxMDI0ICogMTAyNCxcbiAgICB9LFxuICB9O1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxcdTZENDFcdTkxQ0ZcdTVGNTVcdTUyMzZcdTU0OENcdTU2REVcdTY1M0VcXFxcb3Ntby12dWUzXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxjb25maWdcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcXHU2RDQxXHU5MUNGXHU1RjU1XHU1MjM2XHU1NDhDXHU1NkRFXHU2NTNFXFxcXG9zbW8tdnVlM1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnXFxcXHBsdWdpbnNcXFxcZGVtby1wcmV2aWV3LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi8lRTYlQjUlODElRTklODclOEYlRTUlQkQlOTUlRTUlODglQjYlRTUlOTIlOEMlRTUlOUIlOUUlRTYlOTQlQkUvb3Ntby12dWUzL2RvY3MvLnZpdGVwcmVzcy9jb25maWcvcGx1Z2lucy9kZW1vLXByZXZpZXcudHNcIjtpbXBvcnQgdHlwZSB7IE1hcmtkb3duRW52LCBNYXJrZG93blJlbmRlcmVyIH0gZnJvbSAndml0ZXByZXNzJztcblxuaW1wb3J0IGNyeXB0byBmcm9tICdub2RlOmNyeXB0byc7XG5pbXBvcnQgeyByZWFkZGlyU3luYyB9IGZyb20gJ25vZGU6ZnMnO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ25vZGU6cGF0aCc7XG5cbmV4cG9ydCBjb25zdCByYXdQYXRoUmVnZXhwID1cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlZ2V4cC9uby1zdXBlci1saW5lYXItYmFja3RyYWNraW5nLCByZWdleHAvc3RyaWN0XG4gIC9eKC4rPyg/OlxcLihbXFxkYS16XSspKT8pKCNbXFx3LV0rKT8oPzogP3soXFxkKyg/OlssLV1cXGQrKSopPyA/KFxcUyspP30pPyA/KD86XFxbKC4rKV0pPyQvO1xuXG5mdW5jdGlvbiByYXdQYXRoVG9Ub2tlbihyYXdQYXRoOiBzdHJpbmcpIHtcbiAgY29uc3QgW1xuICAgIGZpbGVwYXRoID0gJycsXG4gICAgZXh0ZW5zaW9uID0gJycsXG4gICAgcmVnaW9uID0gJycsXG4gICAgbGluZXMgPSAnJyxcbiAgICBsYW5nID0gJycsXG4gICAgcmF3VGl0bGUgPSAnJyxcbiAgXSA9IChyYXdQYXRoUmVnZXhwLmV4ZWMocmF3UGF0aCkgfHwgW10pLnNsaWNlKDEpO1xuXG4gIGNvbnN0IHRpdGxlID0gcmF3VGl0bGUgfHwgZmlsZXBhdGguc3BsaXQoJy8nKS5wb3AoKSB8fCAnJztcblxuICByZXR1cm4geyBleHRlbnNpb24sIGZpbGVwYXRoLCBsYW5nLCBsaW5lcywgcmVnaW9uLCB0aXRsZSB9O1xufVxuXG5leHBvcnQgY29uc3QgZGVtb1ByZXZpZXdQbHVnaW4gPSAobWQ6IE1hcmtkb3duUmVuZGVyZXIpID0+IHtcbiAgbWQuY29yZS5ydWxlci5hZnRlcignaW5saW5lJywgJ2RlbW8tcHJldmlldycsIChzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IGluc2VydENvbXBvbmVudEltcG9ydCA9IChpbXBvcnRTdHJpbmc6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSBzdGF0ZS50b2tlbnMuZmluZEluZGV4KFxuICAgICAgICAoaSkgPT4gaS50eXBlID09PSAnaHRtbF9ibG9jaycgJiYgaS5jb250ZW50Lm1hdGNoKC88c2NyaXB0IHNldHVwPi9nKSxcbiAgICAgICk7XG4gICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGltcG9ydENvbXBvbmVudCA9IG5ldyBzdGF0ZS5Ub2tlbignaHRtbF9ibG9jaycsICcnLCAwKTtcbiAgICAgICAgaW1wb3J0Q29tcG9uZW50LmNvbnRlbnQgPSBgPHNjcmlwdCBzZXR1cD5cXG4ke2ltcG9ydFN0cmluZ31cXG48L3NjcmlwdD5cXG5gO1xuICAgICAgICBzdGF0ZS50b2tlbnMuc3BsaWNlKDAsIDAsIGltcG9ydENvbXBvbmVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc3RhdGUudG9rZW5zW2luZGV4XSkge1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBzdGF0ZS50b2tlbnNbaW5kZXhdLmNvbnRlbnQ7XG4gICAgICAgICAgc3RhdGUudG9rZW5zW2luZGV4XS5jb250ZW50ID0gY29udGVudC5yZXBsYWNlKFxuICAgICAgICAgICAgJzwvc2NyaXB0PicsXG4gICAgICAgICAgICBgJHtpbXBvcnRTdHJpbmd9XFxuPC9zY3JpcHQ+YCxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICAvLyBEZWZpbmUgdGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCB0aGUgZGVzaXJlZCBwYXR0ZXJuXG4gICAgY29uc3QgcmVnZXggPSAvPERlbW9QcmV2aWV3W14+XSpcXHNkaXI9XCIoW15cIl0qKVwiL2c7XG4gICAgLy8gSXRlcmF0ZSB0aHJvdWdoIHRoZSBNYXJrZG93biBjb250ZW50IGFuZCByZXBsYWNlIHRoZSBwYXR0ZXJuXG4gICAgc3RhdGUuc3JjID0gc3RhdGUuc3JjLnJlcGxhY2VBbGwocmVnZXgsIChfbWF0Y2gsIGRpcikgPT4ge1xuICAgICAgY29uc3QgY29tcG9uZW50RGlyID0gam9pbihwcm9jZXNzLmN3ZCgpLCAnc3JjJywgZGlyKS5yZXBsYWNlQWxsKFxuICAgICAgICAnXFxcXCcsXG4gICAgICAgICcvJyxcbiAgICAgICk7XG5cbiAgICAgIGxldCBjaGlsZEZpbGVzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgbGV0IGRpckV4aXN0cyA9IHRydWU7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNoaWxkRmlsZXMgPVxuICAgICAgICAgIHJlYWRkaXJTeW5jKGNvbXBvbmVudERpciwge1xuICAgICAgICAgICAgZW5jb2Rpbmc6ICd1dGY4JyxcbiAgICAgICAgICAgIHJlY3Vyc2l2ZTogZmFsc2UsXG4gICAgICAgICAgICB3aXRoRmlsZVR5cGVzOiBmYWxzZSxcbiAgICAgICAgICB9KSB8fCBbXTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICBkaXJFeGlzdHMgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkaXJFeGlzdHMpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB1bmlxdWVXb3JkID0gZ2VuZXJhdGVDb250ZW50SGFzaChjb21wb25lbnREaXIpO1xuXG4gICAgICBjb25zdCBDb21wb25lbnROYW1lID0gYERlbW9Db21wb25lbnRfJHt1bmlxdWVXb3JkfWA7XG4gICAgICBpbnNlcnRDb21wb25lbnRJbXBvcnQoXG4gICAgICAgIGBpbXBvcnQgJHtDb21wb25lbnROYW1lfSBmcm9tICcke2NvbXBvbmVudERpcn0vaW5kZXgudnVlJ2AsXG4gICAgICApO1xuICAgICAgY29uc3QgeyBwYXRoOiBfcGF0aCB9ID0gc3RhdGUuZW52IGFzIE1hcmtkb3duRW52O1xuXG4gICAgICBjb25zdCBpbmRleCA9IHN0YXRlLnRva2Vucy5maW5kSW5kZXgoKGkpID0+IGkuY29udGVudC5tYXRjaChyZWdleCkpO1xuXG4gICAgICBpZiAoIXN0YXRlLnRva2Vuc1tpbmRleF0pIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgICAgY29uc3QgZmlyc3RTdHJpbmcgPSAnaW5kZXgudnVlJztcbiAgICAgIGNoaWxkRmlsZXMgPSBjaGlsZEZpbGVzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgaWYgKGEgPT09IGZpcnN0U3RyaW5nKSByZXR1cm4gLTE7XG4gICAgICAgIGlmIChiID09PSBmaXJzdFN0cmluZykgcmV0dXJuIDE7XG4gICAgICAgIHJldHVybiBhLmxvY2FsZUNvbXBhcmUoYiwgJ2VuJywgeyBzZW5zaXRpdml0eTogJ2Jhc2UnIH0pO1xuICAgICAgfSk7XG4gICAgICBzdGF0ZS50b2tlbnNbaW5kZXhdLmNvbnRlbnQgPVxuICAgICAgICBgPERlbW9QcmV2aWV3IGZpbGVzPVwiJHtlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY2hpbGRGaWxlcykpfVwiID48JHtDb21wb25lbnROYW1lfS8+XG4gICAgICAgIGA7XG5cbiAgICAgIGNvbnN0IF9kdW1teVRva2VuID0gbmV3IHN0YXRlLlRva2VuKCcnLCAnJywgMCk7XG4gICAgICBjb25zdCB0b2tlbkFycmF5OiBBcnJheTx0eXBlb2YgX2R1bW15VG9rZW4+ID0gW107XG4gICAgICBjaGlsZEZpbGVzLmZvckVhY2goKGZpbGVuYW1lKSA9PiB7XG4gICAgICAgIC8vIGNvbnN0IHNsb3ROYW1lID0gZmlsZW5hbWUucmVwbGFjZShleHRuYW1lKGZpbGVuYW1lKSwgJycpO1xuXG4gICAgICAgIGNvbnN0IHRlbXBsYXRlU3RhcnQgPSBuZXcgc3RhdGUuVG9rZW4oJ2h0bWxfaW5saW5lJywgJycsIDApO1xuICAgICAgICB0ZW1wbGF0ZVN0YXJ0LmNvbnRlbnQgPSBgPHRlbXBsYXRlICMke2ZpbGVuYW1lfT5gO1xuICAgICAgICB0b2tlbkFycmF5LnB1c2godGVtcGxhdGVTdGFydCk7XG5cbiAgICAgICAgY29uc3QgcmVzb2x2ZWRQYXRoID0gam9pbihjb21wb25lbnREaXIsIGZpbGVuYW1lKTtcblxuICAgICAgICBjb25zdCB7IGV4dGVuc2lvbiwgZmlsZXBhdGgsIGxhbmcsIGxpbmVzLCB0aXRsZSB9ID1cbiAgICAgICAgICByYXdQYXRoVG9Ub2tlbihyZXNvbHZlZFBhdGgpO1xuICAgICAgICAvLyBBZGQgY29kZSB0b2tlbnMgZm9yIGVhY2ggbGluZVxuICAgICAgICBjb25zdCB0b2tlbiA9IG5ldyBzdGF0ZS5Ub2tlbignZmVuY2UnLCAnY29kZScsIDApO1xuICAgICAgICB0b2tlbi5pbmZvID0gYCR7bGFuZyB8fCBleHRlbnNpb259JHtsaW5lcyA/IGB7JHtsaW5lc319YCA6ICcnfSR7XG4gICAgICAgICAgdGl0bGUgPyBgWyR7dGl0bGV9XWAgOiAnJ1xuICAgICAgICB9YDtcblxuICAgICAgICB0b2tlbi5jb250ZW50ID0gYDw8PCAke2ZpbGVwYXRofWA7XG4gICAgICAgICh0b2tlbiBhcyBhbnkpLnNyYyA9IFtyZXNvbHZlZFBhdGhdO1xuICAgICAgICB0b2tlbkFycmF5LnB1c2godG9rZW4pO1xuXG4gICAgICAgIGNvbnN0IHRlbXBsYXRlRW5kID0gbmV3IHN0YXRlLlRva2VuKCdodG1sX2lubGluZScsICcnLCAwKTtcbiAgICAgICAgdGVtcGxhdGVFbmQuY29udGVudCA9ICc8L3RlbXBsYXRlPic7XG4gICAgICAgIHRva2VuQXJyYXkucHVzaCh0ZW1wbGF0ZUVuZCk7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGVuZFRhZyA9IG5ldyBzdGF0ZS5Ub2tlbignaHRtbF9pbmxpbmUnLCAnJywgMCk7XG4gICAgICBlbmRUYWcuY29udGVudCA9ICc8L0RlbW9QcmV2aWV3Pic7XG4gICAgICB0b2tlbkFycmF5LnB1c2goZW5kVGFnKTtcblxuICAgICAgc3RhdGUudG9rZW5zLnNwbGljZShpbmRleCArIDEsIDAsIC4uLnRva2VuQXJyYXkpO1xuXG4gICAgICAvLyBjb25zb2xlLmxvZyhcbiAgICAgIC8vICAgc3RhdGUubWQucmVuZGVyZXIucmVuZGVyKHN0YXRlLnRva2Vucywgc3RhdGU/Lm9wdGlvbnMgPz8gW10sIHN0YXRlLmVudiksXG4gICAgICAvLyApO1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmZ1bmN0aW9uIGdlbmVyYXRlQ29udGVudEhhc2goaW5wdXQ6IHN0cmluZywgbGVuZ3RoOiBudW1iZXIgPSAxMCk6IHN0cmluZyB7XG4gIC8vIFx1NEY3Rlx1NzUyOCBTSEEtMjU2IFx1NzUxRlx1NjIxMFx1NTRDOFx1NUUwQ1x1NTAzQ1xuICBjb25zdCBoYXNoID0gY3J5cHRvLmNyZWF0ZUhhc2goJ3NoYTI1NicpLnVwZGF0ZShpbnB1dCkuZGlnZXN0KCdoZXgnKTtcblxuICAvLyBcdTVDMDZcdTU0QzhcdTVFMENcdTUwM0NcdThGNkNcdTYzNjJcdTRFM0EgQmFzZTM2IFx1N0YxNlx1NzgwMVx1RkYwQ1x1NUU3Nlx1NTNENlx1NjMwN1x1NUI5QVx1OTU3Rlx1NUVBNlx1NzY4NFx1NUI1N1x1N0IyNlx1NEY1Q1x1NEUzQVx1N0VEM1x1Njc5Q1xuICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGhhc2gsIDE2KS50b1N0cmluZygzNikuc2xpY2UoMCwgbGVuZ3RoKTtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcXHU2RDQxXHU5MUNGXHU1RjU1XHU1MjM2XHU1NDhDXHU1NkRFXHU2NTNFXFxcXG9zbW8tdnVlM1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxcdTZENDFcdTkxQ0ZcdTVGNTVcdTUyMzZcdTU0OENcdTU2REVcdTY1M0VcXFxcb3Ntby12dWUzXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxjb25maWdcXFxcemgubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi8lRTYlQjUlODElRTklODclOEYlRTUlQkQlOTUlRTUlODglQjYlRTUlOTIlOEMlRTUlOUIlOUUlRTYlOTQlQkUvb3Ntby12dWUzL2RvY3MvLnZpdGVwcmVzcy9jb25maWcvemgubXRzXCI7aW1wb3J0IHR5cGUgeyBEZWZhdWx0VGhlbWUgfSBmcm9tICd2aXRlcHJlc3MnO1xuXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlcHJlc3MnO1xuXG5pbXBvcnQgeyB2ZXJzaW9uIH0gZnJvbSAnLi4vLi4vLi4vcGFja2FnZS5qc29uJztcblxuZXhwb3J0IGNvbnN0IHpoID0gZGVmaW5lQ29uZmlnKHtcbiAgZGVzY3JpcHRpb246ICdWYmVuIEFkbWluICYgXHU0RjAxXHU0RTFBXHU3RUE3XHU3QkExXHU3NDA2XHU3Q0ZCXHU3RURGXHU2ODQ2XHU2N0I2JyxcbiAgbGFuZzogJ3poLUhhbnMnLFxuICB0aGVtZUNvbmZpZzoge1xuICAgIGRhcmtNb2RlU3dpdGNoTGFiZWw6ICdcdTRFM0JcdTk4OTgnLFxuICAgIGRhcmtNb2RlU3dpdGNoVGl0bGU6ICdcdTUyMDdcdTYzNjJcdTUyMzBcdTZERjFcdTgyNzJcdTZBMjFcdTVGMEYnLFxuICAgIGRvY0Zvb3Rlcjoge1xuICAgICAgbmV4dDogJ1x1NEUwQlx1NEUwMFx1OTg3NScsXG4gICAgICBwcmV2OiAnXHU0RTBBXHU0RTAwXHU5ODc1JyxcbiAgICB9LFxuICAgIGVkaXRMaW5rOiB7XG4gICAgICBwYXR0ZXJuOlxuICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL3ZiZW5qcy92dWUtdmJlbi1hZG1pbi9lZGl0L21haW4vZG9jcy9zcmMvOnBhdGgnLFxuICAgICAgdGV4dDogJ1x1NTcyOCBHaXRIdWIgXHU0RTBBXHU3RjE2XHU4RjkxXHU2QjY0XHU5ODc1XHU5NzYyJyxcbiAgICB9LFxuICAgIGZvb3Rlcjoge1xuICAgICAgY29weXJpZ2h0OiBgQ29weXJpZ2h0IFx1MDBBOSAyMDIwLSR7bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpfSBWYmVuYCxcbiAgICAgIG1lc3NhZ2U6ICdcdTU3RkFcdTRFOEUgTUlUIFx1OEJCOFx1NTNFRlx1NTNEMVx1NUUwMy4nLFxuICAgIH0sXG4gICAgbGFuZ01lbnVMYWJlbDogJ1x1NTkxQVx1OEJFRFx1OEEwMCcsXG4gICAgbGFzdFVwZGF0ZWQ6IHtcbiAgICAgIGZvcm1hdE9wdGlvbnM6IHtcbiAgICAgICAgZGF0ZVN0eWxlOiAnc2hvcnQnLFxuICAgICAgICB0aW1lU3R5bGU6ICdtZWRpdW0nLFxuICAgICAgfSxcbiAgICAgIHRleHQ6ICdcdTY3MDBcdTU0MEVcdTY2RjRcdTY1QjBcdTRFOEUnLFxuICAgIH0sXG4gICAgbGlnaHRNb2RlU3dpdGNoVGl0bGU6ICdcdTUyMDdcdTYzNjJcdTUyMzBcdTZENDVcdTgyNzJcdTZBMjFcdTVGMEYnLFxuICAgIG5hdjogbmF2KCksXG5cbiAgICBvdXRsaW5lOiB7XG4gICAgICBsYWJlbDogJ1x1OTg3NVx1OTc2Mlx1NUJGQ1x1ODIyQScsXG4gICAgfSxcbiAgICByZXR1cm5Ub1RvcExhYmVsOiAnXHU1NkRFXHU1MjMwXHU5ODc2XHU5MEU4JyxcblxuICAgIHNpZGViYXI6IHtcbiAgICAgICcvY29tbWVyY2lhbC8nOiB7IGJhc2U6ICcvY29tbWVyY2lhbC8nLCBpdGVtczogc2lkZWJhckNvbW1lcmNpYWwoKSB9LFxuICAgICAgJy9jb21wb25lbnRzLyc6IHsgYmFzZTogJy9jb21wb25lbnRzLycsIGl0ZW1zOiBzaWRlYmFyQ29tcG9uZW50cygpIH0sXG4gICAgICAnL2d1aWRlLyc6IHsgYmFzZTogJy9ndWlkZS8nLCBpdGVtczogc2lkZWJhckd1aWRlKCkgfSxcbiAgICB9LFxuICAgIHNpZGViYXJNZW51TGFiZWw6ICdcdTgzRENcdTUzNTUnLFxuICB9LFxufSk7XG5cbmZ1bmN0aW9uIHNpZGViYXJHdWlkZSgpOiBEZWZhdWx0VGhlbWUuU2lkZWJhckl0ZW1bXSB7XG4gIHJldHVybiBbXG4gICAge1xuICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICAgIHRleHQ6ICdcdTdCODBcdTRFQ0InLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICdpbnRyb2R1Y3Rpb24vdmJlbicsXG4gICAgICAgICAgdGV4dDogJ1x1NTE3M1x1NEU4RSBPc21vJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICdpbnRyb2R1Y3Rpb24vd2h5JyxcbiAgICAgICAgICB0ZXh0OiAnXHU0RTNBXHU0RUMwXHU0RTQ4XHU5MDA5XHU2MkU5XHU2MjExXHU0RUVDPycsXG4gICAgICAgIH0sXG4gICAgICAgIHsgbGluazogJ2ludHJvZHVjdGlvbi9xdWljay1zdGFydCcsIHRleHQ6ICdcdTVGRUJcdTkwMUZcdTVGMDBcdTU5Q0InIH0sXG4gICAgICAgIHsgbGluazogJ2ludHJvZHVjdGlvbi90aGluJywgdGV4dDogJ1x1N0NCRVx1N0I4MFx1NzI0OFx1NjcyQycgfSxcbiAgICAgICAge1xuICAgICAgICAgIGJhc2U6ICcvJyxcbiAgICAgICAgICBsaW5rOiAnY29tcG9uZW50cy9pbnRyb2R1Y3Rpb24nLFxuICAgICAgICAgIHRleHQ6ICdcdTdFQzRcdTRFRjZcdTY1ODdcdTY4NjMnLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdcdTU3RkFcdTc4NDAnLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAgeyBsaW5rOiAnZXNzZW50aWFscy9jb25jZXB0JywgdGV4dDogJ1x1NTdGQVx1Nzg0MFx1Njk4Mlx1NUZGNScgfSxcbiAgICAgICAgeyBsaW5rOiAnZXNzZW50aWFscy9kZXZlbG9wbWVudCcsIHRleHQ6ICdcdTY3MkNcdTU3MzBcdTVGMDBcdTUzRDEnIH0sXG4gICAgICAgIHsgbGluazogJ2Vzc2VudGlhbHMvcm91dGUnLCB0ZXh0OiAnXHU4REVGXHU3NTMxXHU1NDhDXHU4M0RDXHU1MzU1JyB9LFxuICAgICAgICB7IGxpbms6ICdlc3NlbnRpYWxzL3NldHRpbmdzJywgdGV4dDogJ1x1OTE0RFx1N0Y2RScgfSxcbiAgICAgICAgeyBsaW5rOiAnZXNzZW50aWFscy9pY29ucycsIHRleHQ6ICdcdTU2RkVcdTY4MDcnIH0sXG4gICAgICAgIHsgbGluazogJ2Vzc2VudGlhbHMvc3R5bGVzJywgdGV4dDogJ1x1NjgzN1x1NUYwRicgfSxcbiAgICAgICAgeyBsaW5rOiAnZXNzZW50aWFscy9leHRlcm5hbC1tb2R1bGUnLCB0ZXh0OiAnXHU1OTE2XHU5MEU4XHU2QTIxXHU1NzU3JyB9LFxuICAgICAgICB7IGxpbms6ICdlc3NlbnRpYWxzL2J1aWxkJywgdGV4dDogJ1x1Njc4NFx1NUVGQVx1NEUwRVx1OTBFOFx1N0Y3MicgfSxcbiAgICAgICAgeyBsaW5rOiAnZXNzZW50aWFscy9zZXJ2ZXInLCB0ZXh0OiAnXHU2NzBEXHU1MkExXHU3QUVGXHU0RUE0XHU0RTkyXHU0RTBFXHU2NTcwXHU2MzZFTW9jaycgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnXHU2REYxXHU1MTY1JyxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHsgbGluazogJ2luLWRlcHRoL2xvZ2luJywgdGV4dDogJ1x1NzY3Qlx1NUY1NScgfSxcbiAgICAgICAgLy8geyBsaW5rOiAnaW4tZGVwdGgvbGF5b3V0JywgdGV4dDogJ1x1NUUwM1x1NUM0MCcgfSxcbiAgICAgICAgeyBsaW5rOiAnaW4tZGVwdGgvdGhlbWUnLCB0ZXh0OiAnXHU0RTNCXHU5ODk4JyB9LFxuICAgICAgICB7IGxpbms6ICdpbi1kZXB0aC9hY2Nlc3MnLCB0ZXh0OiAnXHU2NzQzXHU5NjUwJyB9LFxuICAgICAgICB7IGxpbms6ICdpbi1kZXB0aC9sb2NhbGUnLCB0ZXh0OiAnXHU1NkZEXHU5NjQ1XHU1MzE2JyB9LFxuICAgICAgICB7IGxpbms6ICdpbi1kZXB0aC9mZWF0dXJlcycsIHRleHQ6ICdcdTVFMzhcdTc1MjhcdTUyOUZcdTgwRkQnIH0sXG4gICAgICAgIHsgbGluazogJ2luLWRlcHRoL2NoZWNrLXVwZGF0ZXMnLCB0ZXh0OiAnXHU2OEMwXHU2N0U1XHU2NkY0XHU2NUIwJyB9LFxuICAgICAgICB7IGxpbms6ICdpbi1kZXB0aC9sb2FkaW5nJywgdGV4dDogJ1x1NTE2OFx1NUM0MGxvYWRpbmcnIH0sXG4gICAgICAgIHsgbGluazogJ2luLWRlcHRoL3VpLWZyYW1ld29yaycsIHRleHQ6ICdcdTdFQzRcdTRFRjZcdTVFOTNcdTUyMDdcdTYzNjInIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ1x1NURFNVx1N0EwQicsXG4gICAgICBpdGVtczogW1xuICAgICAgICB7IGxpbms6ICdwcm9qZWN0L3N0YW5kYXJkJywgdGV4dDogJ1x1ODlDNFx1ODMwMycgfSxcbiAgICAgICAgeyBsaW5rOiAncHJvamVjdC9jbGknLCB0ZXh0OiAnQ0xJJyB9LFxuICAgICAgICB7IGxpbms6ICdwcm9qZWN0L2RpcicsIHRleHQ6ICdcdTc2RUVcdTVGNTVcdThCRjRcdTY2MEUnIH0sXG4gICAgICAgIHsgbGluazogJ3Byb2plY3QvdGVzdCcsIHRleHQ6ICdcdTUzNTVcdTUxNDNcdTZENEJcdThCRDUnIH0sXG4gICAgICAgIHsgbGluazogJ3Byb2plY3QvdGFpbHdpbmRjc3MnLCB0ZXh0OiAnVGFpbHdpbmQgQ1NTJyB9LFxuICAgICAgICB7IGxpbms6ICdwcm9qZWN0L2NoYW5nZXNldCcsIHRleHQ6ICdDaGFuZ2VzZXQnIH0sXG4gICAgICAgIHsgbGluazogJ3Byb2plY3Qvdml0ZScsIHRleHQ6ICdWaXRlIENvbmZpZycgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnXHU1MTc2XHU0RUQ2JyxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHsgbGluazogJ290aGVyL3Byb2plY3QtdXBkYXRlJywgdGV4dDogJ1x1OTg3OVx1NzZFRVx1NjZGNFx1NjVCMCcgfSxcbiAgICAgICAgeyBsaW5rOiAnb3RoZXIvcmVtb3ZlLWNvZGUnLCB0ZXh0OiAnXHU3OUZCXHU5NjY0XHU0RUUzXHU3ODAxJyB9LFxuICAgICAgICB7IGxpbms6ICdvdGhlci9mYXEnLCB0ZXh0OiAnXHU1RTM4XHU4OUMxXHU5NUVFXHU5ODk4JyB9LFxuICAgICAgXSxcbiAgICB9LFxuICBdO1xufVxuXG5mdW5jdGlvbiBzaWRlYmFyQ29tbWVyY2lhbCgpOiBEZWZhdWx0VGhlbWUuU2lkZWJhckl0ZW1bXSB7XG4gIHJldHVybiBbXG4gICAge1xuICAgICAgbGluazogJ2NvbW11bml0eScsXG4gICAgICB0ZXh0OiAnXHU0RUE0XHU2RDQxXHU3RkE0JyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxpbms6ICd0ZWNobmljYWwtc3VwcG9ydCcsXG4gICAgICB0ZXh0OiAnXHU2MjgwXHU2NzJGXHU2NTJGXHU2MzAxJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxpbms6ICdjdXN0b21pemVkJyxcbiAgICAgIHRleHQ6ICdcdTVCOUFcdTUyMzZcdTVGMDBcdTUzRDEnLFxuICAgIH0sXG4gIF07XG59XG5cbmZ1bmN0aW9uIHNpZGViYXJDb21wb25lbnRzKCk6IERlZmF1bHRUaGVtZS5TaWRlYmFySXRlbVtdIHtcbiAgcmV0dXJuIFtcbiAgICB7XG4gICAgICB0ZXh0OiAnXHU3RUM0XHU0RUY2JyxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnaW50cm9kdWN0aW9uJyxcbiAgICAgICAgICB0ZXh0OiAnXHU0RUNCXHU3RUNEJyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgICAgdGV4dDogJ1x1NUUwM1x1NUM0MFx1N0VDNFx1NEVGNicsXG4gICAgICBpdGVtczogW1xuICAgICAgICB7XG4gICAgICAgICAgbGluazogJ2xheW91dC11aS9wYWdlJyxcbiAgICAgICAgICB0ZXh0OiAnUGFnZSBcdTk4NzVcdTk3NjInLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICB0ZXh0OiAnXHU5MDFBXHU3NTI4XHU3RUM0XHU0RUY2JyxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnY29tbW9uLXVpL3ZiZW4tYXBpLWNvbXBvbmVudCcsXG4gICAgICAgICAgdGV4dDogJ0FwaUNvbXBvbmVudCBBcGlcdTdFQzRcdTRFRjZcdTUzMDVcdTg4QzVcdTU2NjgnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJ2NvbW1vbi11aS92YmVuLWFsZXJ0JyxcbiAgICAgICAgICB0ZXh0OiAnQWxlcnQgXHU4RjdCXHU5MUNGXHU2M0QwXHU3OTNBXHU2ODQ2JyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICdjb21tb24tdWkvdmJlbi1tb2RhbCcsXG4gICAgICAgICAgdGV4dDogJ01vZGFsIFx1NkEyMVx1NjAwMVx1Njg0NicsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnY29tbW9uLXVpL3ZiZW4tZHJhd2VyJyxcbiAgICAgICAgICB0ZXh0OiAnRHJhd2VyIFx1NjJCRFx1NUM0OScsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnY29tbW9uLXVpL3ZiZW4tZm9ybScsXG4gICAgICAgICAgdGV4dDogJ0Zvcm0gXHU4ODY4XHU1MzU1JyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICdjb21tb24tdWkvdmJlbi12eGUtdGFibGUnLFxuICAgICAgICAgIHRleHQ6ICdWeGUgVGFibGUgXHU4ODY4XHU2ODNDJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICdjb21tb24tdWkvdmJlbi1jb3VudC10by1hbmltYXRvcicsXG4gICAgICAgICAgdGV4dDogJ0NvdW50VG9BbmltYXRvciBcdTY1NzBcdTVCNTdcdTUyQThcdTc1M0InLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJ2NvbW1vbi11aS92YmVuLWVsbGlwc2lzLXRleHQnLFxuICAgICAgICAgIHRleHQ6ICdFbGxpcHNpc1RleHQgXHU3NzAxXHU3NTY1XHU2NTg3XHU2NzJDJyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgXTtcbn1cblxuZnVuY3Rpb24gbmF2KCk6IERlZmF1bHRUaGVtZS5OYXZJdGVtW10ge1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIGFjdGl2ZU1hdGNoOiAnXi8oZ3VpZGV8Y29tcG9uZW50cykvJyxcbiAgICAgIHRleHQ6ICdcdTY1ODdcdTY4NjMnLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGFjdGl2ZU1hdGNoOiAnXi9ndWlkZS8nLFxuICAgICAgICAgIGxpbms6ICcvZ3VpZGUvaW50cm9kdWN0aW9uL3ZiZW4nLFxuICAgICAgICAgIHRleHQ6ICdcdTYzMDdcdTUzNTcnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgYWN0aXZlTWF0Y2g6ICdeL2NvbXBvbmVudHMvJyxcbiAgICAgICAgICBsaW5rOiAnL2NvbXBvbmVudHMvaW50cm9kdWN0aW9uJyxcbiAgICAgICAgICB0ZXh0OiAnXHU3RUM0XHU0RUY2JyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdcdTUzODZcdTUzRjJcdTcyNDhcdTY3MkMnLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxpbms6ICdodHRwczovL2RvYy52dmJpbi5jbicsXG4gICAgICAgICAgICAgIHRleHQ6ICcyLnhcdTcyNDhcdTY3MkNcdTY1ODdcdTY4NjMnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdcdTdDRkJcdTdFREZcdTU3MzBcdTU3NDAnLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdPc21vJyxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsaW5rOiAnaHR0cHM6Ly93d3cudmJlbi5wcm8nLFxuICAgICAgICAgICAgICB0ZXh0OiAnMC4wLjFcdTcyNDhcdTY3MkMnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgIC8vICAgbGluazogJ2h0dHBzOi8vYW50LnZiZW4ucHJvJyxcbiAgICAgICAgICAgIC8vICAgdGV4dDogJ0FudCBEZXNpZ24gVnVlIFx1NzI0OFx1NjcyQycsXG4gICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgLy8gICBsaW5rOiAnaHR0cHM6Ly9uYWl2ZS52YmVuLnBybycsXG4gICAgICAgICAgICAvLyAgIHRleHQ6ICdOYWl2ZSBcdTcyNDhcdTY3MkMnLFxuICAgICAgICAgICAgLy8gfSxcbiAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgIC8vICAgbGluazogJ2h0dHBzOi8vZWxlLnZiZW4ucHJvJyxcbiAgICAgICAgICAgIC8vICAgdGV4dDogJ0VsZW1lbnQgUGx1c1x1NzI0OFx1NjcyQycsXG4gICAgICAgICAgICAvLyB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICB0ZXh0OiAnXHU1MTc2XHU0RUQ2JyxcbiAgICAgICAgLy8gICBpdGVtczogW1xuICAgICAgICAvLyAgICAge1xuICAgICAgICAvLyAgICAgICBsaW5rOiAnaHR0cHM6Ly92YmVuLnZ2YmluLmNuJyxcbiAgICAgICAgLy8gICAgICAgdGV4dDogJ09zbW8gMi54JyxcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgXSxcbiAgICAgICAgLy8gfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICAvLyB7XG4gICAgLy8gICB0ZXh0OiB2ZXJzaW9uLFxuICAgIC8vICAgaXRlbXM6IFtcbiAgICAvLyAgICAge1xuICAgIC8vICAgICAgIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vdmJlbmpzL3Z1ZS12YmVuLWFkbWluL3JlbGVhc2VzJyxcbiAgICAvLyAgICAgICB0ZXh0OiAnXHU2NkY0XHU2NUIwXHU2NUU1XHU1RkQ3JyxcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgICAge1xuICAgIC8vICAgICAgIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vb3Jncy92YmVuanMvcHJvamVjdHMvNScsXG4gICAgLy8gICAgICAgdGV4dDogJ1x1OERFRlx1N0VCRlx1NTZGRScsXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICAgIHtcbiAgICAvLyAgICAgICBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL3ZiZW5qcy92dWUtdmJlbi1hZG1pbi9ibG9iL21haW4vLmdpdGh1Yi9jb250cmlidXRpbmcubWQnLFxuICAgIC8vICAgICAgIHRleHQ6ICdcdThEMjFcdTczMkUnLFxuICAgIC8vICAgICB9LFxuICAgIC8vICAgXSxcbiAgICAvLyB9LHtcbiAgICAvLyAgIHRleHQ6IHZlcnNpb24sXG4gICAgLy8gICBpdGVtczogW1xuICAgIC8vICAgICB7XG4gICAgLy8gICAgICAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS92YmVuanMvdnVlLXZiZW4tYWRtaW4vcmVsZWFzZXMnLFxuICAgIC8vICAgICAgIHRleHQ6ICdcdTY2RjRcdTY1QjBcdTY1RTVcdTVGRDcnLFxuICAgIC8vICAgICB9LFxuICAgIC8vICAgICB7XG4gICAgLy8gICAgICAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS9vcmdzL3ZiZW5qcy9wcm9qZWN0cy81JyxcbiAgICAvLyAgICAgICB0ZXh0OiAnXHU4REVGXHU3RUJGXHU1NkZFJyxcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgICAge1xuICAgIC8vICAgICAgIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vdmJlbmpzL3Z1ZS12YmVuLWFkbWluL2Jsb2IvbWFpbi8uZ2l0aHViL2NvbnRyaWJ1dGluZy5tZCcsXG4gICAgLy8gICAgICAgdGV4dDogJ1x1OEQyMVx1NzMyRScsXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICBdLFxuICAgIC8vIH0sXG4gICAgLy8ge1xuICAgIC8vICAgbGluazogJy9jb21tZXJjaWFsL3RlY2huaWNhbC1zdXBwb3J0JyxcbiAgICAvLyAgIHRleHQ6ICdcdUQ4M0VcdUREODQgXHU2MjgwXHU2NzJGXHU2NTJGXHU2MzAxJyxcbiAgICAvLyB9LFxuICAgIC8vIHtcbiAgICAvLyAgIGxpbms6ICcvc3BvbnNvci9wZXJzb25hbCcsXG4gICAgLy8gICB0ZXh0OiAnXHUyNzI4IFx1OEQ1RVx1NTJBOScsXG4gICAgLy8gfSxcbiAgICB7XG4gICAgICBsaW5rOiAnL2NvbW1lcmNpYWwvY29tbXVuaXR5JyxcbiAgICAgIHRleHQ6ICdcdUQ4M0RcdURDNjhcdTIwMERcdUQ4M0RcdURDNjZcdTIwMERcdUQ4M0RcdURDNjYgXHU0RUE0XHU2RDQxXHU3RkE0JyxcbiAgICAgIC8vIGl0ZW1zOiBbXG4gICAgICAvLyAgIHtcbiAgICAgIC8vICAgICBsaW5rOiAnaHR0cHM6Ly9xdW4ucXEuY29tL3Fxd2ViL3F1bnByby9zaGFyZT9fd3Y9MyZfd3d2PTEyOCZhcHBDaGFubmVsPXNoYXJlJmludml0ZUNvZGU9MjJ5U3pqN3BLaXcmYnVzaW5lc3NUeXBlPTkmZnJvbT0yNDY2MTAmYml6PWthJm1haW5Tb3VyY2VJZD1zaGFyZSZzdWJTb3VyY2VJZD1vdGhlcnMmanVtcHNvdXJjZT1zaG9ydHVybCMvcGMnLFxuICAgICAgLy8gICAgIHRleHQ6ICdRUVx1OTg5MVx1OTA1MycsXG4gICAgICAvLyAgIH0sXG4gICAgICAvLyAgIHtcbiAgICAgIC8vICAgICBsaW5rOiAnaHR0cHM6Ly9xbS5xcS5jb20vY2dpLWJpbi9xbS9xcj9fd3Y9MTAyNyZrPW1qWm1saGdWenpVeHZkeGxsQjZDMXZIcFg4TzhRUkwwJmF1dGhLZXk9REJkRmJCd0VSbWZhS1k5NUp2UldxTENKSVJHSkFtS3laYnJwelo0MUVLRE1aNVNSNk1mYmpPQmFhTlJONzNmciZub3ZlcmlmeT0wJmdyb3VwX2NvZGU9NDI4NjEwOScsXG4gICAgICAvLyAgICAgdGV4dDogJ1FRXHU3RkE0JyxcbiAgICAgIC8vICAgfSxcbiAgICAgIC8vICAge1xuICAgICAgLy8gICAgIGxpbms6ICdodHRwczovL2Rpc2NvcmQuZ2cvVlU2MmpUZWNhZCcsXG4gICAgICAvLyAgICAgdGV4dDogJ0Rpc2NvcmQnLFxuICAgICAgLy8gICB9LFxuICAgICAgLy8gXSxcbiAgICB9LFxuICAgIC8vIHtcbiAgICAvLyAgIGxpbms6ICcvZnJpZW5kLWxpbmtzLycsXG4gICAgLy8gICB0ZXh0OiAnXHVEODNFXHVERDFEIFx1NTNDQlx1NjBDNVx1OTRGRVx1NjNBNScsXG4gICAgLy8gfSxcbiAgXTtcbn1cblxuZXhwb3J0IGNvbnN0IHNlYXJjaDogRGVmYXVsdFRoZW1lLkFsZ29saWFTZWFyY2hPcHRpb25zWydsb2NhbGVzJ10gPSB7XG4gIHJvb3Q6IHtcbiAgICBwbGFjZWhvbGRlcjogJ1x1NjQxQ1x1N0QyMlx1NjU4N1x1Njg2MycsXG4gICAgdHJhbnNsYXRpb25zOiB7XG4gICAgICBidXR0b246IHtcbiAgICAgICAgYnV0dG9uQXJpYUxhYmVsOiAnXHU2NDFDXHU3RDIyXHU2NTg3XHU2ODYzJyxcbiAgICAgICAgYnV0dG9uVGV4dDogJ1x1NjQxQ1x1N0QyMlx1NjU4N1x1Njg2MycsXG4gICAgICB9LFxuICAgICAgbW9kYWw6IHtcbiAgICAgICAgZXJyb3JTY3JlZW46IHtcbiAgICAgICAgICBoZWxwVGV4dDogJ1x1NEY2MFx1NTNFRlx1ODBGRFx1OTcwMFx1ODk4MVx1NjhDMFx1NjdFNVx1NEY2MFx1NzY4NFx1N0Y1MVx1N0VEQ1x1OEZERVx1NjNBNScsXG4gICAgICAgICAgdGl0bGVUZXh0OiAnXHU2NUUwXHU2Q0Q1XHU4M0I3XHU1M0Q2XHU3RUQzXHU2NzlDJyxcbiAgICAgICAgfSxcbiAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgY2xvc2VUZXh0OiAnXHU1MTczXHU5NUVEJyxcbiAgICAgICAgICBuYXZpZ2F0ZVRleHQ6ICdcdTUyMDdcdTYzNjInLFxuICAgICAgICAgIHNlYXJjaEJ5VGV4dDogJ1x1NjQxQ1x1N0QyMlx1NjNEMFx1NEY5Qlx1ODAwNScsXG4gICAgICAgICAgc2VsZWN0VGV4dDogJ1x1OTAwOVx1NjJFOScsXG4gICAgICAgIH0sXG4gICAgICAgIG5vUmVzdWx0c1NjcmVlbjoge1xuICAgICAgICAgIG5vUmVzdWx0c1RleHQ6ICdcdTY1RTBcdTZDRDVcdTYyN0VcdTUyMzBcdTc2RjhcdTUxNzNcdTdFRDNcdTY3OUMnLFxuICAgICAgICAgIHJlcG9ydE1pc3NpbmdSZXN1bHRzTGlua1RleHQ6ICdcdTcwQjlcdTUxRkJcdTUzQ0RcdTk5ODgnLFxuICAgICAgICAgIHJlcG9ydE1pc3NpbmdSZXN1bHRzVGV4dDogJ1x1NEY2MFx1OEJBNFx1NEUzQVx1OEJFNVx1NjdFNVx1OEJFMlx1NUU5NFx1OEJFNVx1NjcwOVx1N0VEM1x1Njc5Q1x1RkYxRicsXG4gICAgICAgICAgc3VnZ2VzdGVkUXVlcnlUZXh0OiAnXHU0RjYwXHU1M0VGXHU0RUU1XHU1QzFEXHU4QkQ1XHU2N0U1XHU4QkUyJyxcbiAgICAgICAgfSxcbiAgICAgICAgc2VhcmNoQm94OiB7XG4gICAgICAgICAgY2FuY2VsQnV0dG9uQXJpYUxhYmVsOiAnXHU1M0Q2XHU2RDg4JyxcbiAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnXHU1M0Q2XHU2RDg4JyxcbiAgICAgICAgICByZXNldEJ1dHRvbkFyaWFMYWJlbDogJ1x1NkUwNVx1OTY2NFx1NjdFNVx1OEJFMlx1Njc2MVx1NEVGNicsXG4gICAgICAgICAgcmVzZXRCdXR0b25UaXRsZTogJ1x1NkUwNVx1OTY2NFx1NjdFNVx1OEJFMlx1Njc2MVx1NEVGNicsXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXJ0U2NyZWVuOiB7XG4gICAgICAgICAgZmF2b3JpdGVTZWFyY2hlc1RpdGxlOiAnXHU2NTM2XHU4NUNGJyxcbiAgICAgICAgICBub1JlY2VudFNlYXJjaGVzVGV4dDogJ1x1NkNBMVx1NjcwOVx1NjQxQ1x1N0QyMlx1NTM4Nlx1NTNGMicsXG4gICAgICAgICAgcmVjZW50U2VhcmNoZXNUaXRsZTogJ1x1NjQxQ1x1N0QyMlx1NTM4Nlx1NTNGMicsXG4gICAgICAgICAgcmVtb3ZlRmF2b3JpdGVTZWFyY2hCdXR0b25UaXRsZTogJ1x1NEVDRVx1NjUzNlx1ODVDRlx1NEUyRFx1NzlGQlx1OTY2NCcsXG4gICAgICAgICAgcmVtb3ZlUmVjZW50U2VhcmNoQnV0dG9uVGl0bGU6ICdcdTRFQ0VcdTY0MUNcdTdEMjJcdTUzODZcdTUzRjJcdTRFMkRcdTc5RkJcdTk2NjQnLFxuICAgICAgICAgIHNhdmVSZWNlbnRTZWFyY2hCdXR0b25UaXRsZTogJ1x1NEZERFx1NUI1OFx1ODFGM1x1NjQxQ1x1N0QyMlx1NTM4Nlx1NTNGMicsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2VyxTQUFTLGVBQWU7QUFDclksU0FBUyw2QkFBNkI7OztBQ0N0QyxTQUFTLG9CQUFvQjs7O0FDQTNCLGNBQVc7OztBRElOLElBQU0sS0FBSyxhQUFhO0FBQUEsRUFDN0IsYUFBYTtBQUFBLEVBQ2IsTUFBTTtBQUFBLEVBQ04sYUFBYTtBQUFBLElBQ1gscUJBQXFCO0FBQUEsSUFDckIscUJBQXFCO0FBQUEsSUFDckIsV0FBVztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBLFVBQVU7QUFBQSxNQUNSLFNBQ0U7QUFBQSxNQUNGLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixXQUFXLHdCQUFvQixvQkFBSSxLQUFLLEdBQUUsWUFBWSxDQUFDO0FBQUEsTUFDdkQsU0FBUztBQUFBLElBQ1g7QUFBQSxJQUNBLGVBQWU7QUFBQSxJQUNmLGFBQWE7QUFBQSxNQUNYLGVBQWU7QUFBQSxRQUNiLFdBQVc7QUFBQSxRQUNYLFdBQVc7QUFBQSxNQUNiO0FBQUEsTUFDQSxNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0Esc0JBQXNCO0FBQUEsSUFDdEIsS0FBSyxJQUFJO0FBQUEsSUFDVCxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsSUFDVDtBQUFBLElBQ0Esa0JBQWtCO0FBQUEsSUFDbEIsU0FBUztBQUFBLE1BQ1AsbUJBQW1CO0FBQUEsUUFDakIsTUFBTTtBQUFBLFFBQ04sT0FBTyxrQkFBa0I7QUFBQSxNQUMzQjtBQUFBLE1BQ0EsY0FBYyxFQUFFLE1BQU0sY0FBYyxPQUFPLGFBQWEsRUFBRTtBQUFBLElBQzVEO0FBQUEsRUFDRjtBQUNGLENBQUM7QUFFRCxTQUFTLGVBQTJDO0FBQ2xELFNBQU87QUFBQSxJQUNMO0FBQUEsTUFDRSxXQUFXO0FBQUEsTUFDWCxNQUFNO0FBQUEsTUFDTixPQUFP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YTtBQUFBLFVBQ2IsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFNQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFlBQ0w7QUFBQSxjQUNFLE1BQU07QUFBQSxjQUNOLE1BQU07QUFBQSxZQUNSO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixPQUFPO0FBQUEsWUFDTDtBQUFBLGNBQ0UsTUFBTTtBQUFBLGNBQ04sTUFBTTtBQUFBLFlBQ1I7QUFBQSxZQUNBO0FBQUEsY0FDRSxNQUFNO0FBQUEsY0FDTixNQUFNO0FBQUEsWUFDUjtBQUFBLFlBQ0E7QUFBQSxjQUNFLE1BQU07QUFBQSxjQUNOLE1BQU07QUFBQSxZQUNSO0FBQUEsWUFDQTtBQUFBLGNBQ0UsTUFBTTtBQUFBLGNBQ04sTUFBTTtBQUFBLFlBQ1I7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE9BQU87QUFBQSxZQUNMO0FBQUEsY0FDRSxNQUFNO0FBQUEsY0FDTixNQUFNO0FBQUEsWUFDUjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTDtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0E7QUFB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TUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQUVBLFNBQVNELE9BQThCO0FBQ3JDLFNBQU87QUFBQSxJQUNMO0FBQUEsTUFDRSxhQUFhO0FBQUEsTUFDYixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTDtBQUFBLFVBQ0UsYUFBYTtBQUFBLFVBQ2IsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxhQUFhO0FBQUEsVUFDYixNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE9BQU87QUFBQSxZQUNMO0FBQUEsY0FDRSxNQUFNO0FBQUEsY0FDTixNQUFNO0FBQUEsWUFDUjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTDtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFlBQ0w7QUFBQSxjQUNFLE1BQU07QUFBQSxjQUNOLE1BQU07QUFBQSxZQUNSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFhRjtBQUFBLFFBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQVVGO0FBQUEsSUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQTBDQTtB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QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsT0FBTztBQUFBLFVBQ1AsS0FBSztBQUFBLFVBQ0wsTUFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsTUFDQSxJQUFJO0FBQUEsTUFDSixNQUFNO0FBQUEsTUFDTixZQUFZO0FBQUEsTUFDWixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0EsUUFBUSxRQUFRLFFBQVEsSUFBSSxHQUFHLGlCQUFpQjtBQUFBLElBQ2hELGNBQWM7QUFBQSxJQUNkLFNBQVM7QUFBQSxNQUNQLGNBQWMsQ0FBQywwQ0FBMEM7QUFBQSxNQUN6RCwrQkFBK0IsSUFBSSxPQUFPO0FBQUEsSUFDNUM7QUFBQSxFQUNGO0FBQ0Y7OztBSHBLQSxJQUFPLGdCQUFRO0FBQUEsRUFDYixzQkFBc0I7QUFBQSxJQUNwQixHQUFHO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUEsUUFDRixPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixHQUFHO0FBQUEsTUFDTDtBQUFBLE1BQ0EsTUFBTTtBQUFBLFFBQ0osT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sR0FBRztBQUFBLE1BQ0w7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDO0FBQ0g7IiwKICAibmFtZXMiOiBbImRlZmluZUNvbmZpZyIsICJkZWZpbmVDb25maWciLCAiZGVmaW5lQ29uZmlnIiwgIm5hdiIsICJzaWRlYmFyQ29tbWVyY2lhbCIsICJzaWRlYmFyR3VpZGUiLCAiZGVmaW5lQ29uZmlnIl0KfQo=
