export default defineNuxtConfig({
	modules: ["~/modules/apollo", "@nuxt/ui"],
	ssr: false,
	devtools: { enabled: true },
	runtimeConfig: {
		public: {
			serverUrl: process.env.SERVER_URL ?? "http://localhost:8000",
		},
	},
	srcDir: "src/",
	imports: {
		autoImport: false,
	},
	alias: {
		"#graphql": "../graphql/",
	},
});
