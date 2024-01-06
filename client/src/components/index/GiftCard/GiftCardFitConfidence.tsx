import { CFlex, CIcon } from "@chakra-ui/vue-next";
import { type PropType, defineComponent } from "vue";
import type { Gift } from "~/components/index/GiftCard/types";

export const GiftCardFitConfidence = defineComponent({
	props: {
		gift: {
			type: Object as PropType<Gift>,
			required: true,
		},
	},
	setup(props) {
		function getStarProps(starNumber: number) {
			const score = props.gift.fit_confidence * 5;
			const starColor = "#22d3ee";

			if (starNumber <= Math.floor(score)) {
				return {
					name: "md-star-filled",
					color: starColor,
				};
			} else if (starNumber === Math.ceil(score) && starNumber - score < 1) {
				return {
					name: "md-star-filled-half",
					color: starColor,
				};
			} else {
				return {
					name: "md-star",
					color: "gray.300",
				};
			}
		}
		return () => (
			<CFlex gap="0">
				{[1, 2, 3, 4, 5].map((index) => (
					<CIcon
						key={index}
						name={getStarProps(index).name}
						color={getStarProps(index).color}
						boxSize="6"
					/>
				))}
			</CFlex>
		);
	},
});
