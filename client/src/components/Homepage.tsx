import { CButton } from "@chakra-ui/c-button";
import {
	CBox,
	CFlex,
	CHeading,
	CIcon,
	CImage,
	CVStack,
} from "@chakra-ui/vue-next";
import { captureException } from "@sentry/vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { marked } from "marked";
import { defineComponent } from "vue";
import { USER_QUERY } from "~/composables/useAuth";
import { gql } from "#graphql";
import { type GiftsQuery, OrderStatus } from "#graphql/graphql";
import { useLoadingIndicator, useNotify } from "#imports";

export const Homepage = defineComponent({
	setup() {
		const loadingIndicator = useLoadingIndicator();
		const notify = useNotify();

		const { result: giftsResult } = useQuery(GIFTS_QUERY);
		const refetchQueries = () => [
			{ query: GIFTS_QUERY },
			{ query: USER_QUERY },
		];
		const { mutate: submitGiftOrder } = useMutation(GIFT_ORDER_SUBMIT, {
			refetchQueries,
		});
		const { mutate: withdrawGiftOrder } = useMutation(GIFT_ORDER_WITHDRAW, {
			refetchQueries,
		});

		async function onGiftOrderRequest(
			giftId: string,
			request: "submit" | "withdraw",
		) {
			loadingIndicator.start();
			try {
				if (request === "submit") {
					await submitGiftOrder({ giftId });
				} else {
					await withdrawGiftOrder({ giftId });
				}
			} catch (error) {
				// @ts-ignore
				notify.error(error?.message ?? "error");
				captureException(error);
			}
			loadingIndicator.finish();
		}

		const isOrderPending = (gift: GiftsQuery["gifts"][number]) =>
			gift.order?.status === OrderStatus.Pending;

		return () => (
			<CBox>
				<CFlex gap="10">
					{giftsResult.value?.gifts.map((gift) => (
						<CVStack key={`${gift.id}-${gift.order?.status}`} gap="3">
							<CHeading size="md">{gift.name}</CHeading>
							<CBox
								innerHTML={marked.parse(gift.description_short) as string}
							/>
							<CBox>{gift.points}</CBox>
							<CBox>{gift.fit_confidence}</CBox>
							<CImage
								src={`http://localhost:8000${gift.image_card.url}`}
								maxH="200px"
								maxW="fit-content"
							/>

							<CFlex
								justify={isOrderPending(gift) ? "space-between" : "flex-end"}
								w="100%"
							>
								{isOrderPending(gift) && <CIcon name="check" />}
								<CFlex justifyItems="flex-end" gap="3">
									{!isOrderPending(gift) && (
										<CButton
											onClick={() => onGiftOrderRequest(gift.id, "submit")}
											loading={loadingIndicator.isLoading}
										>
											Yup, it's a good one
										</CButton>
									)}
									{isOrderPending(gift) && (
										<CButton
											onClick={() => onGiftOrderRequest(gift.id, "withdraw")}
											loading={loadingIndicator.isLoading}
											variant="outline"
										>
											Maybe nah
										</CButton>
									)}
								</CFlex>
							</CFlex>
						</CVStack>
					))}
				</CFlex>
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
