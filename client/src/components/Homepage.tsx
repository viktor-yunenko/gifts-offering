import { CButton } from "@chakra-ui/c-button";
import { CAlert, CBox, CHeading, CImage, CVStack } from "@chakra-ui/vue-next";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { marked } from "marked";
import { defineComponent } from "vue";
import { useAuth } from "~/composables/useAuth";
import { gql } from "#graphql";
import { useLoadingIndicator } from "#imports";

export const Homepage = defineComponent({
	setup() {
		const auth = useAuth();
		const loadingIndicator = useLoadingIndicator();
		const { result, error, loading, refetch } = useQuery(GIFTS_QUERY);
		const { mutate: createGiftOrder } = useMutation(GIFT_ORDER_CREATE);

		async function onGiftOrderCreateClick(giftId: string) {
			loadingIndicator.start();
			await createGiftOrder({
				giftId,
				// biome-ignore lint/style/noNonNullAssertion:
				userId: auth?.user()?.id!,
			});
			refetch();
			loadingIndicator.finish();
		}

		return () => (
			<CBox>
				<CVStack gap="10">
					{result.value?.gifts.map((gift) => (
						<CBox key={gift.id + gift.is_accepted}>
							<CHeading size="md">{gift.name}</CHeading>
							<CBox
								innerHTML={marked.parse(gift.description_short) as string}
							/>
							<CBox>{gift.points}</CBox>
							<CBox>{gift.fit_confidence}</CBox>
							<CImage src={`http://localhost:8000${gift.image_card.url}`} />
							<CButton
								onClick={() => onGiftOrderCreateClick(gift.id)}
								loading={loadingIndicator.isLoading}
							>
								Accept it!
							</CButton>
							{gift.is_accepted && <CAlert type="success">Accepted!</CAlert>}
						</CBox>
					))}
				</CVStack>
			</CBox>
		);
	},
});

const GIFTS_QUERY = gql(`
	query Gifts {
		gifts {
			id
			name
			image_card {
				path
				url
			}
			image_card_url
			description_short
			points
			fit_confidence
			is_accepted
		}
	}
`);

const GIFT_ORDER_CREATE = gql(`
	mutation GiftOrder($giftId: ID!, $userId: ID!) {
    gift_order_create(data: { gift: { set: $giftId }, user: { set: $userId } }) {
      id
    }
  }
`);
