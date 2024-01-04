export default defineNuxtConfig({
	modules: ["~/modules/apollo", "~/modules/chakra"],
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
