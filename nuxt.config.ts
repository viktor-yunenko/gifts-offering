export default defineNuxtConfig({
	modules: ["@nuxtjs/supabase", "@chakra-ui/nuxt-next", "@nuxtjs/apollo"],
	ssr: false,
	devtools: { enabled: true },
	srcDir: "src/",
	imports: {
		autoImport: false,
	},
	alias: {
		"#graphql": "../graphql/",
		"#supabase": "../supabase/",
	},
	apollo: {
		clients: {
			default: {
				httpEndpoint: "http://127.0.0.1:54321/graphql/v1",
			},
		},
		autoImports: false,
	},
});
