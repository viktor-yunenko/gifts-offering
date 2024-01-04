import { CBox } from "@chakra-ui/vue-next";
import { vueThemingProps } from "@chakra-ui/vue-utils";
import { css } from "@emotion/css";
import { defineComponent } from "vue";

export const CSkeleton = defineComponent({
	name: "YourComponent",
	props: {
		...vueThemingProps,
	},
	setup(props) {
		const skeletonStyle = css`
      @keyframes blink {
        0% {
          background-color: var(--chakra-colors-gray-300);
        }
        50% {
          background-color: var(--chakra-colors-gray-50);
        }
        100% {
          background-color: var(--chakra-colors-gray-300);
        }
      }
      border-radius: var(--chakra-radii-md);
      border-color: var(--chakra-colors-gray-100);
      background: padding-box var(--chakra-colors-gray-300);
      animation: blink normal 1s infinite linear;
    `;

		return () => <CBox class={`chakra-skeleton ${skeletonStyle}`} {...props} />;
	},
});
