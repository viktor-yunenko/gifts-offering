import { CFlex, CHeading } from "@chakra-ui/vue-next";
import type { PropType } from "vue";
import { computed, defineComponent } from "vue";
import { GiftCardActions } from "~/components/index/GiftCard/GiftCardActions/GiftCardActions";
import { GiftCardDescription } from "~/components/index/GiftCard/GiftCardDescription";
import { GiftCardFitConfidence } from "~/components/index/GiftCard/GiftCardFitConfidence";
import { GiftCardImages } from "~/components/index/GiftCard/GiftCardImages";
import type { Gift } from "~/components/index/GiftCard/types";
import { OrderStatus } from "#graphql/graphql";

export const GiftCard = defineComponent({
	props: {
		gift: {
			type: Object as PropType<Gift>,
			required: true,
		},
	},
	setup(props: { gift: Gift }) {
		const isOrderPending = computed(() => {
			return props.gift.order?.status === OrderStatus.Submitted;
		});

		const style = {
			spacing: 6,
		};

		return () => (
			<CFlex
				direction="column"
				gap={style.spacing / 2}
				w="100%"
				bg="white"
				p={style.spacing}
				borderRadius="md"
				boxShadow="md"
			>
				<CHeading
					size="md"
					color={isOrderPending.value ? "gray.600" : "fuchsia.600"}
				>
					{props.gift.name}
				</CHeading>

				<GiftCardFitConfidence gift={props.gift} />

				<GiftCardImages gift={props.gift} />

				<GiftCardDescription gift={props.gift} />

				<GiftCardActions gift={props.gift} />
			</CFlex>
		);
	},
});
