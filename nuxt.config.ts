// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@nuxtjs/tailwindcss", "nuxt-primevue", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
    primevue: {
        cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
        components: {
            exclude: ["Editor", "Chart"],
        },
    },
    css: ["primevue/resources/themes/lara-light-purple/theme.css", "remixicon/fonts/remixicon.css"],
})
