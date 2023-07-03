// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: "sprint.wav",
          // chunkFileNames: "[name].[ext]",
          // entryFileNames: "[name].[ext]",
        },
      },
    },
  },
});
