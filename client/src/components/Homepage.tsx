import { CButton } from "@chakra-ui/c-button";
import { CAlert, CBox, CHeading, CImage, CVStack } from "@chakra-ui/vue-next";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { marked } from "marked";
import { defineComponent } from "vue";
import { gql } from "#graphql";
import { OrderStatus } from "#graphql/graphql";
import { useLoadingIndicator } from "#imports";

export const Homepage = defineComponent({
	setup() {
		const loadingIndicator = useLoadingIndicator();
		const { result } = useQuery(GIFTS_QUERY);
		const { mutate: submitGiftOrder } = useMutation(GIFT_ORDER_SUBMIT, {
			refetchQueries: () => [{ query: GIFTS_QUERY }],
		});
		const { mutate: withdrawGiftOrder } = useMutation(GIFT_ORDER_WITHDRAW, {
			refetchQueries: () => [{ query: GIFTS_QUERY }],
		});

		async function onGiftOrderSubmit(giftId: string) {
			loadingIndicator.start();
			await submitGiftOrder({ giftId });
			loadingIndicator.finish();
		}

		async function onGiftOrderWithdraw(giftId: string) {
			loadingIndicator.start();
			await withdrawGiftOrder({ giftId });
			loadingIndicator.finish();
		}

		return () => (
			<CBox>
				<CVStack gap="10">
					{result.value?.gifts.map((gift) => (
						<CBox key={`${gift.id}-${gift.order?.status}`}>
							<CHeading size="md">{gift.name}</CHeading>
							<CBox
								innerHTML={marked.parse(gift.description_short) as string}
							/>
							<CBox>{gift.points}</CBox>
							<CBox>{gift.fit_confidence}</CBox>
							<CImage src={`http://localhost:8000${gift.image_card.url}`} />
							{gift.order?.status !== OrderStatus.Pending && (
								<CButton
									onClick={() => onGiftOrderSubmit(gift.id)}
									loading={loadingIndicator.isLoading}
								>
									Yup, it's a good one
								</CButton>
							)}
							{gift.order?.status === OrderStatus.Pending && (
								<CButton
									onClick={() => onGiftOrderWithdraw(gift.id)}
									loading={loadingIndicator.isLoading}
								>
									Maybe nah
								</CButton>
							)}
							{gift.order?.status === OrderStatus.Pending && (
								<CAlert type="success">
									I'll reach out with a confirmation soon!
								</CAlert>
							)}
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

const GIFT_ORDER_SUBMIT = gql(`
	mutation GiftOrderSubmit($giftId: ID!) {
    gift_order_submit(gift_id: $giftId) {
      id
    }
  }
`);

const GIFT_ORDER_WITHDRAW = gql(`
	mutation GiftOrderWithdraw($giftId: ID!) {
    gift_order_withdraw(gift_id: $giftId) {
      id
    }
  }
`);
