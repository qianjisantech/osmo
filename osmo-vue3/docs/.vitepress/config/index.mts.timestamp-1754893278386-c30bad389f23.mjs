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
      copyright: `Copyright \xA9 2025-${(/* @__PURE__ */ new Date()).getFullYear()} Osmo`,
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
        { link: "introduction/quick-start", text: "\u5FEB\u901F\u5F00\u59CB" }
        // { link: 'introduction/thin', text: '精简版本' },
        // {
        //   base: '/',
        //   link: 'components/introduction',
        //   text: '组件文档',
        // },
      ]
    }
    // {
    //   text: '基础',
    //   items: [
    //     { link: 'essentials/concept', text: '基础概念' },
    //     { link: 'essentials/development', text: '本地开发' },
    //     { link: 'essentials/route', text: '路由和菜单' },
    //     { link: 'essentials/settings', text: '配置' },
    //     { link: 'essentials/icons', text: '图标' },
    //     { link: 'essentials/styles', text: '样式' },
    //     { link: 'essentials/external-module', text: '外部模块' },
    //     { link: 'essentials/build', text: '构建与部署' },
    //     { link: 'essentials/server', text: '服务端交互与数据Mock' },
    //   ],
    // },
    // {
    //   text: '深入',
    //   items: [
    //     { link: 'in-depth/login', text: '登录' },
    //     // { link: 'in-depth/layout', text: '布局' },
    //     { link: 'in-depth/theme', text: '主题' },
    //     { link: 'in-depth/access', text: '权限' },
    //     { link: 'in-depth/locale', text: '国际化' },
    //     { link: 'in-depth/features', text: '常用功能' },
    //     { link: 'in-depth/check-updates', text: '检查更新' },
    //     { link: 'in-depth/loading', text: '全局loading' },
    //     { link: 'in-depth/ui-framework', text: '组件库切换' },
    //   ],
    // },
    // {
    //   text: '工程',
    //   items: [
    //     { link: 'project/standard', text: '规范' },
    //     { link: 'project/cli', text: 'CLI' },
    //     { link: 'project/dir', text: '目录说明' },
    //     { link: 'project/test', text: '单元测试' },
    //     { link: 'project/tailwindcss', text: 'Tailwind CSS' },
    //     { link: 'project/changeset', text: 'Changeset' },
    //     { link: 'project/vite', text: 'Vite Config' },
    //   ],
    // },
    // {
    //   text: '其他',
    //   items: [
    //     { link: 'other/project-update', text: '项目更新' },
    //     { link: 'other/remove-code', text: '移除代码' },
    //     { link: 'other/faq', text: '常见问题' },
    //   ],
    // },
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
    logo: "https://img0.baidu.com/it/u=3666118719,1618638927&fm=253&fmt=auto&app=138&f=PNG",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcvaW5kZXgubXRzIiwgIi52aXRlcHJlc3MvY29uZmlnL2VuLm10cyIsICIuLi9wYWNrYWdlLmpzb24iLCAiLnZpdGVwcmVzcy9jb25maWcvc2hhcmVkLm10cyIsICIudml0ZXByZXNzL2NvbmZpZy9wbHVnaW5zL2RlbW8tcHJldmlldy50cyIsICIudml0ZXByZXNzL2NvbmZpZy96aC5tdHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxcdTZENDFcdTkxQ0ZcdTVGNTVcdTUyMzZcdTU0OENcdTU2REVcdTY1M0VcXFxcb3Ntby12dWUzXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxjb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFx1NkQ0MVx1OTFDRlx1NUY1NVx1NTIzNlx1NTQ4Q1x1NTZERVx1NjUzRVxcXFxvc21vLXZ1ZTNcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFxpbmRleC5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6LyVFNiVCNSU4MSVFOSU4NyU4RiVFNSVCRCU5NSVFNSU4OCVCNiVFNSU5MiU4QyVFNSU5QiU5RSVFNiU5NCVCRS9vc21vLXZ1ZTMvZG9jcy8udml0ZXByZXNzL2NvbmZpZy9pbmRleC5tdHNcIjtpbXBvcnQgeyB3aXRoUHdhIH0gZnJvbSAnQHZpdGUtcHdhL3ZpdGVwcmVzcyc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWdXaXRoVGhlbWUgfSBmcm9tICd2aXRlcHJlc3MnO1xuXG5pbXBvcnQgeyBlbiB9IGZyb20gJy4vZW4ubXRzJztcbmltcG9ydCB7IHNoYXJlZCB9IGZyb20gJy4vc2hhcmVkLm10cyc7XG5pbXBvcnQgeyB6aCB9IGZyb20gJy4vemgubXRzJztcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFB3YShcbiAgZGVmaW5lQ29uZmlnV2l0aFRoZW1lKHtcbiAgICAuLi5zaGFyZWQsXG4gICAgbG9jYWxlczoge1xuICAgICAgZW46IHtcbiAgICAgICAgbGFiZWw6ICdFbmdsaXNoJyxcbiAgICAgICAgbGFuZzogJ2VuJyxcbiAgICAgICAgbGluazogJy9lbi8nLFxuICAgICAgICAuLi5lbixcbiAgICAgIH0sXG4gICAgICByb290OiB7XG4gICAgICAgIGxhYmVsOiAnXHU3QjgwXHU0RjUzXHU0RTJEXHU2NTg3JyxcbiAgICAgICAgbGFuZzogJ3poLUNOJyxcbiAgICAgICAgLi4uemgsXG4gICAgICB9LFxuICAgIH0sXG4gIH0pLFxuKTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcXHU2RDQxXHU5MUNGXHU1RjU1XHU1MjM2XHU1NDhDXHU1NkRFXHU2NTNFXFxcXG9zbW8tdnVlM1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxcdTZENDFcdTkxQ0ZcdTVGNTVcdTUyMzZcdTU0OENcdTU2REVcdTY1M0VcXFxcb3Ntby12dWUzXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxjb25maWdcXFxcZW4ubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi8lRTYlQjUlODElRTklODclOEYlRTUlQkQlOTUlRTUlODglQjYlRTUlOTIlOEMlRTUlOUIlOUUlRTYlOTQlQkUvb3Ntby12dWUzL2RvY3MvLnZpdGVwcmVzcy9jb25maWcvZW4ubXRzXCI7aW1wb3J0IHR5cGUgeyBEZWZhdWx0VGhlbWUgfSBmcm9tICd2aXRlcHJlc3MnO1xuXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlcHJlc3MnO1xuXG5pbXBvcnQgeyB2ZXJzaW9uIH0gZnJvbSAnLi4vLi4vLi4vcGFja2FnZS5qc29uJztcblxuZXhwb3J0IGNvbnN0IGVuID0gZGVmaW5lQ29uZmlnKHtcbiAgZGVzY3JpcHRpb246ICdPc21vICYgRW50ZXJwcmlzZSBsZXZlbCBtYW5hZ2VtZW50IHN5c3RlbSBmcmFtZXdvcmsnLFxuICBsYW5nOiAnZW4tVVMnLFxuICB0aGVtZUNvbmZpZzoge1xuICAgIGRhcmtNb2RlU3dpdGNoTGFiZWw6ICdUaGVtZScsXG4gICAgZGFya01vZGVTd2l0Y2hUaXRsZTogJ1N3aXRjaCB0byBEYXJrIE1vZGUnLFxuICAgIGRvY0Zvb3Rlcjoge1xuICAgICAgbmV4dDogJ05leHQgUGFnZScsXG4gICAgICBwcmV2OiAnUHJldmlvdXMgUGFnZScsXG4gICAgfSxcbiAgICBlZGl0TGluazoge1xuICAgICAgcGF0dGVybjpcbiAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS92YmVuanMvdnVlLXZiZW4tYWRtaW4vZWRpdC9tYWluL2RvY3Mvc3JjLzpwYXRoJyxcbiAgICAgIHRleHQ6ICdFZGl0IHRoaXMgcGFnZSBvbiBHaXRIdWInLFxuICAgIH0sXG4gICAgZm9vdGVyOiB7XG4gICAgICBjb3B5cmlnaHQ6IGBDb3B5cmlnaHQgXHUwMEE5IDIwMjAtJHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9IFZiZW5gLFxuICAgICAgbWVzc2FnZTogJ1JlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4nLFxuICAgIH0sXG4gICAgbGFuZ01lbnVMYWJlbDogJ0xhbmd1YWdlJyxcbiAgICBsYXN0VXBkYXRlZDoge1xuICAgICAgZm9ybWF0T3B0aW9uczoge1xuICAgICAgICBkYXRlU3R5bGU6ICdzaG9ydCcsXG4gICAgICAgIHRpbWVTdHlsZTogJ21lZGl1bScsXG4gICAgICB9LFxuICAgICAgdGV4dDogJ0xhc3QgdXBkYXRlZCBvbicsXG4gICAgfSxcbiAgICBsaWdodE1vZGVTd2l0Y2hUaXRsZTogJ1N3aXRjaCB0byBMaWdodCBNb2RlJyxcbiAgICBuYXY6IG5hdigpLFxuICAgIG91dGxpbmU6IHtcbiAgICAgIGxhYmVsOiAnTmF2aWdhdGUnLFxuICAgIH0sXG4gICAgcmV0dXJuVG9Ub3BMYWJlbDogJ0JhY2sgdG8gdG9wJyxcbiAgICBzaWRlYmFyOiB7XG4gICAgICAnL2VuL2NvbW1lcmNpYWwvJzoge1xuICAgICAgICBiYXNlOiAnL2VuL2NvbW1lcmNpYWwvJyxcbiAgICAgICAgaXRlbXM6IHNpZGViYXJDb21tZXJjaWFsKCksXG4gICAgICB9LFxuICAgICAgJy9lbi9ndWlkZS8nOiB7IGJhc2U6ICcvZW4vZ3VpZGUvJywgaXRlbXM6IHNpZGViYXJHdWlkZSgpIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuXG5mdW5jdGlvbiBzaWRlYmFyR3VpZGUoKTogRGVmYXVsdFRoZW1lLlNpZGViYXJJdGVtW10ge1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICB0ZXh0OiAnSW50cm9kdWN0aW9uJyxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnaW50cm9kdWN0aW9uL3ZiZW4nLFxuICAgICAgICAgIHRleHQ6ICdBYm91dCBPc21vJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICdpbnRyb2R1Y3Rpb24vd2h5JyxcbiAgICAgICAgICB0ZXh0OiAnV2h5IENob29zZSBVcz8nLFxuICAgICAgICB9LFxuICAgICAgICB7IGxpbms6ICdpbnRyb2R1Y3Rpb24vcXVpY2stc3RhcnQnLCB0ZXh0OiAnUXVpY2sgU3RhcnQnIH0sXG4gICAgICAgIHsgbGluazogJ2ludHJvZHVjdGlvbi90aGluJywgdGV4dDogJ0xpdGUgVmVyc2lvbicgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnQmFzaWNzJyxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHsgbGluazogJ2Vzc2VudGlhbHMvY29uY2VwdCcsIHRleHQ6ICdCYXNpYyBDb25jZXB0cycgfSxcbiAgICAgICAgeyBsaW5rOiAnZXNzZW50aWFscy9kZXZlbG9wbWVudCcsIHRleHQ6ICdMb2NhbCBEZXZlbG9wbWVudCcgfSxcbiAgICAgICAgeyBsaW5rOiAnZXNzZW50aWFscy9yb3V0ZScsIHRleHQ6ICdSb3V0aW5nIGFuZCBNZW51JyB9LFxuICAgICAgICB7IGxpbms6ICdlc3NlbnRpYWxzL3NldHRpbmdzJywgdGV4dDogJ0NvbmZpZ3VyYXRpb24nIH0sXG4gICAgICAgIHsgbGluazogJ2Vzc2VudGlhbHMvaWNvbnMnLCB0ZXh0OiAnSWNvbnMnIH0sXG4gICAgICAgIHsgbGluazogJ2Vzc2VudGlhbHMvc3R5bGVzJywgdGV4dDogJ1N0eWxlcycgfSxcbiAgICAgICAgeyBsaW5rOiAnZXNzZW50aWFscy9leHRlcm5hbC1tb2R1bGUnLCB0ZXh0OiAnRXh0ZXJuYWwgTW9kdWxlcycgfSxcbiAgICAgICAgeyBsaW5rOiAnZXNzZW50aWFscy9idWlsZCcsIHRleHQ6ICdCdWlsZCBhbmQgRGVwbG95bWVudCcgfSxcbiAgICAgICAgeyBsaW5rOiAnZXNzZW50aWFscy9zZXJ2ZXInLCB0ZXh0OiAnU2VydmVyIEludGVyYWN0aW9uIGFuZCBEYXRhIE1vY2snIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ0FkdmFuY2VkJyxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHsgbGluazogJ2luLWRlcHRoL2xvZ2luJywgdGV4dDogJ0xvZ2luJyB9LFxuICAgICAgICB7IGxpbms6ICdpbi1kZXB0aC90aGVtZScsIHRleHQ6ICdUaGVtZScgfSxcbiAgICAgICAgeyBsaW5rOiAnaW4tZGVwdGgvYWNjZXNzJywgdGV4dDogJ0FjY2VzcyBDb250cm9sJyB9LFxuICAgICAgICB7IGxpbms6ICdpbi1kZXB0aC9sb2NhbGUnLCB0ZXh0OiAnSW50ZXJuYXRpb25hbGl6YXRpb24nIH0sXG4gICAgICAgIHsgbGluazogJ2luLWRlcHRoL2ZlYXR1cmVzJywgdGV4dDogJ0NvbW1vbiBGZWF0dXJlcycgfSxcbiAgICAgICAgeyBsaW5rOiAnaW4tZGVwdGgvY2hlY2stdXBkYXRlcycsIHRleHQ6ICdDaGVjayBVcGRhdGVzJyB9LFxuICAgICAgICB7IGxpbms6ICdpbi1kZXB0aC9sb2FkaW5nJywgdGV4dDogJ0dsb2JhbCBMb2FkaW5nJyB9LFxuICAgICAgICB7IGxpbms6ICdpbi1kZXB0aC91aS1mcmFtZXdvcmsnLCB0ZXh0OiAnVUkgRnJhbWV3b3JrIFN3aXRjaGluZycgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnRW5naW5lZXJpbmcnLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAgeyBsaW5rOiAncHJvamVjdC9zdGFuZGFyZCcsIHRleHQ6ICdTdGFuZGFyZHMnIH0sXG4gICAgICAgIHsgbGluazogJ3Byb2plY3QvY2xpJywgdGV4dDogJ0NMSScgfSxcbiAgICAgICAgeyBsaW5rOiAncHJvamVjdC9kaXInLCB0ZXh0OiAnRGlyZWN0b3J5IEV4cGxhbmF0aW9uJyB9LFxuICAgICAgICB7IGxpbms6ICdwcm9qZWN0L3Rlc3QnLCB0ZXh0OiAnVW5pdCBUZXN0aW5nJyB9LFxuICAgICAgICB7IGxpbms6ICdwcm9qZWN0L3RhaWx3aW5kY3NzJywgdGV4dDogJ1RhaWx3aW5kIENTUycgfSxcbiAgICAgICAgeyBsaW5rOiAncHJvamVjdC9jaGFuZ2VzZXQnLCB0ZXh0OiAnQ2hhbmdlc2V0JyB9LFxuICAgICAgICB7IGxpbms6ICdwcm9qZWN0L3ZpdGUnLCB0ZXh0OiAnVml0ZSBDb25maWcnIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ090aGVycycsXG4gICAgICBpdGVtczogW1xuICAgICAgICB7IGxpbms6ICdvdGhlci9wcm9qZWN0LXVwZGF0ZScsIHRleHQ6ICdQcm9qZWN0IFVwZGF0ZScgfSxcbiAgICAgICAgeyBsaW5rOiAnb3RoZXIvcmVtb3ZlLWNvZGUnLCB0ZXh0OiAnUmVtb3ZlIENvZGUnIH0sXG4gICAgICAgIHsgbGluazogJ290aGVyL2ZhcScsIHRleHQ6ICdGQVEnIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIF07XG59XG5cbmZ1bmN0aW9uIHNpZGViYXJDb21tZXJjaWFsKCk6IERlZmF1bHRUaGVtZS5TaWRlYmFySXRlbVtdIHtcbiAgcmV0dXJuIFtcbiAgICB7XG4gICAgICBsaW5rOiAnY29tbXVuaXR5JyxcbiAgICAgIHRleHQ6ICdDb21tdW5pdHknLFxuICAgIH0sXG4gICAge1xuICAgICAgbGluazogJ3RlY2huaWNhbC1zdXBwb3J0JyxcbiAgICAgIHRleHQ6ICdUZWNobmljYWwtc3VwcG9ydCcsXG4gICAgfSxcbiAgICB7XG4gICAgICBsaW5rOiAnY3VzdG9taXplZCcsXG4gICAgICB0ZXh0OiAnQ3VzdG9taXplZCcsXG4gICAgfSxcbiAgXTtcbn1cblxuZnVuY3Rpb24gbmF2KCk6IERlZmF1bHRUaGVtZS5OYXZJdGVtW10ge1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIGFjdGl2ZU1hdGNoOiAnXi9lbi8oZ3VpZGV8Y29tcG9uZW50cykvJyxcbiAgICAgIHRleHQ6ICdEb2MnLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGFjdGl2ZU1hdGNoOiAnXi9lbi9ndWlkZS8nLFxuICAgICAgICAgIGxpbms6ICcvZW4vZ3VpZGUvaW50cm9kdWN0aW9uL3ZiZW4nLFxuICAgICAgICAgIHRleHQ6ICdHdWlkZScsXG4gICAgICAgIH0sXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICBhY3RpdmVNYXRjaDogJ14vZW4vY29tcG9uZW50cy8nLFxuICAgICAgICAvLyAgIGxpbms6ICcvZW4vY29tcG9uZW50cy9pbnRyb2R1Y3Rpb24nLFxuICAgICAgICAvLyAgIHRleHQ6ICdDb21wb25lbnRzJyxcbiAgICAgICAgLy8gfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdIaXN0b3JpY2FsIFZlcnNpb25zJyxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsaW5rOiAnaHR0cHM6Ly9kb2MudnZiaW4uY24nLFxuICAgICAgICAgICAgICB0ZXh0OiAnMi54IFZlcnNpb24gRG9jdW1lbnRhdGlvbicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ0RlbW8nLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdPc21vJyxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsaW5rOiAnaHR0cHM6Ly93d3cudmJlbi5wcm8nLFxuICAgICAgICAgICAgICB0ZXh0OiAnRGVtbyBWZXJzaW9uJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxpbms6ICdodHRwczovL2FudC52YmVuLnBybycsXG4gICAgICAgICAgICAgIHRleHQ6ICdBbnQgRGVzaWduIFZ1ZSBWZXJzaW9uJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxpbms6ICdodHRwczovL25haXZlLnZiZW4ucHJvJyxcbiAgICAgICAgICAgICAgdGV4dDogJ05haXZlIFZlcnNpb24nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGluazogJ2h0dHBzOi8vZWxlLnZiZW4ucHJvJyxcbiAgICAgICAgICAgICAgdGV4dDogJ0VsZW1lbnQgUGx1cyBWZXJzaW9uJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdPdGhlcnMnLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxpbms6ICdodHRwczovL3ZiZW4udnZiaW4uY24nLFxuICAgICAgICAgICAgICB0ZXh0OiAnT3NtbyAyLngnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6IHZlcnNpb24sXG4gICAgICBpdGVtczogW1xuICAgICAgICB7XG4gICAgICAgICAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS92YmVuanMvdnVlLXZiZW4tYWRtaW4vcmVsZWFzZXMnLFxuICAgICAgICAgIHRleHQ6ICdDaGFuZ2Vsb2cnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS9vcmdzL3ZiZW5qcy9wcm9qZWN0cy81JyxcbiAgICAgICAgICB0ZXh0OiAnUm9hZG1hcCcsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL3ZiZW5qcy92dWUtdmJlbi1hZG1pbi9ibG9iL21haW4vLmdpdGh1Yi9jb250cmlidXRpbmcubWQnLFxuICAgICAgICAgIHRleHQ6ICdDb250cmlidXRpb24nLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxpbms6ICcvY29tbWVyY2lhbC90ZWNobmljYWwtc3VwcG9ydCcsXG4gICAgICB0ZXh0OiAnXHVEODNFXHVERDg0IFRlY2ggU3VwcG9ydCcsXG4gICAgfSxcbiAgICB7XG4gICAgICBsaW5rOiAnL3Nwb25zb3IvcGVyc29uYWwnLFxuICAgICAgdGV4dDogJ1x1MjcyOCBTcG9uc29yJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxpbms6ICcvY29tbWVyY2lhbC9jb21tdW5pdHknLFxuICAgICAgdGV4dDogJ1x1RDgzRFx1REM2OFx1MjAwRFx1RDgzRFx1REM2Nlx1MjAwRFx1RDgzRFx1REM2NiBDb21tdW5pdHknLFxuICAgIH0sXG4gICAgLy8ge1xuICAgIC8vICAgbGluazogJy9mcmllbmQtbGlua3MvJyxcbiAgICAvLyAgIHRleHQ6ICdcdUQ4M0VcdUREMUQgRnJpZW5kIExpbmtzJyxcbiAgICAvLyB9LFxuICBdO1xufVxuIiwgIntcbiAgXCJuYW1lXCI6IFwidmJlbi1hZG1pbi1tb25vcmVwb1wiLFxuICBcInZlcnNpb25cIjogXCI1LjUuN1wiLFxuICBcInByaXZhdGVcIjogdHJ1ZSxcbiAgXCJrZXl3b3Jkc1wiOiBbXG4gICAgXCJtb25vcmVwb1wiLFxuICAgIFwidHVyYm9cIixcbiAgICBcInZiZW5cIixcbiAgICBcInZiZW4gYWRtaW5cIixcbiAgICBcInZiZW4gcHJvXCIsXG4gICAgXCJ2dWVcIixcbiAgICBcInZ1ZSBhZG1pblwiLFxuICAgIFwidnVlIHZiZW4gYWRtaW5cIixcbiAgICBcInZ1ZSB2YmVuIGFkbWluIHByb1wiLFxuICAgIFwidnVlM1wiXG4gIF0sXG4gIFwiaG9tZXBhZ2VcIjogXCJodHRwczovL2dpdGh1Yi5jb20vdmJlbmpzL3Z1ZS12YmVuLWFkbWluXCIsXG4gIFwiYnVnc1wiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS92YmVuanMvdnVlLXZiZW4tYWRtaW4vaXNzdWVzXCIsXG4gIFwicmVwb3NpdG9yeVwiOiBcInZiZW5qcy92dWUtdmJlbi1hZG1pbi5naXRcIixcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gIFwiYXV0aG9yXCI6IHtcbiAgICBcIm5hbWVcIjogXCJ2YmVuXCIsXG4gICAgXCJlbWFpbFwiOiBcImFubi52YmVuQGdtYWlsLmNvbVwiLFxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2FubmN3YlwiXG4gIH0sXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiYnVpbGRcIjogXCJjcm9zcy1lbnYgTk9ERV9PUFRJT05TPS0tbWF4LW9sZC1zcGFjZS1zaXplPTgxOTIgdHVyYm8gYnVpbGRcIixcbiAgICBcImJ1aWxkOmFuYWx5emVcIjogXCJ0dXJibyBidWlsZDphbmFseXplXCIsXG4gICAgXCJidWlsZDphbnRkXCI6IFwicG5wbSBydW4gYnVpbGQgLS1maWx0ZXI9QHZiZW4vd2ViLWFudGRcIixcbiAgICBcImJ1aWxkOmRvY2tlclwiOiBcIi4vc2NyaXB0cy9kZXBsb3kvYnVpbGQtbG9jYWwtZG9ja2VyLWltYWdlLnNoXCIsXG4gICAgXCJidWlsZDpkb2NzXCI6IFwicG5wbSBydW4gYnVpbGQgLS1maWx0ZXI9QHZiZW4vZG9jc1wiLFxuICAgIFwiYnVpbGQ6b3Ntb1wiOiBcInBucG0gcnVuIGJ1aWxkIC0tZmlsdGVyPW9zbW9cIixcbiAgICBcImJ1aWxkOm5haXZlXCI6IFwicG5wbSBydW4gYnVpbGQgLS1maWx0ZXI9QHZiZW4vd2ViLW5haXZlXCIsXG4gICAgXCJidWlsZDpwbGF5XCI6IFwicG5wbSBydW4gYnVpbGQgLS1maWx0ZXI9QHZiZW4vcGxheWdyb3VuZFwiLFxuICAgIFwiY2hhbmdlc2V0XCI6IFwicG5wbSBleGVjIGNoYW5nZXNldFwiLFxuICAgIFwiY2hlY2tcIjogXCJwbnBtIHJ1biBjaGVjazpjaXJjdWxhciAmJiBwbnBtIHJ1biBjaGVjazpkZXAgJiYgcG5wbSBydW4gY2hlY2s6dHlwZSAmJiBwbnBtIGNoZWNrOmNzcGVsbFwiLFxuICAgIFwiY2hlY2s6Y2lyY3VsYXJcIjogXCJ2c2ggY2hlY2stY2lyY3VsYXJcIixcbiAgICBcImNoZWNrOmNzcGVsbFwiOiBcImNzcGVsbCBsaW50ICoqLyoudHMgKiovUkVBRE1FLm1kIC5jaGFuZ2VzZXQvKi5tZCAtLW5vLXByb2dyZXNzXCIsXG4gICAgXCJjaGVjazpkZXBcIjogXCJ2c2ggY2hlY2stZGVwXCIsXG4gICAgXCJjaGVjazp0eXBlXCI6IFwidHVyYm8gcnVuIHR5cGVjaGVja1wiLFxuICAgIFwiY2xlYW5cIjogXCJub2RlIC4vc2NyaXB0cy9jbGVhbi5tanNcIixcbiAgICBcImNvbW1pdFwiOiBcImN6Z1wiLFxuICAgIFwiZGV2XCI6IFwidHVyYm8tcnVuIGRldlwiLFxuICAgIFwiZGV2OmFudGRcIjogXCJwbnBtIC1GIEB2YmVuL3dlYi1hbnRkIHJ1biBkZXZcIixcbiAgICBcImRldjpkb2NzXCI6IFwicG5wbSAtRiBAdmJlbi9kb2NzIHJ1biBkZXZcIixcbiAgICBcImRldjpvc21vXCI6IFwicG5wbSAtRiBvc21vIHJ1biBkZXZcIixcbiAgICBcImRldjpuYWl2ZVwiOiBcInBucG0gLUYgQHZiZW4vd2ViLW5haXZlIHJ1biBkZXZcIixcbiAgICBcImRldjpwbGF5XCI6IFwicG5wbSAtRiBAdmJlbi9wbGF5Z3JvdW5kIHJ1biBkZXZcIixcbiAgICBcImZvcm1hdFwiOiBcInZzaCBsaW50IC0tZm9ybWF0XCIsXG4gICAgXCJsaW50XCI6IFwidnNoIGxpbnRcIixcbiAgICBcInBvc3RpbnN0YWxsXCI6IFwicG5wbSAtciBydW4gc3R1YiAtLWlmLXByZXNlbnRcIixcbiAgICBcInByZWluc3RhbGxcIjogXCJucHggb25seS1hbGxvdyBwbnBtXCIsXG4gICAgXCJwcmV2aWV3XCI6IFwidHVyYm8tcnVuIHByZXZpZXdcIixcbiAgICBcInB1YmxpbnRcIjogXCJ2c2ggcHVibGludFwiLFxuICAgIFwicmVpbnN0YWxsXCI6IFwicG5wbSBjbGVhbiAtLWRlbC1sb2NrICYmIHBucG0gaW5zdGFsbFwiLFxuICAgIFwidGVzdDp1bml0XCI6IFwidml0ZXN0IHJ1biAtLWRvbVwiLFxuICAgIFwidGVzdDplMmVcIjogXCJ0dXJibyBydW4gdGVzdDplMmVcIixcbiAgICBcInVwZGF0ZTpkZXBzXCI6IFwibnB4IHRhemUgLXIgLXdcIixcbiAgICBcInZlcnNpb25cIjogXCJwbnBtIGV4ZWMgY2hhbmdlc2V0IHZlcnNpb24gJiYgcG5wbSBpbnN0YWxsIC0tbm8tZnJvemVuLWxvY2tmaWxlXCIsXG4gICAgXCJjYXRhbG9nXCI6IFwicG5weCBjb2RlbW9kIHBucG0vY2F0YWxvZ1wiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBjaGFuZ2VzZXRzL2NoYW5nZWxvZy1naXRodWJcIjogXCJjYXRhbG9nOlwiLFxuICAgIFwiQGNoYW5nZXNldHMvY2xpXCI6IFwiY2F0YWxvZzpcIixcbiAgICBcIkBwbGF5d3JpZ2h0L3Rlc3RcIjogXCJjYXRhbG9nOlwiLFxuICAgIFwiQHR5cGVzL25vZGVcIjogXCJjYXRhbG9nOlwiLFxuICAgIFwiQHZiZW4vY29tbWl0bGludC1jb25maWdcIjogXCJ3b3Jrc3BhY2U6KlwiLFxuICAgIFwiQHZiZW4vZXNsaW50LWNvbmZpZ1wiOiBcIndvcmtzcGFjZToqXCIsXG4gICAgXCJAdmJlbi9wcmV0dGllci1jb25maWdcIjogXCJ3b3Jrc3BhY2U6KlwiLFxuICAgIFwiQHZiZW4vc3R5bGVsaW50LWNvbmZpZ1wiOiBcIndvcmtzcGFjZToqXCIsXG4gICAgXCJAdmJlbi90YWlsd2luZC1jb25maWdcIjogXCJ3b3Jrc3BhY2U6KlwiLFxuICAgIFwiQHZiZW4vdHNjb25maWdcIjogXCJ3b3Jrc3BhY2U6KlwiLFxuICAgIFwiQHZiZW4vdHVyYm8tcnVuXCI6IFwid29ya3NwYWNlOipcIixcbiAgICBcIkB2YmVuL3ZpdGUtY29uZmlnXCI6IFwid29ya3NwYWNlOipcIixcbiAgICBcIkB2YmVuL3ZzaFwiOiBcIndvcmtzcGFjZToqXCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWVcIjogXCJjYXRhbG9nOlwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlLWpzeFwiOiBcImNhdGFsb2c6XCIsXG4gICAgXCJAdnVlL3Rlc3QtdXRpbHNcIjogXCJjYXRhbG9nOlwiLFxuICAgIFwiYXV0b3ByZWZpeGVyXCI6IFwiY2F0YWxvZzpcIixcbiAgICBcImNyb3NzLWVudlwiOiBcImNhdGFsb2c6XCIsXG4gICAgXCJjc3BlbGxcIjogXCJjYXRhbG9nOlwiLFxuICAgIFwiaGFwcHktZG9tXCI6IFwiY2F0YWxvZzpcIixcbiAgICBcImlzLWNpXCI6IFwiY2F0YWxvZzpcIixcbiAgICBcImxlZnRob29rXCI6IFwiY2F0YWxvZzpcIixcbiAgICBcInBsYXl3cmlnaHRcIjogXCJjYXRhbG9nOlwiLFxuICAgIFwicmltcmFmXCI6IFwiY2F0YWxvZzpcIixcbiAgICBcInRhaWx3aW5kY3NzXCI6IFwiY2F0YWxvZzpcIixcbiAgICBcInR1cmJvXCI6IFwiY2F0YWxvZzpcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCJjYXRhbG9nOlwiLFxuICAgIFwidW5idWlsZFwiOiBcImNhdGFsb2c6XCIsXG4gICAgXCJ2aXRlXCI6IFwiY2F0YWxvZzpcIixcbiAgICBcInZpdGVzdFwiOiBcImNhdGFsb2c6XCIsXG4gICAgXCJ2dWVcIjogXCJjYXRhbG9nOlwiLFxuICAgIFwidnVlLXRzY1wiOiBcImNhdGFsb2c6XCJcbiAgfSxcbiAgXCJlbmdpbmVzXCI6IHtcbiAgICBcIm5vZGVcIjogXCI+PTIwLjEwLjBcIixcbiAgICBcInBucG1cIjogXCI+PTkuMTIuMFwiXG4gIH0sXG4gIFwicGFja2FnZU1hbmFnZXJcIjogXCJwbnBtQDEwLjEyLjRcIixcbiAgXCJwbnBtXCI6IHtcbiAgICBcInBlZXJEZXBlbmRlbmN5UnVsZXNcIjoge1xuICAgICAgXCJhbGxvd2VkVmVyc2lvbnNcIjoge1xuICAgICAgICBcImVzbGludFwiOiBcIipcIlxuICAgICAgfVxuICAgIH0sXG4gICAgXCJvdmVycmlkZXNcIjoge1xuICAgICAgXCJAYXN0LWdyZXAvbmFwaVwiOiBcImNhdGFsb2c6XCIsXG4gICAgICBcIkBjdHJsL3Rpbnljb2xvclwiOiBcImNhdGFsb2c6XCIsXG4gICAgICBcImNsc3hcIjogXCJjYXRhbG9nOlwiLFxuICAgICAgXCJlc2J1aWxkXCI6IFwiMC4yNS4zXCIsXG4gICAgICBcInBpbmlhXCI6IFwiY2F0YWxvZzpcIixcbiAgICAgIFwidnVlXCI6IFwiY2F0YWxvZzpcIlxuICAgIH0sXG4gICAgXCJuZXZlckJ1aWx0RGVwZW5kZW5jaWVzXCI6IFtcbiAgICAgIFwiY2FudmFzXCIsXG4gICAgICBcIm5vZGUtZ3lwXCJcbiAgICBdXG4gIH1cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcXHU2RDQxXHU5MUNGXHU1RjU1XHU1MjM2XHU1NDhDXHU1NkRFXHU2NTNFXFxcXG9zbW8tdnVlM1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxcdTZENDFcdTkxQ0ZcdTVGNTVcdTUyMzZcdTU0OENcdTU2REVcdTY1M0VcXFxcb3Ntby12dWUzXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxjb25maWdcXFxcc2hhcmVkLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovJUU2JUI1JTgxJUU5JTg3JThGJUU1JUJEJTk1JUU1JTg4JUI2JUU1JTkyJThDJUU1JTlCJTlFJUU2JTk0JUJFL29zbW8tdnVlMy9kb2NzLy52aXRlcHJlc3MvY29uZmlnL3NoYXJlZC5tdHNcIjtpbXBvcnQgdHlwZSB7IFB3YU9wdGlvbnMgfSBmcm9tICdAdml0ZS1wd2Evdml0ZXByZXNzJztcbmltcG9ydCB0eXBlIHsgSGVhZENvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcyc7XG5cbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdub2RlOnBhdGgnO1xuXG5pbXBvcnQge1xuICB2aXRlQXJjaGl2ZXJQbHVnaW4sXG4gIHZpdGVWeGVUYWJsZUltcG9ydHNQbHVnaW4sXG59IGZyb20gJ0B2YmVuL3ZpdGUtY29uZmlnJztcblxuaW1wb3J0IHtcbiAgR2l0Q2hhbmdlbG9nLFxuICBHaXRDaGFuZ2Vsb2dNYXJrZG93blNlY3Rpb24sXG59IGZyb20gJ0Bub2xlYmFzZS92aXRlcHJlc3MtcGx1Z2luLWdpdC1jaGFuZ2Vsb2cvdml0ZSc7XG5pbXBvcnQgdGFpbHdpbmQgZnJvbSAndGFpbHdpbmRjc3MnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBwb3N0Y3NzSXNvbGF0ZVN0eWxlcyB9IGZyb20gJ3ZpdGVwcmVzcyc7XG5pbXBvcnQge1xuICBncm91cEljb25NZFBsdWdpbixcbiAgZ3JvdXBJY29uVml0ZVBsdWdpbixcbn0gZnJvbSAndml0ZXByZXNzLXBsdWdpbi1ncm91cC1pY29ucyc7XG5cbmltcG9ydCB7IGRlbW9QcmV2aWV3UGx1Z2luIH0gZnJvbSAnLi9wbHVnaW5zL2RlbW8tcHJldmlldyc7XG5pbXBvcnQgeyBzZWFyY2ggYXMgemhTZWFyY2ggfSBmcm9tICcuL3poLm10cyc7XG5cbmV4cG9ydCBjb25zdCBzaGFyZWQgPSBkZWZpbmVDb25maWcoe1xuICBhcHBlYXJhbmNlOiAnZGFyaycsXG4gIGhlYWQ6IGhlYWQoKSxcbiAgbWFya2Rvd246IHtcbiAgICBwcmVDb25maWcobWQpIHtcbiAgICAgIG1kLnVzZShkZW1vUHJldmlld1BsdWdpbik7XG4gICAgICBtZC51c2UoZ3JvdXBJY29uTWRQbHVnaW4pO1xuICAgIH0sXG4gIH0sXG4gIHB3YTogcHdhKCksXG4gIHNyY0RpcjogJ3NyYycsXG4gIHRoZW1lQ29uZmlnOiB7XG4gICAgaTE4blJvdXRpbmc6IHRydWUsXG4gICAgbG9nbzogJ2h0dHBzOi8vaW1nMC5iYWlkdS5jb20vaXQvdT0zNjY2MTE4NzE5LDE2MTg2Mzg5MjcmZm09MjUzJmZtdD1hdXRvJmFwcD0xMzgmZj1QTkcnLFxuICAgIHNlYXJjaDoge1xuICAgICAgb3B0aW9uczoge1xuICAgICAgICBsb2NhbGVzOiB7XG4gICAgICAgICAgLi4uemhTZWFyY2gsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcHJvdmlkZXI6ICdsb2NhbCcsXG4gICAgfSxcbiAgICBzaXRlVGl0bGU6ICdPc21vJyxcbiAgICBzb2NpYWxMaW5rczogW1xuICAgICAgeyBpY29uOiAnZ2l0aHViJywgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS92YmVuanMvdnVlLXZiZW4tYWRtaW4nIH0sXG4gICAgXSxcbiAgfSxcbiAgdGl0bGU6ICdPc21vJyxcbiAgdml0ZToge1xuICAgIGJ1aWxkOiB7XG4gICAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IEluZmluaXR5LFxuICAgICAgbWluaWZ5OiAndGVyc2VyJyxcbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgcG9zdGNzczoge1xuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgdGFpbHdpbmQoKSxcbiAgICAgICAgICBwb3N0Y3NzSXNvbGF0ZVN0eWxlcyh7IGluY2x1ZGVGaWxlczogWy92cC1kb2NcXC5jc3MvXSB9KSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICBhcGk6ICdtb2Rlcm4nLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIGpzb246IHtcbiAgICAgIHN0cmluZ2lmeTogdHJ1ZSxcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIEdpdENoYW5nZWxvZyh7XG4gICAgICAgIG1hcEF1dGhvcnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtYXBCeU5hbWVBbGlhc2VzOiBbJ1ZiZW4nXSxcbiAgICAgICAgICAgIG5hbWU6ICd2YmVuJyxcbiAgICAgICAgICAgIHVzZXJuYW1lOiAnYW5uY3diJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICd2aW5jZScsXG4gICAgICAgICAgICB1c2VybmFtZTogJ3ZpbmNlMjkyMDA3JyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdMaSBLdWknLFxuICAgICAgICAgICAgdXNlcm5hbWU6ICdsaWt1aTYyOCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgcmVwb1VSTDogKCkgPT4gJ2h0dHBzOi8vZ2l0aHViLmNvbS92YmVuanMvdnVlLXZiZW4tYWRtaW4nLFxuICAgICAgfSksXG4gICAgICBHaXRDaGFuZ2Vsb2dNYXJrZG93blNlY3Rpb24oKSxcbiAgICAgIHZpdGVBcmNoaXZlclBsdWdpbih7IG91dHB1dERpcjogJy52aXRlcHJlc3MnIH0pLFxuICAgICAgZ3JvdXBJY29uVml0ZVBsdWdpbigpLFxuICAgICAgYXdhaXQgdml0ZVZ4ZVRhYmxlSW1wb3J0c1BsdWdpbigpLFxuICAgIF0sXG4gICAgc2VydmVyOiB7XG4gICAgICBmczoge1xuICAgICAgICBhbGxvdzogWycuLi8uLiddLFxuICAgICAgfSxcbiAgICAgIGhvc3Q6IHRydWUsXG4gICAgICBwb3J0OiA2MTczLFxuICAgIH0sXG5cbiAgICBzc3I6IHtcbiAgICAgIGV4dGVybmFsOiBbJ0B2dWUvcmVwbCddLFxuICAgIH0sXG4gIH0sXG59KTtcblxuZnVuY3Rpb24gaGVhZCgpOiBIZWFkQ29uZmlnW10ge1xuICByZXR1cm4gW1xuICAgIFsnbWV0YScsIHsgY29udGVudDogJ1ZiZW5qcyBUZWFtJywgbmFtZTogJ2F1dGhvcicgfV0sXG4gICAgW1xuICAgICAgJ21ldGEnLFxuICAgICAge1xuICAgICAgICBjb250ZW50OiAndmJlbiwgdml0ZWpzLCB2aXRlLCBzaGFjZG4tdWksIHZ1ZScsXG4gICAgICAgIG5hbWU6ICdrZXl3b3JkcycsXG4gICAgICB9LFxuICAgIF0sXG4gICAgWydsaW5rJywgeyBocmVmOiAnL2Zhdmljb24uaWNvJywgcmVsOiAnaWNvbicsIHR5cGU6ICdpbWFnZS9zdmcreG1sJyB9XSxcbiAgICBbXG4gICAgICAnbWV0YScsXG4gICAgICB7XG4gICAgICAgIGNvbnRlbnQ6XG4gICAgICAgICAgJ3dpZHRoPWRldmljZS13aWR0aCxpbml0aWFsLXNjYWxlPTEsbWluaW11bS1zY2FsZT0xLjAsbWF4aW11bS1zY2FsZT0xLjAsdXNlci1zY2FsYWJsZT1ubycsXG4gICAgICAgIG5hbWU6ICd2aWV3cG9ydCcsXG4gICAgICB9LFxuICAgIF0sXG4gICAgWydtZXRhJywgeyBjb250ZW50OiAndmJlbiBhZG1pbiBkb2NzJywgbmFtZTogJ2tleXdvcmRzJyB9XSxcbiAgICBbJ2xpbmsnLCB7IGhyZWY6ICcvZmF2aWNvbi5pY28nLCByZWw6ICdpY29uJyB9XSxcbiAgICAvLyBbXG4gICAgLy8gICAnc2NyaXB0JyxcbiAgICAvLyAgIHtcbiAgICAvLyAgICAgc3JjOiAnaHR0cHM6Ly9jZG4udGFpbHdpbmRjc3MuY29tJyxcbiAgICAvLyAgIH0sXG4gICAgLy8gXSxcbiAgXTtcbn1cblxuZnVuY3Rpb24gcHdhKCk6IFB3YU9wdGlvbnMge1xuICByZXR1cm4ge1xuICAgIGluY2x1ZGVNYW5pZmVzdEljb25zOiBmYWxzZSxcbiAgICBtYW5pZmVzdDoge1xuICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICdPc21vIGlzIGEgbW9kZXJuIGFkbWluIGRhc2hib2FyZCB0ZW1wbGF0ZSBiYXNlZCBvbiBWdWUgMy4gJyxcbiAgICAgIGljb25zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBzaXplczogJzE5MngxOTInLFxuICAgICAgICAgIHNyYzogJ2h0dHBzOi8vdW5wa2cuY29tL0B2YmVuanMvc3RhdGljLXNvdXJjZUAwLjEuNy9zb3VyY2UvcHdhLWljb24tMTkyLnBuZycsXG4gICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzaXplczogJzUxMng1MTInLFxuICAgICAgICAgIHNyYzogJ2h0dHBzOi8vdW5wa2cuY29tL0B2YmVuanMvc3RhdGljLXNvdXJjZUAwLjEuNy9zb3VyY2UvcHdhLWljb24tNTEyLnBuZycsXG4gICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgaWQ6ICcvJyxcbiAgICAgIG5hbWU6ICdPc21vIERvYycsXG4gICAgICBzaG9ydF9uYW1lOiAndmJlbl9hZG1pbl9kb2MnLFxuICAgICAgdGhlbWVfY29sb3I6ICcjZmZmZmZmJyxcbiAgICB9LFxuICAgIG91dERpcjogcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnLnZpdGVwcmVzcy9kaXN0JyksXG4gICAgcmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZScsXG4gICAgd29ya2JveDoge1xuICAgICAgZ2xvYlBhdHRlcm5zOiBbJyoqLyoue2NzcyxqcyxodG1sLHN2ZyxwbmcsaWNvLHR4dCx3b2ZmMn0nXSxcbiAgICAgIG1heGltdW1GaWxlU2l6ZVRvQ2FjaGVJbkJ5dGVzOiA1ICogMTAyNCAqIDEwMjQsXG4gICAgfSxcbiAgfTtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcXHU2RDQxXHU5MUNGXHU1RjU1XHU1MjM2XHU1NDhDXHU1NkRFXHU2NTNFXFxcXG9zbW8tdnVlM1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFx1NkQ0MVx1OTFDRlx1NUY1NVx1NTIzNlx1NTQ4Q1x1NTZERVx1NjUzRVxcXFxvc21vLXZ1ZTNcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFxwbHVnaW5zXFxcXGRlbW8tcHJldmlldy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovJUU2JUI1JTgxJUU5JTg3JThGJUU1JUJEJTk1JUU1JTg4JUI2JUU1JTkyJThDJUU1JTlCJTlFJUU2JTk0JUJFL29zbW8tdnVlMy9kb2NzLy52aXRlcHJlc3MvY29uZmlnL3BsdWdpbnMvZGVtby1wcmV2aWV3LnRzXCI7aW1wb3J0IHR5cGUgeyBNYXJrZG93bkVudiwgTWFya2Rvd25SZW5kZXJlciB9IGZyb20gJ3ZpdGVwcmVzcyc7XG5cbmltcG9ydCBjcnlwdG8gZnJvbSAnbm9kZTpjcnlwdG8nO1xuaW1wb3J0IHsgcmVhZGRpclN5bmMgfSBmcm9tICdub2RlOmZzJztcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdub2RlOnBhdGgnO1xuXG5leHBvcnQgY29uc3QgcmF3UGF0aFJlZ2V4cCA9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWdleHAvbm8tc3VwZXItbGluZWFyLWJhY2t0cmFja2luZywgcmVnZXhwL3N0cmljdFxuICAvXiguKz8oPzpcXC4oW1xcZGEtel0rKSk/KSgjW1xcdy1dKyk/KD86ID97KFxcZCsoPzpbLC1dXFxkKykqKT8gPyhcXFMrKT99KT8gPyg/OlxcWyguKyldKT8kLztcblxuZnVuY3Rpb24gcmF3UGF0aFRvVG9rZW4ocmF3UGF0aDogc3RyaW5nKSB7XG4gIGNvbnN0IFtcbiAgICBmaWxlcGF0aCA9ICcnLFxuICAgIGV4dGVuc2lvbiA9ICcnLFxuICAgIHJlZ2lvbiA9ICcnLFxuICAgIGxpbmVzID0gJycsXG4gICAgbGFuZyA9ICcnLFxuICAgIHJhd1RpdGxlID0gJycsXG4gIF0gPSAocmF3UGF0aFJlZ2V4cC5leGVjKHJhd1BhdGgpIHx8IFtdKS5zbGljZSgxKTtcblxuICBjb25zdCB0aXRsZSA9IHJhd1RpdGxlIHx8IGZpbGVwYXRoLnNwbGl0KCcvJykucG9wKCkgfHwgJyc7XG5cbiAgcmV0dXJuIHsgZXh0ZW5zaW9uLCBmaWxlcGF0aCwgbGFuZywgbGluZXMsIHJlZ2lvbiwgdGl0bGUgfTtcbn1cblxuZXhwb3J0IGNvbnN0IGRlbW9QcmV2aWV3UGx1Z2luID0gKG1kOiBNYXJrZG93blJlbmRlcmVyKSA9PiB7XG4gIG1kLmNvcmUucnVsZXIuYWZ0ZXIoJ2lubGluZScsICdkZW1vLXByZXZpZXcnLCAoc3RhdGUpID0+IHtcbiAgICBjb25zdCBpbnNlcnRDb21wb25lbnRJbXBvcnQgPSAoaW1wb3J0U3RyaW5nOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gc3RhdGUudG9rZW5zLmZpbmRJbmRleChcbiAgICAgICAgKGkpID0+IGkudHlwZSA9PT0gJ2h0bWxfYmxvY2snICYmIGkuY29udGVudC5tYXRjaCgvPHNjcmlwdCBzZXR1cD4vZyksXG4gICAgICApO1xuICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICBjb25zdCBpbXBvcnRDb21wb25lbnQgPSBuZXcgc3RhdGUuVG9rZW4oJ2h0bWxfYmxvY2snLCAnJywgMCk7XG4gICAgICAgIGltcG9ydENvbXBvbmVudC5jb250ZW50ID0gYDxzY3JpcHQgc2V0dXA+XFxuJHtpbXBvcnRTdHJpbmd9XFxuPC9zY3JpcHQ+XFxuYDtcbiAgICAgICAgc3RhdGUudG9rZW5zLnNwbGljZSgwLCAwLCBpbXBvcnRDb21wb25lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHN0YXRlLnRva2Vuc1tpbmRleF0pIHtcbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gc3RhdGUudG9rZW5zW2luZGV4XS5jb250ZW50O1xuICAgICAgICAgIHN0YXRlLnRva2Vuc1tpbmRleF0uY29udGVudCA9IGNvbnRlbnQucmVwbGFjZShcbiAgICAgICAgICAgICc8L3NjcmlwdD4nLFxuICAgICAgICAgICAgYCR7aW1wb3J0U3RyaW5nfVxcbjwvc2NyaXB0PmAsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgLy8gRGVmaW5lIHRoZSByZWd1bGFyIGV4cHJlc3Npb24gdG8gbWF0Y2ggdGhlIGRlc2lyZWQgcGF0dGVyblxuICAgIGNvbnN0IHJlZ2V4ID0gLzxEZW1vUHJldmlld1tePl0qXFxzZGlyPVwiKFteXCJdKilcIi9nO1xuICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCB0aGUgTWFya2Rvd24gY29udGVudCBhbmQgcmVwbGFjZSB0aGUgcGF0dGVyblxuICAgIHN0YXRlLnNyYyA9IHN0YXRlLnNyYy5yZXBsYWNlQWxsKHJlZ2V4LCAoX21hdGNoLCBkaXIpID0+IHtcbiAgICAgIGNvbnN0IGNvbXBvbmVudERpciA9IGpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3NyYycsIGRpcikucmVwbGFjZUFsbChcbiAgICAgICAgJ1xcXFwnLFxuICAgICAgICAnLycsXG4gICAgICApO1xuXG4gICAgICBsZXQgY2hpbGRGaWxlczogc3RyaW5nW10gPSBbXTtcbiAgICAgIGxldCBkaXJFeGlzdHMgPSB0cnVlO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjaGlsZEZpbGVzID1cbiAgICAgICAgICByZWFkZGlyU3luYyhjb21wb25lbnREaXIsIHtcbiAgICAgICAgICAgIGVuY29kaW5nOiAndXRmOCcsXG4gICAgICAgICAgICByZWN1cnNpdmU6IGZhbHNlLFxuICAgICAgICAgICAgd2l0aEZpbGVUeXBlczogZmFsc2UsXG4gICAgICAgICAgfSkgfHwgW107XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgZGlyRXhpc3RzID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmICghZGlyRXhpc3RzKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cblxuICAgICAgY29uc3QgdW5pcXVlV29yZCA9IGdlbmVyYXRlQ29udGVudEhhc2goY29tcG9uZW50RGlyKTtcblxuICAgICAgY29uc3QgQ29tcG9uZW50TmFtZSA9IGBEZW1vQ29tcG9uZW50XyR7dW5pcXVlV29yZH1gO1xuICAgICAgaW5zZXJ0Q29tcG9uZW50SW1wb3J0KFxuICAgICAgICBgaW1wb3J0ICR7Q29tcG9uZW50TmFtZX0gZnJvbSAnJHtjb21wb25lbnREaXJ9L2luZGV4LnZ1ZSdgLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHsgcGF0aDogX3BhdGggfSA9IHN0YXRlLmVudiBhcyBNYXJrZG93bkVudjtcblxuICAgICAgY29uc3QgaW5kZXggPSBzdGF0ZS50b2tlbnMuZmluZEluZGV4KChpKSA9PiBpLmNvbnRlbnQubWF0Y2gocmVnZXgpKTtcblxuICAgICAgaWYgKCFzdGF0ZS50b2tlbnNbaW5kZXhdKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICAgIGNvbnN0IGZpcnN0U3RyaW5nID0gJ2luZGV4LnZ1ZSc7XG4gICAgICBjaGlsZEZpbGVzID0gY2hpbGRGaWxlcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGlmIChhID09PSBmaXJzdFN0cmluZykgcmV0dXJuIC0xO1xuICAgICAgICBpZiAoYiA9PT0gZmlyc3RTdHJpbmcpIHJldHVybiAxO1xuICAgICAgICByZXR1cm4gYS5sb2NhbGVDb21wYXJlKGIsICdlbicsIHsgc2Vuc2l0aXZpdHk6ICdiYXNlJyB9KTtcbiAgICAgIH0pO1xuICAgICAgc3RhdGUudG9rZW5zW2luZGV4XS5jb250ZW50ID1cbiAgICAgICAgYDxEZW1vUHJldmlldyBmaWxlcz1cIiR7ZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNoaWxkRmlsZXMpKX1cIiA+PCR7Q29tcG9uZW50TmFtZX0vPlxuICAgICAgICBgO1xuXG4gICAgICBjb25zdCBfZHVtbXlUb2tlbiA9IG5ldyBzdGF0ZS5Ub2tlbignJywgJycsIDApO1xuICAgICAgY29uc3QgdG9rZW5BcnJheTogQXJyYXk8dHlwZW9mIF9kdW1teVRva2VuPiA9IFtdO1xuICAgICAgY2hpbGRGaWxlcy5mb3JFYWNoKChmaWxlbmFtZSkgPT4ge1xuICAgICAgICAvLyBjb25zdCBzbG90TmFtZSA9IGZpbGVuYW1lLnJlcGxhY2UoZXh0bmFtZShmaWxlbmFtZSksICcnKTtcblxuICAgICAgICBjb25zdCB0ZW1wbGF0ZVN0YXJ0ID0gbmV3IHN0YXRlLlRva2VuKCdodG1sX2lubGluZScsICcnLCAwKTtcbiAgICAgICAgdGVtcGxhdGVTdGFydC5jb250ZW50ID0gYDx0ZW1wbGF0ZSAjJHtmaWxlbmFtZX0+YDtcbiAgICAgICAgdG9rZW5BcnJheS5wdXNoKHRlbXBsYXRlU3RhcnQpO1xuXG4gICAgICAgIGNvbnN0IHJlc29sdmVkUGF0aCA9IGpvaW4oY29tcG9uZW50RGlyLCBmaWxlbmFtZSk7XG5cbiAgICAgICAgY29uc3QgeyBleHRlbnNpb24sIGZpbGVwYXRoLCBsYW5nLCBsaW5lcywgdGl0bGUgfSA9XG4gICAgICAgICAgcmF3UGF0aFRvVG9rZW4ocmVzb2x2ZWRQYXRoKTtcbiAgICAgICAgLy8gQWRkIGNvZGUgdG9rZW5zIGZvciBlYWNoIGxpbmVcbiAgICAgICAgY29uc3QgdG9rZW4gPSBuZXcgc3RhdGUuVG9rZW4oJ2ZlbmNlJywgJ2NvZGUnLCAwKTtcbiAgICAgICAgdG9rZW4uaW5mbyA9IGAke2xhbmcgfHwgZXh0ZW5zaW9ufSR7bGluZXMgPyBgeyR7bGluZXN9fWAgOiAnJ30ke1xuICAgICAgICAgIHRpdGxlID8gYFske3RpdGxlfV1gIDogJydcbiAgICAgICAgfWA7XG5cbiAgICAgICAgdG9rZW4uY29udGVudCA9IGA8PDwgJHtmaWxlcGF0aH1gO1xuICAgICAgICAodG9rZW4gYXMgYW55KS5zcmMgPSBbcmVzb2x2ZWRQYXRoXTtcbiAgICAgICAgdG9rZW5BcnJheS5wdXNoKHRva2VuKTtcblxuICAgICAgICBjb25zdCB0ZW1wbGF0ZUVuZCA9IG5ldyBzdGF0ZS5Ub2tlbignaHRtbF9pbmxpbmUnLCAnJywgMCk7XG4gICAgICAgIHRlbXBsYXRlRW5kLmNvbnRlbnQgPSAnPC90ZW1wbGF0ZT4nO1xuICAgICAgICB0b2tlbkFycmF5LnB1c2godGVtcGxhdGVFbmQpO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBlbmRUYWcgPSBuZXcgc3RhdGUuVG9rZW4oJ2h0bWxfaW5saW5lJywgJycsIDApO1xuICAgICAgZW5kVGFnLmNvbnRlbnQgPSAnPC9EZW1vUHJldmlldz4nO1xuICAgICAgdG9rZW5BcnJheS5wdXNoKGVuZFRhZyk7XG5cbiAgICAgIHN0YXRlLnRva2Vucy5zcGxpY2UoaW5kZXggKyAxLCAwLCAuLi50b2tlbkFycmF5KTtcblxuICAgICAgLy8gY29uc29sZS5sb2coXG4gICAgICAvLyAgIHN0YXRlLm1kLnJlbmRlcmVyLnJlbmRlcihzdGF0ZS50b2tlbnMsIHN0YXRlPy5vcHRpb25zID8/IFtdLCBzdGF0ZS5lbnYpLFxuICAgICAgLy8gKTtcbiAgICAgIHJldHVybiAnJztcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBnZW5lcmF0ZUNvbnRlbnRIYXNoKGlucHV0OiBzdHJpbmcsIGxlbmd0aDogbnVtYmVyID0gMTApOiBzdHJpbmcge1xuICAvLyBcdTRGN0ZcdTc1MjggU0hBLTI1NiBcdTc1MUZcdTYyMTBcdTU0QzhcdTVFMENcdTUwM0NcbiAgY29uc3QgaGFzaCA9IGNyeXB0by5jcmVhdGVIYXNoKCdzaGEyNTYnKS51cGRhdGUoaW5wdXQpLmRpZ2VzdCgnaGV4Jyk7XG5cbiAgLy8gXHU1QzA2XHU1NEM4XHU1RTBDXHU1MDNDXHU4RjZDXHU2MzYyXHU0RTNBIEJhc2UzNiBcdTdGMTZcdTc4MDFcdUZGMENcdTVFNzZcdTUzRDZcdTYzMDdcdTVCOUFcdTk1N0ZcdTVFQTZcdTc2ODRcdTVCNTdcdTdCMjZcdTRGNUNcdTRFM0FcdTdFRDNcdTY3OUNcbiAgcmV0dXJuIE51bWJlci5wYXJzZUludChoYXNoLCAxNikudG9TdHJpbmcoMzYpLnNsaWNlKDAsIGxlbmd0aCk7XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFx1NkQ0MVx1OTFDRlx1NUY1NVx1NTIzNlx1NTQ4Q1x1NTZERVx1NjUzRVxcXFxvc21vLXZ1ZTNcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcXHU2RDQxXHU5MUNGXHU1RjU1XHU1MjM2XHU1NDhDXHU1NkRFXHU2NTNFXFxcXG9zbW8tdnVlM1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnXFxcXHpoLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovJUU2JUI1JTgxJUU5JTg3JThGJUU1JUJEJTk1JUU1JTg4JUI2JUU1JTkyJThDJUU1JTlCJTlFJUU2JTk0JUJFL29zbW8tdnVlMy9kb2NzLy52aXRlcHJlc3MvY29uZmlnL3poLm10c1wiO2ltcG9ydCB0eXBlIHsgRGVmYXVsdFRoZW1lIH0gZnJvbSAndml0ZXByZXNzJztcblxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZXByZXNzJztcblxuaW1wb3J0IHsgdmVyc2lvbiB9IGZyb20gJy4uLy4uLy4uL3BhY2thZ2UuanNvbic7XG5cbmV4cG9ydCBjb25zdCB6aCA9IGRlZmluZUNvbmZpZyh7XG4gIGRlc2NyaXB0aW9uOiAnVmJlbiBBZG1pbiAmIFx1NEYwMVx1NEUxQVx1N0VBN1x1N0JBMVx1NzQwNlx1N0NGQlx1N0VERlx1Njg0Nlx1NjdCNicsXG4gIGxhbmc6ICd6aC1IYW5zJyxcbiAgdGhlbWVDb25maWc6IHtcbiAgICBkYXJrTW9kZVN3aXRjaExhYmVsOiAnXHU0RTNCXHU5ODk4JyxcbiAgICBkYXJrTW9kZVN3aXRjaFRpdGxlOiAnXHU1MjA3XHU2MzYyXHU1MjMwXHU2REYxXHU4MjcyXHU2QTIxXHU1RjBGJyxcbiAgICBkb2NGb290ZXI6IHtcbiAgICAgIG5leHQ6ICdcdTRFMEJcdTRFMDBcdTk4NzUnLFxuICAgICAgcHJldjogJ1x1NEUwQVx1NEUwMFx1OTg3NScsXG4gICAgfSxcbiAgICBlZGl0TGluazoge1xuICAgICAgcGF0dGVybjpcbiAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS92YmVuanMvdnVlLXZiZW4tYWRtaW4vZWRpdC9tYWluL2RvY3Mvc3JjLzpwYXRoJyxcbiAgICAgIHRleHQ6ICdcdTU3MjggR2l0SHViIFx1NEUwQVx1N0YxNlx1OEY5MVx1NkI2NFx1OTg3NVx1OTc2MicsXG4gICAgfSxcbiAgICBmb290ZXI6IHtcbiAgICAgIGNvcHlyaWdodDogYENvcHlyaWdodCBcdTAwQTkgMjAyNS0ke25ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKX0gT3Ntb2AsXG4gICAgICBtZXNzYWdlOiAnXHU1N0ZBXHU0RThFIE1JVCBcdThCQjhcdTUzRUZcdTUzRDFcdTVFMDMuJyxcbiAgICB9LFxuICAgIGxhbmdNZW51TGFiZWw6ICdcdTU5MUFcdThCRURcdThBMDAnLFxuICAgIGxhc3RVcGRhdGVkOiB7XG4gICAgICBmb3JtYXRPcHRpb25zOiB7XG4gICAgICAgIGRhdGVTdHlsZTogJ3Nob3J0JyxcbiAgICAgICAgdGltZVN0eWxlOiAnbWVkaXVtJyxcbiAgICAgIH0sXG4gICAgICB0ZXh0OiAnXHU2NzAwXHU1NDBFXHU2NkY0XHU2NUIwXHU0RThFJyxcbiAgICB9LFxuICAgIGxpZ2h0TW9kZVN3aXRjaFRpdGxlOiAnXHU1MjA3XHU2MzYyXHU1MjMwXHU2RDQ1XHU4MjcyXHU2QTIxXHU1RjBGJyxcbiAgICBuYXY6IG5hdigpLFxuXG4gICAgb3V0bGluZToge1xuICAgICAgbGFiZWw6ICdcdTk4NzVcdTk3NjJcdTVCRkNcdTgyMkEnLFxuICAgIH0sXG4gICAgcmV0dXJuVG9Ub3BMYWJlbDogJ1x1NTZERVx1NTIzMFx1OTg3Nlx1OTBFOCcsXG5cbiAgICBzaWRlYmFyOiB7XG4gICAgICAnL2NvbW1lcmNpYWwvJzogeyBiYXNlOiAnL2NvbW1lcmNpYWwvJywgaXRlbXM6IHNpZGViYXJDb21tZXJjaWFsKCkgfSxcbiAgICAgICcvY29tcG9uZW50cy8nOiB7IGJhc2U6ICcvY29tcG9uZW50cy8nLCBpdGVtczogc2lkZWJhckNvbXBvbmVudHMoKSB9LFxuICAgICAgJy9ndWlkZS8nOiB7IGJhc2U6ICcvZ3VpZGUvJywgaXRlbXM6IHNpZGViYXJHdWlkZSgpIH0sXG4gICAgfSxcbiAgICBzaWRlYmFyTWVudUxhYmVsOiAnXHU4M0RDXHU1MzU1JyxcbiAgfSxcbn0pO1xuXG5mdW5jdGlvbiBzaWRlYmFyR3VpZGUoKTogRGVmYXVsdFRoZW1lLlNpZGViYXJJdGVtW10ge1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICB0ZXh0OiAnXHU3QjgwXHU0RUNCJyxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnaW50cm9kdWN0aW9uL3ZiZW4nLFxuICAgICAgICAgIHRleHQ6ICdcdTUxNzNcdTRFOEUgT3NtbycsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnaW50cm9kdWN0aW9uL3doeScsXG4gICAgICAgICAgdGV4dDogJ1x1NEUzQVx1NEVDMFx1NEU0OFx1OTAwOVx1NjJFOVx1NjIxMVx1NEVFQz8nLFxuICAgICAgICB9LFxuICAgICAgICB7IGxpbms6ICdpbnRyb2R1Y3Rpb24vcXVpY2stc3RhcnQnLCB0ZXh0OiAnXHU1RkVCXHU5MDFGXHU1RjAwXHU1OUNCJyB9LFxuICAgICAgICAvLyB7IGxpbms6ICdpbnRyb2R1Y3Rpb24vdGhpbicsIHRleHQ6ICdcdTdDQkVcdTdCODBcdTcyNDhcdTY3MkMnIH0sXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICBiYXNlOiAnLycsXG4gICAgICAgIC8vICAgbGluazogJ2NvbXBvbmVudHMvaW50cm9kdWN0aW9uJyxcbiAgICAgICAgLy8gICB0ZXh0OiAnXHU3RUM0XHU0RUY2XHU2NTg3XHU2ODYzJyxcbiAgICAgICAgLy8gfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICAvLyB7XG4gICAgLy8gICB0ZXh0OiAnXHU1N0ZBXHU3ODQwJyxcbiAgICAvLyAgIGl0ZW1zOiBbXG4gICAgLy8gICAgIHsgbGluazogJ2Vzc2VudGlhbHMvY29uY2VwdCcsIHRleHQ6ICdcdTU3RkFcdTc4NDBcdTY5ODJcdTVGRjUnIH0sXG4gICAgLy8gICAgIHsgbGluazogJ2Vzc2VudGlhbHMvZGV2ZWxvcG1lbnQnLCB0ZXh0OiAnXHU2NzJDXHU1NzMwXHU1RjAwXHU1M0QxJyB9LFxuICAgIC8vICAgICB7IGxpbms6ICdlc3NlbnRpYWxzL3JvdXRlJywgdGV4dDogJ1x1OERFRlx1NzUzMVx1NTQ4Q1x1ODNEQ1x1NTM1NScgfSxcbiAgICAvLyAgICAgeyBsaW5rOiAnZXNzZW50aWFscy9zZXR0aW5ncycsIHRleHQ6ICdcdTkxNERcdTdGNkUnIH0sXG4gICAgLy8gICAgIHsgbGluazogJ2Vzc2VudGlhbHMvaWNvbnMnLCB0ZXh0OiAnXHU1NkZFXHU2ODA3JyB9LFxuICAgIC8vICAgICB7IGxpbms6ICdlc3NlbnRpYWxzL3N0eWxlcycsIHRleHQ6ICdcdTY4MzdcdTVGMEYnIH0sXG4gICAgLy8gICAgIHsgbGluazogJ2Vzc2VudGlhbHMvZXh0ZXJuYWwtbW9kdWxlJywgdGV4dDogJ1x1NTkxNlx1OTBFOFx1NkEyMVx1NTc1NycgfSxcbiAgICAvLyAgICAgeyBsaW5rOiAnZXNzZW50aWFscy9idWlsZCcsIHRleHQ6ICdcdTY3ODRcdTVFRkFcdTRFMEVcdTkwRThcdTdGNzInIH0sXG4gICAgLy8gICAgIHsgbGluazogJ2Vzc2VudGlhbHMvc2VydmVyJywgdGV4dDogJ1x1NjcwRFx1NTJBMVx1N0FFRlx1NEVBNFx1NEU5Mlx1NEUwRVx1NjU3MFx1NjM2RU1vY2snIH0sXG4gICAgLy8gICBdLFxuICAgIC8vIH0sXG4gICAgLy8ge1xuICAgIC8vICAgdGV4dDogJ1x1NkRGMVx1NTE2NScsXG4gICAgLy8gICBpdGVtczogW1xuICAgIC8vICAgICB7IGxpbms6ICdpbi1kZXB0aC9sb2dpbicsIHRleHQ6ICdcdTc2N0JcdTVGNTUnIH0sXG4gICAgLy8gICAgIC8vIHsgbGluazogJ2luLWRlcHRoL2xheW91dCcsIHRleHQ6ICdcdTVFMDNcdTVDNDAnIH0sXG4gICAgLy8gICAgIHsgbGluazogJ2luLWRlcHRoL3RoZW1lJywgdGV4dDogJ1x1NEUzQlx1OTg5OCcgfSxcbiAgICAvLyAgICAgeyBsaW5rOiAnaW4tZGVwdGgvYWNjZXNzJywgdGV4dDogJ1x1Njc0M1x1OTY1MCcgfSxcbiAgICAvLyAgICAgeyBsaW5rOiAnaW4tZGVwdGgvbG9jYWxlJywgdGV4dDogJ1x1NTZGRFx1OTY0NVx1NTMxNicgfSxcbiAgICAvLyAgICAgeyBsaW5rOiAnaW4tZGVwdGgvZmVhdHVyZXMnLCB0ZXh0OiAnXHU1RTM4XHU3NTI4XHU1MjlGXHU4MEZEJyB9LFxuICAgIC8vICAgICB7IGxpbms6ICdpbi1kZXB0aC9jaGVjay11cGRhdGVzJywgdGV4dDogJ1x1NjhDMFx1NjdFNVx1NjZGNFx1NjVCMCcgfSxcbiAgICAvLyAgICAgeyBsaW5rOiAnaW4tZGVwdGgvbG9hZGluZycsIHRleHQ6ICdcdTUxNjhcdTVDNDBsb2FkaW5nJyB9LFxuICAgIC8vICAgICB7IGxpbms6ICdpbi1kZXB0aC91aS1mcmFtZXdvcmsnLCB0ZXh0OiAnXHU3RUM0XHU0RUY2XHU1RTkzXHU1MjA3XHU2MzYyJyB9LFxuICAgIC8vICAgXSxcbiAgICAvLyB9LFxuICAgIC8vIHtcbiAgICAvLyAgIHRleHQ6ICdcdTVERTVcdTdBMEInLFxuICAgIC8vICAgaXRlbXM6IFtcbiAgICAvLyAgICAgeyBsaW5rOiAncHJvamVjdC9zdGFuZGFyZCcsIHRleHQ6ICdcdTg5QzRcdTgzMDMnIH0sXG4gICAgLy8gICAgIHsgbGluazogJ3Byb2plY3QvY2xpJywgdGV4dDogJ0NMSScgfSxcbiAgICAvLyAgICAgeyBsaW5rOiAncHJvamVjdC9kaXInLCB0ZXh0OiAnXHU3NkVFXHU1RjU1XHU4QkY0XHU2NjBFJyB9LFxuICAgIC8vICAgICB7IGxpbms6ICdwcm9qZWN0L3Rlc3QnLCB0ZXh0OiAnXHU1MzU1XHU1MTQzXHU2RDRCXHU4QkQ1JyB9LFxuICAgIC8vICAgICB7IGxpbms6ICdwcm9qZWN0L3RhaWx3aW5kY3NzJywgdGV4dDogJ1RhaWx3aW5kIENTUycgfSxcbiAgICAvLyAgICAgeyBsaW5rOiAncHJvamVjdC9jaGFuZ2VzZXQnLCB0ZXh0OiAnQ2hhbmdlc2V0JyB9LFxuICAgIC8vICAgICB7IGxpbms6ICdwcm9qZWN0L3ZpdGUnLCB0ZXh0OiAnVml0ZSBDb25maWcnIH0sXG4gICAgLy8gICBdLFxuICAgIC8vIH0sXG4gICAgLy8ge1xuICAgIC8vICAgdGV4dDogJ1x1NTE3Nlx1NEVENicsXG4gICAgLy8gICBpdGVtczogW1xuICAgIC8vICAgICB7IGxpbms6ICdvdGhlci9wcm9qZWN0LXVwZGF0ZScsIHRleHQ6ICdcdTk4NzlcdTc2RUVcdTY2RjRcdTY1QjAnIH0sXG4gICAgLy8gICAgIHsgbGluazogJ290aGVyL3JlbW92ZS1jb2RlJywgdGV4dDogJ1x1NzlGQlx1OTY2NFx1NEVFM1x1NzgwMScgfSxcbiAgICAvLyAgICAgeyBsaW5rOiAnb3RoZXIvZmFxJywgdGV4dDogJ1x1NUUzOFx1ODlDMVx1OTVFRVx1OTg5OCcgfSxcbiAgICAvLyAgIF0sXG4gICAgLy8gfSxcbiAgXTtcbn1cblxuZnVuY3Rpb24gc2lkZWJhckNvbW1lcmNpYWwoKTogRGVmYXVsdFRoZW1lLlNpZGViYXJJdGVtW10ge1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIGxpbms6ICdjb21tdW5pdHknLFxuICAgICAgdGV4dDogJ1x1NEVBNFx1NkQ0MVx1N0ZBNCcsXG4gICAgfSxcbiAgICB7XG4gICAgICBsaW5rOiAndGVjaG5pY2FsLXN1cHBvcnQnLFxuICAgICAgdGV4dDogJ1x1NjI4MFx1NjcyRlx1NjUyRlx1NjMwMScsXG4gICAgfSxcbiAgICB7XG4gICAgICBsaW5rOiAnY3VzdG9taXplZCcsXG4gICAgICB0ZXh0OiAnXHU1QjlBXHU1MjM2XHU1RjAwXHU1M0QxJyxcbiAgICB9LFxuICBdO1xufVxuXG5mdW5jdGlvbiBzaWRlYmFyQ29tcG9uZW50cygpOiBEZWZhdWx0VGhlbWUuU2lkZWJhckl0ZW1bXSB7XG4gIHJldHVybiBbXG4gICAge1xuICAgICAgdGV4dDogJ1x1N0VDNFx1NEVGNicsXG4gICAgICBpdGVtczogW1xuICAgICAgICB7XG4gICAgICAgICAgbGluazogJ2ludHJvZHVjdGlvbicsXG4gICAgICAgICAgdGV4dDogJ1x1NEVDQlx1N0VDRCcsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICAgIHRleHQ6ICdcdTVFMDNcdTVDNDBcdTdFQzRcdTRFRjYnLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICdsYXlvdXQtdWkvcGFnZScsXG4gICAgICAgICAgdGV4dDogJ1BhZ2UgXHU5ODc1XHU5NzYyJyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgICAgdGV4dDogJ1x1OTAxQVx1NzUyOFx1N0VDNFx1NEVGNicsXG4gICAgICBpdGVtczogW1xuICAgICAgICB7XG4gICAgICAgICAgbGluazogJ2NvbW1vbi11aS92YmVuLWFwaS1jb21wb25lbnQnLFxuICAgICAgICAgIHRleHQ6ICdBcGlDb21wb25lbnQgQXBpXHU3RUM0XHU0RUY2XHU1MzA1XHU4OEM1XHU1NjY4JyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICdjb21tb24tdWkvdmJlbi1hbGVydCcsXG4gICAgICAgICAgdGV4dDogJ0FsZXJ0IFx1OEY3Qlx1OTFDRlx1NjNEMFx1NzkzQVx1Njg0NicsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnY29tbW9uLXVpL3ZiZW4tbW9kYWwnLFxuICAgICAgICAgIHRleHQ6ICdNb2RhbCBcdTZBMjFcdTYwMDFcdTY4NDYnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJ2NvbW1vbi11aS92YmVuLWRyYXdlcicsXG4gICAgICAgICAgdGV4dDogJ0RyYXdlciBcdTYyQkRcdTVDNDknLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJ2NvbW1vbi11aS92YmVuLWZvcm0nLFxuICAgICAgICAgIHRleHQ6ICdGb3JtIFx1ODg2OFx1NTM1NScsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnY29tbW9uLXVpL3ZiZW4tdnhlLXRhYmxlJyxcbiAgICAgICAgICB0ZXh0OiAnVnhlIFRhYmxlIFx1ODg2OFx1NjgzQycsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnY29tbW9uLXVpL3ZiZW4tY291bnQtdG8tYW5pbWF0b3InLFxuICAgICAgICAgIHRleHQ6ICdDb3VudFRvQW5pbWF0b3IgXHU2NTcwXHU1QjU3XHU1MkE4XHU3NTNCJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICdjb21tb24tdWkvdmJlbi1lbGxpcHNpcy10ZXh0JyxcbiAgICAgICAgICB0ZXh0OiAnRWxsaXBzaXNUZXh0IFx1NzcwMVx1NzU2NVx1NjU4N1x1NjcyQycsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIF07XG59XG5cbmZ1bmN0aW9uIG5hdigpOiBEZWZhdWx0VGhlbWUuTmF2SXRlbVtdIHtcbiAgcmV0dXJuIFtcbiAgICB7XG4gICAgICBhY3RpdmVNYXRjaDogJ14vKGd1aWRlfGNvbXBvbmVudHMpLycsXG4gICAgICB0ZXh0OiAnXHU2NTg3XHU2ODYzJyxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBhY3RpdmVNYXRjaDogJ14vZ3VpZGUvJyxcbiAgICAgICAgICBsaW5rOiAnL2d1aWRlL2ludHJvZHVjdGlvbi92YmVuJyxcbiAgICAgICAgICB0ZXh0OiAnXHU2MzA3XHU1MzU3JyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGFjdGl2ZU1hdGNoOiAnXi9jb21wb25lbnRzLycsXG4gICAgICAgICAgbGluazogJy9jb21wb25lbnRzL2ludHJvZHVjdGlvbicsXG4gICAgICAgICAgdGV4dDogJ1x1N0VDNFx1NEVGNicsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnXHU1Mzg2XHU1M0YyXHU3MjQ4XHU2NzJDJyxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsaW5rOiAnaHR0cHM6Ly9kb2MudnZiaW4uY24nLFxuICAgICAgICAgICAgICB0ZXh0OiAnMi54XHU3MjQ4XHU2NzJDXHU2NTg3XHU2ODYzJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnXHU3Q0ZCXHU3RURGXHU1NzMwXHU1NzQwJyxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnT3NtbycsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGluazogJ2h0dHBzOi8vd3d3LnZiZW4ucHJvJyxcbiAgICAgICAgICAgICAgdGV4dDogJzAuMC4xXHU3MjQ4XHU2NzJDJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAvLyAgIGxpbms6ICdodHRwczovL2FudC52YmVuLnBybycsXG4gICAgICAgICAgICAvLyAgIHRleHQ6ICdBbnQgRGVzaWduIFZ1ZSBcdTcyNDhcdTY3MkMnLFxuICAgICAgICAgICAgLy8gfSxcbiAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgIC8vICAgbGluazogJ2h0dHBzOi8vbmFpdmUudmJlbi5wcm8nLFxuICAgICAgICAgICAgLy8gICB0ZXh0OiAnTmFpdmUgXHU3MjQ4XHU2NzJDJyxcbiAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAvLyAgIGxpbms6ICdodHRwczovL2VsZS52YmVuLnBybycsXG4gICAgICAgICAgICAvLyAgIHRleHQ6ICdFbGVtZW50IFBsdXNcdTcyNDhcdTY3MkMnLFxuICAgICAgICAgICAgLy8gfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgdGV4dDogJ1x1NTE3Nlx1NEVENicsXG4gICAgICAgIC8vICAgaXRlbXM6IFtcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgICAgbGluazogJ2h0dHBzOi8vdmJlbi52dmJpbi5jbicsXG4gICAgICAgIC8vICAgICAgIHRleHQ6ICdPc21vIDIueCcsXG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgIF0sXG4gICAgICAgIC8vIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAgLy8ge1xuICAgIC8vICAgdGV4dDogdmVyc2lvbixcbiAgICAvLyAgIGl0ZW1zOiBbXG4gICAgLy8gICAgIHtcbiAgICAvLyAgICAgICBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL3ZiZW5qcy92dWUtdmJlbi1hZG1pbi9yZWxlYXNlcycsXG4gICAgLy8gICAgICAgdGV4dDogJ1x1NjZGNFx1NjVCMFx1NjVFNVx1NUZENycsXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICAgIHtcbiAgICAvLyAgICAgICBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL29yZ3MvdmJlbmpzL3Byb2plY3RzLzUnLFxuICAgIC8vICAgICAgIHRleHQ6ICdcdThERUZcdTdFQkZcdTU2RkUnLFxuICAgIC8vICAgICB9LFxuICAgIC8vICAgICB7XG4gICAgLy8gICAgICAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS92YmVuanMvdnVlLXZiZW4tYWRtaW4vYmxvYi9tYWluLy5naXRodWIvY29udHJpYnV0aW5nLm1kJyxcbiAgICAvLyAgICAgICB0ZXh0OiAnXHU4RDIxXHU3MzJFJyxcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgIF0sXG4gICAgLy8gfSx7XG4gICAgLy8gICB0ZXh0OiB2ZXJzaW9uLFxuICAgIC8vICAgaXRlbXM6IFtcbiAgICAvLyAgICAge1xuICAgIC8vICAgICAgIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vdmJlbmpzL3Z1ZS12YmVuLWFkbWluL3JlbGVhc2VzJyxcbiAgICAvLyAgICAgICB0ZXh0OiAnXHU2NkY0XHU2NUIwXHU2NUU1XHU1RkQ3JyxcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgICAge1xuICAgIC8vICAgICAgIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vb3Jncy92YmVuanMvcHJvamVjdHMvNScsXG4gICAgLy8gICAgICAgdGV4dDogJ1x1OERFRlx1N0VCRlx1NTZGRScsXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICAgIHtcbiAgICAvLyAgICAgICBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL3ZiZW5qcy92dWUtdmJlbi1hZG1pbi9ibG9iL21haW4vLmdpdGh1Yi9jb250cmlidXRpbmcubWQnLFxuICAgIC8vICAgICAgIHRleHQ6ICdcdThEMjFcdTczMkUnLFxuICAgIC8vICAgICB9LFxuICAgIC8vICAgXSxcbiAgICAvLyB9LFxuICAgIC8vIHtcbiAgICAvLyAgIGxpbms6ICcvY29tbWVyY2lhbC90ZWNobmljYWwtc3VwcG9ydCcsXG4gICAgLy8gICB0ZXh0OiAnXHVEODNFXHVERDg0IFx1NjI4MFx1NjcyRlx1NjUyRlx1NjMwMScsXG4gICAgLy8gfSxcbiAgICAvLyB7XG4gICAgLy8gICBsaW5rOiAnL3Nwb25zb3IvcGVyc29uYWwnLFxuICAgIC8vICAgdGV4dDogJ1x1MjcyOCBcdThENUVcdTUyQTknLFxuICAgIC8vIH0sXG4gICAge1xuICAgICAgbGluazogJy9jb21tZXJjaWFsL2NvbW11bml0eScsXG4gICAgICB0ZXh0OiAnXHVEODNEXHVEQzY4XHUyMDBEXHVEODNEXHVEQzY2XHUyMDBEXHVEODNEXHVEQzY2IFx1NEVBNFx1NkQ0MVx1N0ZBNCcsXG4gICAgICAvLyBpdGVtczogW1xuICAgICAgLy8gICB7XG4gICAgICAvLyAgICAgbGluazogJ2h0dHBzOi8vcXVuLnFxLmNvbS9xcXdlYi9xdW5wcm8vc2hhcmU/X3d2PTMmX3d3dj0xMjgmYXBwQ2hhbm5lbD1zaGFyZSZpbnZpdGVDb2RlPTIyeVN6ajdwS2l3JmJ1c2luZXNzVHlwZT05JmZyb209MjQ2NjEwJmJpej1rYSZtYWluU291cmNlSWQ9c2hhcmUmc3ViU291cmNlSWQ9b3RoZXJzJmp1bXBzb3VyY2U9c2hvcnR1cmwjL3BjJyxcbiAgICAgIC8vICAgICB0ZXh0OiAnUVFcdTk4OTFcdTkwNTMnLFxuICAgICAgLy8gICB9LFxuICAgICAgLy8gICB7XG4gICAgICAvLyAgICAgbGluazogJ2h0dHBzOi8vcW0ucXEuY29tL2NnaS1iaW4vcW0vcXI/X3d2PTEwMjcmaz1talptbGhnVnp6VXh2ZHhsbEI2QzF2SHBYOE84UVJMMCZhdXRoS2V5PURCZEZiQndFUm1mYUtZOTVKdlJXcUxDSklSR0pBbUt5WmJycHpaNDFFS0RNWjVTUjZNZmJqT0JhYU5STjczZnImbm92ZXJpZnk9MCZncm91cF9jb2RlPTQyODYxMDknLFxuICAgICAgLy8gICAgIHRleHQ6ICdRUVx1N0ZBNCcsXG4gICAgICAvLyAgIH0sXG4gICAgICAvLyAgIHtcbiAgICAgIC8vICAgICBsaW5rOiAnaHR0cHM6Ly9kaXNjb3JkLmdnL1ZVNjJqVGVjYWQnLFxuICAgICAgLy8gICAgIHRleHQ6ICdEaXNjb3JkJyxcbiAgICAgIC8vICAgfSxcbiAgICAgIC8vIF0sXG4gICAgfSxcbiAgICAvLyB7XG4gICAgLy8gICBsaW5rOiAnL2ZyaWVuZC1saW5rcy8nLFxuICAgIC8vICAgdGV4dDogJ1x1RDgzRVx1REQxRCBcdTUzQ0JcdTYwQzVcdTk0RkVcdTYzQTUnLFxuICAgIC8vIH0sXG4gIF07XG59XG5cbmV4cG9ydCBjb25zdCBzZWFyY2g6IERlZmF1bHRUaGVtZS5BbGdvbGlhU2VhcmNoT3B0aW9uc1snbG9jYWxlcyddID0ge1xuICByb290OiB7XG4gICAgcGxhY2Vob2xkZXI6ICdcdTY0MUNcdTdEMjJcdTY1ODdcdTY4NjMnLFxuICAgIHRyYW5zbGF0aW9uczoge1xuICAgICAgYnV0dG9uOiB7XG4gICAgICAgIGJ1dHRvbkFyaWFMYWJlbDogJ1x1NjQxQ1x1N0QyMlx1NjU4N1x1Njg2MycsXG4gICAgICAgIGJ1dHRvblRleHQ6ICdcdTY0MUNcdTdEMjJcdTY1ODdcdTY4NjMnLFxuICAgICAgfSxcbiAgICAgIG1vZGFsOiB7XG4gICAgICAgIGVycm9yU2NyZWVuOiB7XG4gICAgICAgICAgaGVscFRleHQ6ICdcdTRGNjBcdTUzRUZcdTgwRkRcdTk3MDBcdTg5ODFcdTY4QzBcdTY3RTVcdTRGNjBcdTc2ODRcdTdGNTFcdTdFRENcdThGREVcdTYzQTUnLFxuICAgICAgICAgIHRpdGxlVGV4dDogJ1x1NjVFMFx1NkNENVx1ODNCN1x1NTNENlx1N0VEM1x1Njc5QycsXG4gICAgICAgIH0sXG4gICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgIGNsb3NlVGV4dDogJ1x1NTE3M1x1OTVFRCcsXG4gICAgICAgICAgbmF2aWdhdGVUZXh0OiAnXHU1MjA3XHU2MzYyJyxcbiAgICAgICAgICBzZWFyY2hCeVRleHQ6ICdcdTY0MUNcdTdEMjJcdTYzRDBcdTRGOUJcdTgwMDUnLFxuICAgICAgICAgIHNlbGVjdFRleHQ6ICdcdTkwMDlcdTYyRTknLFxuICAgICAgICB9LFxuICAgICAgICBub1Jlc3VsdHNTY3JlZW46IHtcbiAgICAgICAgICBub1Jlc3VsdHNUZXh0OiAnXHU2NUUwXHU2Q0Q1XHU2MjdFXHU1MjMwXHU3NkY4XHU1MTczXHU3RUQzXHU2NzlDJyxcbiAgICAgICAgICByZXBvcnRNaXNzaW5nUmVzdWx0c0xpbmtUZXh0OiAnXHU3MEI5XHU1MUZCXHU1M0NEXHU5OTg4JyxcbiAgICAgICAgICByZXBvcnRNaXNzaW5nUmVzdWx0c1RleHQ6ICdcdTRGNjBcdThCQTRcdTRFM0FcdThCRTVcdTY3RTVcdThCRTJcdTVFOTRcdThCRTVcdTY3MDlcdTdFRDNcdTY3OUNcdUZGMUYnLFxuICAgICAgICAgIHN1Z2dlc3RlZFF1ZXJ5VGV4dDogJ1x1NEY2MFx1NTNFRlx1NEVFNVx1NUMxRFx1OEJENVx1NjdFNVx1OEJFMicsXG4gICAgICAgIH0sXG4gICAgICAgIHNlYXJjaEJveDoge1xuICAgICAgICAgIGNhbmNlbEJ1dHRvbkFyaWFMYWJlbDogJ1x1NTNENlx1NkQ4OCcsXG4gICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ1x1NTNENlx1NkQ4OCcsXG4gICAgICAgICAgcmVzZXRCdXR0b25BcmlhTGFiZWw6ICdcdTZFMDVcdTk2NjRcdTY3RTVcdThCRTJcdTY3NjFcdTRFRjYnLFxuICAgICAgICAgIHJlc2V0QnV0dG9uVGl0bGU6ICdcdTZFMDVcdTk2NjRcdTY3RTVcdThCRTJcdTY3NjFcdTRFRjYnLFxuICAgICAgICB9LFxuICAgICAgICBzdGFydFNjcmVlbjoge1xuICAgICAgICAgIGZhdm9yaXRlU2VhcmNoZXNUaXRsZTogJ1x1NjUzNlx1ODVDRicsXG4gICAgICAgICAgbm9SZWNlbnRTZWFyY2hlc1RleHQ6ICdcdTZDQTFcdTY3MDlcdTY0MUNcdTdEMjJcdTUzODZcdTUzRjInLFxuICAgICAgICAgIHJlY2VudFNlYXJjaGVzVGl0bGU6ICdcdTY0MUNcdTdEMjJcdTUzODZcdTUzRjInLFxuICAgICAgICAgIHJlbW92ZUZhdm9yaXRlU2VhcmNoQnV0dG9uVGl0bGU6ICdcdTRFQ0VcdTY1MzZcdTg1Q0ZcdTRFMkRcdTc5RkJcdTk2NjQnLFxuICAgICAgICAgIHJlbW92ZVJlY2VudFNlYXJjaEJ1dHRvblRpdGxlOiAnXHU0RUNFXHU2NDFDXHU3RDIyXHU1Mzg2XHU1M0YyXHU0RTJEXHU3OUZCXHU5NjY0JyxcbiAgICAgICAgICBzYXZlUmVjZW50U2VhcmNoQnV0dG9uVGl0bGU6ICdcdTRGRERcdTVCNThcdTgxRjNcdTY0MUNcdTdEMjJcdTUzODZcdTUzRjInLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlcsU0FBUyxlQUFlO0FBQ3JZLFNBQVMsNkJBQTZCOzs7QUNDdEMsU0FBUyxvQkFBb0I7OztBQ0EzQixjQUFXOzs7QURJTixJQUFNLEtBQUssYUFBYTtBQUFBLEVBQzdCLGFBQWE7QUFBQSxFQUNiLE1BQU07QUFBQSxFQUNOLGFBQWE7QUFBQSxJQUNYLHFCQUFxQjtBQUFBLElBQ3JCLHFCQUFxQjtBQUFBLElBQ3JCLFdBQVc7QUFBQSxNQUNULE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQSxVQUFVO0FBQUEsTUFDUixTQUNFO0FBQUEsTUFDRixNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sV0FBVyx3QkFBb0Isb0JBQUksS0FBSyxHQUFFLFlBQVksQ0FBQztBQUFBLE1BQ3ZELFNBQVM7QUFBQSxJQUNYO0FBQUEsSUFDQSxlQUFlO0FBQUEsSUFDZixhQUFhO0FBQUEsTUFDWCxlQUFlO0FBQUEsUUFDYixXQUFXO0FBQUEsUUFDWCxXQUFXO0FBQUEsTUFDYjtBQUFBLE1BQ0EsTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBLHNCQUFzQjtBQUFBLElBQ3RCLEtBQUssSUFBSTtBQUFBLElBQ1QsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLGtCQUFrQjtBQUFBLElBQ2xCLFNBQVM7QUFBQSxNQUNQLG1CQUFtQjtBQUFBLFFBQ2pCLE1BQU07QUFBQSxRQUNOLE9BQU8sa0JBQWtCO0FBQUEsTUFD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QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUNGO0FBRUEsU0FBUyxNQUE4QjtBQUNyQyxTQUFPO0FBQUEsSUFDTDtBQUFBLE1BQ0UsYUFBYTtBQUFBLE1BQ2IsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0w7QUFBQSxVQUNFLGFBQWE7QUFBQSxVQUNiLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBTUE7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE9BQU87QUFBQSxZQUNMO0FBQUEsY0FDRSxNQUFNO0FBQUEsY0FDTixNQUFNO0FBQUEsWUFDUjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTDtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFlBQ0w7QUFBQSxjQUNFLE1BQU07QUFBQSxjQUNOLE1BQU07QUFBQSxZQUNSO0FBQUEsWUFDQTtBQUFBLGNBQ0UsTUFBTTtBQUFBLGNBQ04sTUFBTTtBQUFBLFlBQ1I7QUFBQSxZQUNBO0FBQUEsY0FDRSxNQUFNO0FBQUEsY0FDTixNQUFNO0FBQUEsWUFDUjtBQUFBLFlBQ0E7QUFBQSxjQUNFLE1BQU07QUFBQSxjQUNOLE1BQU07QUFBQSxZQUNSO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixPQUFPO0FBQUEsWUFDTDtBQUFBLGNBQ0UsTUFBTTtBQUFBLGNBQ04sTUFBTTtBQUFBLFlBQ1I7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0w7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtGO0FBQ0Y7OztBRW5PQSxTQUFTLGVBQWU7QUFFeEI7QUFBQSxFQUNFO0FBQUEsRUFDQTtBQUFBLE9BQ0s7QUFFUDtBQUFBLEVBQ0U7QUFBQSxFQUNBO0FBQUEsT0FDSztBQUNQLE9BQU8sY0FBYztBQUNyQixTQUFTLGdCQUFBQSxlQUFjLDRCQUE0QjtBQUNuRDtBQUFBLEVBQ0U7QUFBQSxFQUNBO0FBQUEsT0FDSzs7O0FDakJQLE9BQU8sWUFBWTtBQUNuQixTQUFTLG1CQUFtQjtBQUM1QixTQUFTLFlBQVk7QUFFZCxJQUFNO0FBQUE7QUFBQSxFQUVYO0FBQUE7QUFFRixTQUFTLGVBQWUsU0FBaUI7QUFDdkMsUUFBTTtBQUFBLElBQ0osV0FBVztBQUFBLElBQ1gsWUFBWTtBQUFBLElBQ1osU0FBUztBQUFBLElBQ1QsUUFBUTtBQUFBLElBQ1IsT0FBTztBQUFBLElBQ1AsV0FBVztBQUFBLEVBQ2IsS0FBSyxjQUFjLEtBQUssT0FBTyxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUM7QUFFL0MsUUFBTSxRQUFRLFlBQVksU0FBUyxNQUFNLEdBQUcsRUFBRSxJQUFJLEtBQUs7QUFFdkQsU0FBTyxFQUFFLFdBQVcsVUFBVSxNQUFNLE9BQU8sUUFBUSxNQUFNO0FBQzNEO0FBRU8sSUFBTSxvQkFBb0IsQ0FBQyxPQUF5QjtBQUN6RCxLQUFHLEtBQUssTUFBTSxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsVUFBVTtBQUN2RCxVQUFNLHdCQUF3QixDQUFDLGlCQUF5QjtBQUN0RCxZQUFNLFFBQVEsTUFBTSxPQUFPO0FBQUEsUUFDekIsQ0FBQyxNQUFNLEVBQUUsU0FBUyxnQkFBZ0IsRUFBRSxRQUFRLE1BQU0saUJBQWlCO0FBQUEsTUFDckU7QUFDQSxVQUFJLFVBQVUsSUFBSTtBQUNoQixjQUFNLGtCQUFrQixJQUFJLE1BQU0sTUFBTSxjQUFjLElBQUksQ0FBQztBQUMzRCx3QkFBZ0IsVUFBVTtBQUFBLEVBQW1CLFlBQVk7QUFBQTtBQUFBO0FBQ3pELGNBQU0sT0FBTyxPQUFPLEdBQUcsR0FBRyxlQUFlO0FBQUEsTUFDM0MsT0FBTztBQUNMLFlBQUksTUFBTSxPQUFPLEtBQUssR0FBRztBQUN2QixnQkFBTSxVQUFVLE1BQU0sT0FBTyxLQUFLLEVBQUU7QUFDcEMsZ0JBQU0sT0FBTyxLQUFLLEVBQUUsVUFBVSxRQUFRO0FBQUEsWUFDcEM7QUFBQSxZQUNBLEdBQUcsWUFBWTtBQUFBO0FBQUEsVUFDakI7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxVQUFNLFFBQVE7QUFFZCxVQUFNLE1BQU0sTUFBTSxJQUFJLFdBQVcsT0FBTyxDQUFDLFFBQVEsUUFBUTtBQUN2RCxZQUFNLGVBQWUsS0FBSyxRQUFRLElBQUksR0FBRyxPQUFPLEdBQUcsRUFBRTtBQUFBLFFBQ25EO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFFQSxVQUFJLGFBQXVCLENBQUM7QUFDNUIsVUFBSSxZQUFZO0FBRWhCLFVBQUk7QUFDRixxQkFDRSxZQUFZLGNBQWM7QUFBQSxVQUN4QixVQUFVO0FBQUEsVUFDVixXQUFXO0FBQUEsVUFDWCxlQUFlO0FBQUEsUUFDakIsQ0FBQyxLQUFLLENBQUM7QUFBQSxNQUNYLFFBQVE7QUFDTixvQkFBWTtBQUFBLE1BQ2Q7QUFFQSxVQUFJLENBQUMsV0FBVztBQUNkLGVBQU87QUFBQSxNQUNUO0FBRUEsWUFBTSxhQUFhLG9CQUFvQixZQUFZO0FBRW5ELFlBQU0sZ0JBQWdCLGlCQUFpQixVQUFVO0FBQ2pEO0FBQUEsUUFDRSxVQUFVLGFBQWEsVUFBVSxZQUFZO0FBQUEsTUFDL0M7QUFDQSxZQUFNLEVBQUUsTUFBTSxNQUFNLElBQUksTUFBTTtBQUU5QixZQUFNLFFBQVEsTUFBTSxPQUFPLFVBQVUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxNQUFNLEtBQUssQ0FBQztBQUVsRSxVQUFJLENBQUMsTUFBTSxPQUFPLEtBQUssR0FBRztBQUN4QixlQUFPO0FBQUEsTUFDVDtBQUNBLFlBQU0sY0FBYztBQUNwQixtQkFBYSxXQUFXLEtBQUssQ0FBQyxHQUFHLE1BQU07QUFDckMsWUFBSSxNQUFNLFlBQWEsUUFBTztBQUM5QixZQUFJLE1BQU0sWUFBYSxRQUFPO0FBQzlCLGVBQU8sRUFBRSxjQUFjLEdBQUcsTUFBTSxFQUFFLGFBQWEsT0FBTyxDQUFDO0FBQUEsTUFDekQsQ0FBQztBQUNELFlBQU0sT0FBTyxLQUFLLEVBQUUsVUFDbEIsdUJBQXVCLG1CQUFtQixLQUFLLFVBQVUsVUFBVSxDQUFDLENBQUMsT0FBTyxhQUFhO0FBQUE7QUFHM0YsWUFBTSxjQUFjLElBQUksTUFBTSxNQUFNLElBQUksSUFBSSxDQUFDO0FBQzdDLFlBQU0sYUFBd0MsQ0FBQztBQUMvQyxpQkFBVyxRQUFRLENBQUMsYUFBYTtBQUcvQixjQUFNLGdCQUFnQixJQUFJLE1BQU0sTUFBTSxlQUFlLElBQUksQ0FBQztBQUMxRCxzQkFBYyxVQUFVLGNBQWMsUUFBUTtBQUM5QyxtQkFBVyxLQUFLLGFBQWE7QUFFN0IsY0FBTSxlQUFlLEtBQUssY0FBYyxRQUFRO0FBRWhELGNBQU0sRUFBRSxXQUFXLFVBQVUsTUFBTSxPQUFPLE1BQU0sSUFDOUMsZUFBZSxZQUFZO0FBRTdCLGNBQU0sUUFBUSxJQUFJLE1BQU0sTUFBTSxTQUFTLFFBQVEsQ0FBQztBQUNoRCxjQUFNLE9BQU8sR0FBRyxRQUFRLFNBQVMsR0FBRyxRQUFRLElBQUksS0FBSyxNQUFNLEVBQUUsR0FDM0QsUUFBUSxJQUFJLEtBQUssTUFBTSxFQUN6QjtBQUVBLGNBQU0sVUFBVSxPQUFPLFFBQVE7QUFDL0IsUUFBQyxNQUFjLE1BQU0sQ0FBQyxZQUFZO0FBQ2xDLG1CQUFXLEtBQUssS0FBSztBQUVyQixjQUFNLGNBQWMsSUFBSSxNQUFNLE1BQU0sZUFBZSxJQUFJLENBQUM7QUFDeEQsb0JBQVksVUFBVTtBQUN0QixtQkFBVyxLQUFLLFdBQVc7QUFBQSxNQUM3QixDQUFDO0FBQ0QsWUFBTSxTQUFTLElBQUksTUFBTSxNQUFNLGVBQWUsSUFBSSxDQUFDO0FBQ25ELGFBQU8sVUFBVTtBQUNqQixpQkFBVyxLQUFLLE1BQU07QUFFdEIsWUFBTSxPQUFPLE9BQU8sUUFBUSxHQUFHLEdBQUcsR0FBRyxVQUFVO0FBSy9DLGFBQU87QUFBQSxJQUNULENBQUM7QUFBQSxFQUNILENBQUM7QUFDSDtBQUVBLFNBQVMsb0JBQW9CLE9BQWUsU0FBaUIsSUFBWTtBQUV2RSxRQUFNLE9BQU8sT0FBTyxXQUFXLFFBQVEsRUFBRSxPQUFPLEtBQUssRUFBRSxPQUFPLEtBQUs7QUFHbkUsU0FBTyxPQUFPLFNBQVMsTUFBTSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsTUFBTSxHQUFHLE1BQU07QUFDL0Q7OztBQzVJQSxTQUFTLGdCQUFBQyxxQkFBb0I7QUFJdEIsSUFBTSxLQUFLQyxjQUFhO0FBQUEsRUFDN0IsYUFBYTtBQUFBLEVBQ2IsTUFBTTtBQUFBLEVBQ04sYUFBYTtBQUFBLElBQ1gscUJBQXFCO0FBQUEsSUFDckIscUJBQXFCO0FBQUEsSUFDckIsV0FBVztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBLFVBQVU7QUFBQSxNQUNSLFNBQ0U7QUFBQSxNQUNGLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixXQUFXLHdCQUFvQixvQkFBSSxLQUFLLEdBQUUsWUFBWSxDQUFDO0FBQUEsTUFDdkQsU0FBUztBQUFBLElBQ1g7QUFBQSxJQUNBLGVBQWU7QUFBQSxJQUNmLGFBQWE7QUFBQSxNQUNYLGVBQWU7QUFBQSxRQUNiLFdBQVc7QUFBQSxRQUNYLFdBQVc7QUFBQSxNQUNiO0FBQUEsTUFDQSxNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0Esc0JBQXNCO0FBQUEsSUFDdEIsS0FBS0MsS0FBSTtBQUFBLElBRVQsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLGtCQUFrQjtBQUFBLElBRWxCLFNBQVM7QUFBQSxNQUNQLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLE9BQU9DLG1CQUFrQixFQUFFO0FBQUEsTUFDbkUsZ0JBQWdCLEVBQUUsTUFBTSxnQkFBZ0IsT0FBTyxrQkFBa0IsRUFBRTtBQUFBLE1BQ25FLFdBQVcsRUFBRSxNQUFNLFdBQVcsT0FBT0MsY0FBYSxFQUFFO0FBQUEsSUFDdEQ7QUFBQSxJQUNBLGtCQUFrQjtBQUFBLEVBQ3BCO0FBQ0YsQ0FBQztBQUVELFNBQVNBLGdCQUEyQztBQUNsRCxTQUFPO0FBQUEsSUFDTDtBQUFBLE1BQ0UsV0FBVztBQUFBLE1BQ1gsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0w7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBLEVBQUUsTUFBTSw0QkFBNEIsTUFBTSwyQkFBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BT25EO0FBQUEsSUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBaURGO0FBQ0Y7QUFFQSxTQUFTRCxxQkFBZ0Q7QUFDdkQsU0FBTztBQUFBLElBQ0w7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFDRjtBQUVBLFNBQVMsb0JBQWdEO0FBQ3ZELFNBQU87QUFBQSxJQUNMO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTDtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFLFdBQVc7QUFBQSxNQUNYLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsV0FBVztBQUFBLE1BQ1gsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0w7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQUVBLFNBQVNELE9BQThCO0FBQ3JDLFNBQU87QUFBQSxJQUNMO0FBQUEsTUFDRSxhQUFhO0FBQUEsTUFDYixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTDtBQUFBLFVBQ0UsYUFBYTtBQUFBLFVBQ2IsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxhQUFhO0FBQUEsVUFDYixNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE9BQU87QUFBQSxZQUNMO0FBQUEsY0FDRSxNQUFNO0FBQUEsY0FDTixNQUFNO0FBQUEsWUFDUjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTDtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFlBQ0w7QUFBQSxjQUNFLE1BQU07QUFBQSxjQUNOLE1BQU07QUFBQSxZQUNSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFhRjtBQUFBLFFBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQVVGO0FBQUEsSUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQTBDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7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LFVBQ0wsTUFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsTUFDQSxJQUFJO0FBQUEsTUFDSixNQUFNO0FBQUEsTUFDTixZQUFZO0FBQUEsTUFDWixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0EsUUFBUSxRQUFRLFFBQVEsSUFBSSxHQUFHLGlCQUFpQjtBQUFBLElBQ2hELGNBQWM7QUFBQSxJQUNkLFNBQVM7QUFBQSxNQUNQLGNBQWMsQ0FBQywwQ0FBMEM7QUFBQSxNQUN6RCwrQkFBK0IsSUFBSSxPQUFPO0FBQUEsSUFDNUM7QUFBQSxFQUNGO0FBQ0Y7OztBSHBLQSxJQUFPLGdCQUFRO0FBQUEsRUFDYixzQkFBc0I7QUFBQSxJQUNwQixHQUFHO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUEsUUFDRixPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixHQUFHO0FBQUEsTUFDTDtBQUFBLE1BQ0EsTUFBTTtBQUFBLFFBQ0osT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sR0FBRztBQUFBLE1BQ0w7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDO0FBQ0g7IiwKICAibmFtZXMiOiBbImRlZmluZUNvbmZpZyIsICJkZWZpbmVDb25maWciLCAiZGVmaW5lQ29uZmlnIiwgIm5hdiIsICJzaWRlYmFyQ29tbWVyY2lhbCIsICJzaWRlYmFyR3VpZGUiLCAiZGVmaW5lQ29uZmlnIl0KfQo=
