import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  target: "static",

  server: {
    port: 3000,
    host: "0.0.0.0",
    timing: false,
  },

  app: {
    baseURL: "/",
    head: {
      title: "C-LINK BY CLINAG",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "CLINAG" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700",
        },
        {
          rel: "stylesheet",
          href: "https://use.fontawesome.com/releases/v5.6.3/css/all.css",
          integrity:
            "sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/",
          crossorigin: "anonymous",
        },
      ],
    },
  },

  router: {
    options: { linkExactActiveClass: "active" },
  },

  runtimeConfig: {
    public: {
      VUE_APP_AUTH_CLIENT_ID: process.env.VUE_APP_AUTH_CLIENT_ID || "",
      VUE_APP_AUTH_CLIENT_SECRET: process.env.VUE_APP_AUTH_CLIENT_SECRET || "",
      VUE_APP_STAT_APP_URL: process.env.VUE_APP_STAT_APP_URL || "",
    },
  },

  css: [
    "assets/css/nucleo/css/nucleo.css",
    "assets/css/font-awesome/css/font-awesome.css",
    "assets/sass/argon.scss",
    "assets/css/style.css",
  ],

  plugins: [
    "~/plugins/dashboard/dashboard-plugin",
    { src: "~/plugins/axios.ts", mode: "client" },
    { src: "~/plugins/dashboard/full-calendar.ts", mode: "client" },
    { src: "~/plugins/dashboard/world-map.ts", mode: "client" },
    { src: "~/plugins/element-plus.ts", mode: "client" },
    { src: "~/plugins/vue-sweetalert2.ts", mode: "client" },
  ],

  modules: [
    "@nuxtjs-alt/axios",
    "@vite-pwa/nuxt",
    // "vue-sweetalert2/nuxt",
    "@pinia/nuxt",
  ],

  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "C-LINK BY CLINAG",
      short_name: "C-LINK",
      description: "CLINAG",
      theme_color: "#ffffff",
      icons: [
        {
          src: "/favicon.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
  },

  build: {
    transpile: ["vee-validate/dist/rules"],
    loaders: {
      scss: {
        implementation: require("sass"), // Ensure Nuxt uses the correct SCSS compiler
      },
    },
    babel: {
      plugins: [
        [
          "component",
          {
            libraryName: "element-ui",
            styleLibraryName: "theme-chalk",
          },
        ],
      ],
    },
  },

  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
});
