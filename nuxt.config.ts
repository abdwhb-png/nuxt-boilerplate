// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

const isProduction = process.env.NODE_ENV === "production";
const appName = process.env.NUXT_PUBLIC_APP_NAME || "Nuxt 3 Starter";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: !isProduction },

  $development: {
    devServer: {
      host: "localhost",
      port: 3000,
    },
  },

  runtimeConfig: {
    public: {
      appName: appName,
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:8000/api",
    },
  },

  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@pinia/nuxt",
    "nuxt-i18n-micro",
    "nuxt-auth-sanctum",
    "shadcn-nuxt",
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  css: [
    "~/assets/css/tailwind.css",
    "~/assets/css/nuxtui.css",
    "~/assets/css/app.css",
  ],

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: appName,
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "A Nuxt 3 starter with Tailwind CSS. This starter uses Nuxt 4 directory structure with compability version 4.",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  i18n: {
    defaultLocale: "en",
    baseUrl: process.env.NUXT_PUBLIC_APP_URL || "http://localhost:3000",
    locales: [
      { code: "en", iso: "en-US", dir: "ltr" },
      { code: "fr", iso: "fr-FR", dir: "ltr" },
    ],
    translationDir: "i18n/locales", // Directory where translations are stored
    meta: true, // Automatically generate SEO-related meta tags like `alternate`
    autoDetectLanguage: true, // Automatically detect and use the user's preferred language
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },

  sanctum: {
    // baseUrl: "http://localhost:80",
    mode: "cookie",
    csrf: {
      cookie: "XSRF-TOKEN",
      header: "X-XSRF-TOKEN",
    },
  },
});
