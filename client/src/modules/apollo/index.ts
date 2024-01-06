import { defineNuxtModule, installModule } from "@nuxt/kit";
import type { ModuleOptions } from "@nuxt/schema";

export default defineNuxtModule<ModuleOptions>({
	async setup(options, nuxt) {
		await installModule("@nuxtjs/apollo", {
			clients: {
				default: {
					httpEndpoint: `${nuxt.options.runtimeConfig?.public?.serverUrl}/api/graphql`,
					httpLinkOptions: {
						fetch: fetchWithReadableUrl,
						credentials: "include",
					},
				},
			},
			autoImports: false,
		});
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
