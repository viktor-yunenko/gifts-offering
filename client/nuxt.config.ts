export default defineNuxtConfig({
	modules: ["@chakra-ui/nuxt-next", "@nuxtjs/apollo"],
	ssr: false,
	devtools: { enabled: true },
	srcDir: "src/",
	imports: {
		autoImport: false,
	},
	alias: {
		"#graphql": "../graphql/",
	},
	apollo: {
		clients: {
			default: {
				httpEndpoint: "http://localhost:8000/api/graphql",
				httpLinkOptions: {
					fetch: fetchWithReadableUrl,
					credentials: "include",
				},
			},
		},
		autoImports: false,
	},
	chakra: {
		extendTheme: {
			config: {
				useSystemColorMode: true,
			},
		},
	},
});

/**
 * Make the url readable in the Network Manager and Sentry logs
 * instead of `/api/graphql/` it will be `/api/graphql/operationName?variables=...`
 */
export function fetchWithReadableUrl(uri: string, options: RequestInit) {
	const bodyString = typeof options?.body === "string" ? options.body : "";
	const body = JSON.parse(bodyString);
	if (body.operationName) {
		// biome-ignore lint/style/noParameterAssign:
		uri += `/${body.operationName}`;

		if (Object.keys(body.variables ?? {}).length) {
			const variablesSerialized = structuredClone(body.variables);
			for (const [varKey, varValue] of Object.entries(variablesSerialized)) {
				// if User sends an email, then the `bodyHtml` will exceed the browser param limit
				// and it'll throw a CORS error
				const queryParamSoftLimit = 35;
				if (String(varValue).length > queryParamSoftLimit) {
					variablesSerialized[varKey] = `${String(varValue).slice(
						0,
						queryParamSoftLimit,
					)}...`;
				}
			}
			const searchParams = new URLSearchParams(variablesSerialized);
			// biome-ignore lint/style/noParameterAssign:
			uri += `?${searchParams.toString()}`;
		}
	}
	options.credentials = "include";
	return fetch(uri, options);
}
