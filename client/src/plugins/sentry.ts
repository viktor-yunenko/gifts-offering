import {
	Replay,
	attachErrorHandler,
	createTracingMixins,
	getCurrentHub,
	init,
} from "@sentry/vue";
import { ref } from "vue";
import { useAuth } from "~/composables/useAuth";
import { defineNuxtPlugin } from "#app";

/**
 * copy of https://github.com/nuxt-community/sentry-module/issues/358#issuecomment-1016983543
 */
export default defineNuxtPlugin(async (nuxtApp) => {
	if (nuxtApp.$config.public.env !== "dev") {
		init({
			app: [nuxtApp.vueApp],
			dsn: "",
			tracesSampleRate: 1.0,
			release: "gifts@0.1.0.0",
			replaysSessionSampleRate: 1.0,
			replaysOnErrorSampleRate: 1.0,
			integrations: [],
			environment: (nuxtApp.$config.public.env as string) ?? "prod",
		});

		nuxtApp.vueApp.mixin(
			createTracingMixins({
				trackComponents: true,
				timeout: 2000,
				hooks: ["activate", "mount", "update"],
			}),
		);
		attachErrorHandler(nuxtApp.vueApp, {
			logErrors: false,
			attachProps: true,
			trackComponents: true,
			timeout: 2000,
			hooks: ["activate", "mount", "update"],
		});

		const auth = useAuth();
		try {
			auth.onResult(() => {
				if (isReplayInitialized.value) {
					return;
				}

				const hub = getCurrentHub();
				const client = hub.getClient()!;
				client.addIntegration?.(
					new Replay({
						maskAllInputs: false,
						maskAllText: false,
						blockAllMedia: false,
						networkDetailAllowUrls: [nuxtApp.$config.public.serverUrl],
					}),
				);
				isReplayInitialized.value = true;
			});
		} catch {
			// ignore
		}
	}
});

const isReplayInitialized = ref(false);
