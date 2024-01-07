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
import tailwindColors from "tailwindcss/colors";

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
		...tailwindColors,
		gray: tailwindColors.slate,
		fuchsia: {
			50: "#eff6ff",
			100: "#dbeafe",
			200: "#bfdbfe",
			300: "#93c5fd",
			400: "#60a5fa",
			500: "#3b82f6",
			600: "#2563eb",
			700: "#1d4ed8",
			800: "#1e40af",
			900: "#1e3a8a",
			950: "#172554",
		},
		cyan: {
			"50": "#f0fdfa",
			"100": "#ccfbf1",
			"200": "#99f6e4",
			"300": "#5eead4",
			"400": "#2dd4bf",
			"500": "#14b8a6",
			"600": "#0d9488",
			"700": "#0f766e",
			"800": "#115e59",
			"900": "#134e4a",
			"950": "#042f2e",
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
		},
	};
}
