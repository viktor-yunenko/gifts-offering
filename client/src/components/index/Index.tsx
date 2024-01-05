import { CFlex } from "@chakra-ui/vue-next";
import { useQuery } from "@vue/apollo-composable";
import { defineComponent } from "vue";
import { GIFTS_QUERY } from "~/appQueries";
import { GiftCard } from "~/components/index/GiftCard/GiftCard";

export const Index = defineComponent({
	setup() {
		const { result: giftsResult } = useQuery(GIFTS_QUERY);
		return () => (
			<CFlex gap="5" direction="column">
				{giftsResult.value?.gifts.map((gift) => (
					<GiftCard gift={gift} key={gift.id} />
				))}
			</CFlex>
		);
	},
});
