import type { ThemeOverride } from "@chakra-ui/theme-utils";
import { extendTheme } from "@chakra-ui/vue-next";
import BiGfit from "@iconify-icons/bi/gift";
import type { IconifyIcon } from "@iconify/types";
import { defineNuxtModule, installModule } from "@nuxt/kit";
import type { ModuleOptions } from "@nuxt/schema";
import {
	feChevronDown,
	feChevronUp,
	feExternalLink,
	feList,
	feMinus,
	fePlus,
	feX,
} from "feather-icons-paths";

export default defineNuxtModule<ModuleOptions>({
	async setup(options, nuxt) {
		await installModule("@chakra-ui/nuxt-next", {
			icons: {
				extend: {
					...getIconifyProps("bi-gift", BiGfit),
				},
				library: {
					feX,
					feChevronDown,
					feChevronUp,
					feExternalLink,
					fePlus,
					feMinus,
					feList,
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
					cyan: {
						50: "#ecfeff",
						100: "#cffafe",
						200: "#a5f3fc",
						300: "#67e8f9",
						400: "#22d3ee",
						500: "#06b6d4",
						600: "#0891b2",
						700: "#0e7490",
						800: "#155e75",
						900: "#164e63",
						950: "#083344",
					},
					indigo: {
						50: "#eef2ff",
						100: "#e0e7ff",
						200: "#c7d2fe",
						300: "#a5b4fc",
						400: "#818cf8",
						500: "#6366f1",
						600: "#4f46e5",
						700: "#4338ca",
						800: "#3730a3",
						900: "#312e81",
						950: "#1e1b4b",
					},
					violet: {
						50: "#f5f3ff",
						100: "#ede9fe",
						200: "#ddd6fe",
						300: "#c4b5fd",
						400: "#a78bfa",
						500: "#8b5cf6",
						600: "#7c3aed",
						700: "#6d28d9",
						800: "#5b21b6",
						900: "#4c1d95",
						950: "#2e1065",
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
			viewBox: `${icon.left ?? "none"} ${icon.top ?? "none"} ${
				icon.width ?? "none"
			} ${icon.height ?? "none"}`,
		},
	};
}
