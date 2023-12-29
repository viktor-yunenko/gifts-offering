export default defineNuxtConfig({
	modules: ["@nuxtjs/supabase", "@chakra-ui/nuxt-next"],
	ssr: false,
	devtools: { enabled: true },
	srcDir: "src/",
	imports: {
		autoImport: false,
	},
});
