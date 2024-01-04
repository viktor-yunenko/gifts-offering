import type { ThemeOverride } from "@chakra-ui/theme-utils";
import { extendTheme } from "@chakra-ui/vue-next";
import type { IconifyIcon } from "@iconify/types";
import { defineNuxtModule, installModule } from "@nuxt/kit";
import type { ModuleOptions } from "@nuxt/schema";

export default defineNuxtModule<ModuleOptions>({
	async setup(options, nuxt) {
		await installModule("@chakra-ui/nuxt-next", {
			icons: {
				extend: {
					...getIconifyProps("bi-gift", await import("@iconify-icons/bi/gift")),
				},
			},
			extendTheme: extendTheme({
				config: {
					cssVarPrefix: "chakra",
				},
				components: {
					Button: {
						defaultProps: {
							colorScheme: "fuchsia",
						},
					},
				},

				colors: {
					gray: {
						50: "#f8fafc",
						100: "#f1f5f9",
						200: "#e2e8f0",
						300: "#cbd5e1",
						400: "#94a3b8",
						500: "#64748b",
						600: "#475569",
						700: "#334155",
						800: "#1e293b",
						900: "#0f172a",
						// @ts-ignore
						950: "#020617",
					},
					purple: {
						50: "#faf5ff",
						100: "#f3e8ff",
						200: "#e9d5ff",
						300: "#d8b4fe",
						400: "#c084fc",
						500: "#a855f7",
						600: "#9333ea",
						700: "#7e22ce",
						800: "#6b21a8",
						900: "#581c87",
					},
					fuchsia: {
						50: "#fdf4ff",
						100: "#fae8ff",
						200: "#f5d0fe",
						300: "#f0abfc",
						400: "#e879f9",
						500: "#d946ef",
						600: "#c026d3",
						700: "#a21caf",
						800: "#86198f",
						900: "#701a75",
						950: "#4a044e",
					},
				},
			} as ThemeOverride),
		});
	},
});

function getIconifyProps(name: string, icon: IconifyIcon) {
	return {
		[name]: {
			path: icon.body,
			viewBox: `${icon.left} ${icon.top} ${icon.width} ${icon.height}`,
		},
	};
}
