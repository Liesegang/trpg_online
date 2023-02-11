export default {
  // SPAのみ対応
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // デフォルトのソース管理を src/ に変更
  srcDir: "src/",

  // エントリーファイルindex.htmlの代わり
  head: {
    title: "try-vue-to-nuxt-todo",
    htmlAttrs: {
      lang: "ja",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  buildModules: [
    "@nuxtjs/eslint-module",
    "@nuxt/typescript-build",

    // Vue.js で使用した router の使い回し
    ["@nuxtjs/router", { fileName: "router/index.ts" }],
  ],
};