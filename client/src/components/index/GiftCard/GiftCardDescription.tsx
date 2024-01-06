import { CBox, useTheme } from "@chakra-ui/vue-next";
import { marked } from "marked";
import { OrderStatus } from "#graphql/graphql";

import { type PropType, computed, defineComponent } from "vue";
import type { Gift } from "~/components/index/GiftCard/types";

export const GiftCardDescription = defineComponent({
	props: {
		gift: {
			type: Object as PropType<Gift>,
			required: true,
		},
	},
	setup(props) {
		const theme = useTheme();

		const isOrderPending = computed(() => {
			return props.gift.order?.status === OrderStatus.Submitted;
		});

		const listStyleFill = computed(() => {
			// @ts-ignore
			const listStylePrimary = theme.colors.fuchsia[500];
			// @ts-ignore
			const listStyleSecondary = theme.colors.cyan[500];

			return isOrderPending.value
				? listStyleSecondary.replace("#", "%23")
				: listStylePrimary.replace("#", "%23");
		});

		return () => (
			<CBox
				innerHTML={marked.parse(props.gift.description_short) as string}
				sx={{
					ul: {
						listStyleImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 22 22" fill="${listStyleFill.value}"><circle cx="8" cy="8" r="8"/></svg>')`,
						ml: 5,
					},
					i: {
						fontStyle: "italic",
					},
					strong: {
						fontWeight: "bold",
					},
				}}
			/>
		);
	},
});
