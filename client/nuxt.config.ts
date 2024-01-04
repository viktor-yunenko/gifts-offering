export default defineNuxtConfig({
	modules: ["~/modules/apollo", "~/modules/chakra", "@nuxt/ui"],
	ssr: false,
	devtools: { enabled: true },
	srcDir: "src/",
	imports: {
		autoImport: false,
	},
	alias: {
		"#graphql": "../graphql/",
	},
});
