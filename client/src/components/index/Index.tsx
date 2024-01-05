import { CFlex } from "@chakra-ui/vue-next";
import { useQuery } from "@vue/apollo-composable";
import { defineComponent } from "vue";
import { GiftCard } from "~/components/index/GiftCard/GiftCard";
import { gql } from "#graphql";

export const Index = defineComponent({
	setup() {
		const { result: giftsResult } = useQuery(GIFTS_QUERY);
		return () => (
			<CFlex gap="10" direction="column">
				{giftsResult.value?.gifts.map((gift) => (
					<GiftCard gift={gift} key={gift.id} />
				))}
			</CFlex>
		);
	},
});

export const GIFTS_QUERY = gql(`
	query Gifts {
		gifts {
			id
			name
			image_card {
				path
				url
			}
			description_short
			points
			fit_confidence
			order {
				id
				status
			}
		}
	}
`);
