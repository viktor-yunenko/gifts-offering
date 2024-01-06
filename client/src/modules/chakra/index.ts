import type { ThemeOverride } from "@chakra-ui/theme-utils";
import { extendTheme } from "@chakra-ui/vue-next";
import BiCircleFill from "@iconify-icons/bi/circle-fill";
import BiGfit from "@iconify-icons/bi/gift";
import MdStar from "@iconify-icons/line-md/star";
import MdStarFilled from "@iconify-icons/line-md/star-filled";
import MdStarFilledHalf from "@iconify-icons/line-md/star-filled-half";
import type { IconifyIcon } from "@iconify/types";
import { defaultIconProps } from "@iconify/utils";
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
					...getIconifyProps("bi-circle-fill", BiCircleFill),
					...getIconifyProps("md-star", MdStar),
					...getIconifyProps("md-star-filled", MdStarFilled),
					...getIconifyProps("md-star-filled-half", MdStarFilledHalf),
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
			extendTheme: extendTheme(theme),
		});
	},
});

const theme = {
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
	semanticTokens: {
		colors: {
			primary: "fuchsia.500",
			secondary: "cyan.500",
		},
	},
	shadows: {
		// tailwind shadows
		base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);",
		sm: "0 1px 2px 0 rgb(0 0 0 / 0.05);",
		md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);",
		lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);",
		xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);",
		"2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25);",
		inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05);",
		none: "0 0 #0000;",
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
} as ThemeOverride;

function getIconifyProps(name: string, icon: IconifyIcon) {
	const iconComplete = {
		path: icon.body,
		...defaultIconProps,
	};
	return {
		[name]: {
			path: icon.body,
			viewBox: `${iconComplete.left} ${iconComplete.top} ${iconComplete.width} ${iconComplete.height}`,
		},
	};
}
