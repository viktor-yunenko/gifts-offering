import { CButton } from "@chakra-ui/c-button";
import { CBox, CFlex, CHeading, CImage, CVStack } from "@chakra-ui/vue-next";
import { captureException } from "@sentry/vue";
import { useMutation } from "@vue/apollo-composable";
import "~/components/index/points-limit-toast.scss";

import { injectGlobal } from "@emotion/css";
import { marked } from "marked";
import { defineComponent, ref, watch } from "vue";
import type { PropType } from "vue";
import ConfettiExplosion from "vue-confetti-explosion";
// @ts-ignore
import { POSITION, TYPE } from "vue-toastification";
import { GIFTS_QUERY } from "~/components/index/Index";
import { USER_QUERY } from "~/composables/useAuth";
import { gql } from "#graphql";
import { type GiftsQuery, OrderStatus } from "#graphql/graphql";
import { GIFT_ORDERS_PENDING, useLoadingIndicator, useNotify } from "#imports";

export const GiftCard = defineComponent({
	props: {
		gift: {
			type: Object as PropType<GiftsQuery["gifts"][number]>,
			required: true,
		},
	},

	setup(props: { gift: GiftsQuery["gifts"][number] }) {
		const loadingIndicator = useLoadingIndicator();
		const notify = useNotify();

		const confettiTrigger = ref(0);
		const isOrderPending = ref(false);

		const gift = props.gift;

		watch(
			() => props.gift.order?.status,
			(status) => {
				isOrderPending.value = status === OrderStatus.Pending;
			},
			{ immediate: true },
		);

		const refetchQueries = () => [
			{ query: GIFTS_QUERY },
			{ query: USER_QUERY },
			{ query: GIFT_ORDERS_PENDING },
		];
		const { mutate: submitGiftOrder, error: submitError } = useMutation(
			GIFT_ORDER_SUBMIT,
			{ refetchQueries },
		);
		const { mutate: withdrawGiftOrder, error: withdrawError } = useMutation(
			GIFT_ORDER_WITHDRAW,
			{ refetchQueries },
		);

		async function onGiftOrderRequest(
			giftId: string,
			request: "submit" | "withdraw",
			options?: { isIgnorePointsBalance: boolean },
		) {
			loadingIndicator.start();
			try {
				if (request === "submit") {
					confettiTrigger.value += 1;
					await submitGiftOrder({
						giftId,
						isIgnorePointsBalance: options?.isIgnorePointsBalance,
					});
				} else {
					await withdrawGiftOrder({
						giftId,
						isIgnorePointsBalance: options?.isIgnorePointsBalance,
					});
				}
			} catch (error: any) {
				if (error?.message === "not_enough_points") {
					notify.toast(
						<div>
							<h5>Not enough points :'(</h5>
							<p>
								We can roll with it though! Assuming you won't feel awkward
								about receiving that many gifts from me :P
							</p>
							<button
								type="button"
								onClick={() =>
									onGiftOrderRequest(giftId, request, {
										isIgnorePointsBalance: true,
									})
								}
							>
								Let's roll!
							</button>
						</div>,
						{
							position: POSITION.BOTTOM_CENTER,
							type: TYPE.INFO,
							bodyClassName: "points-limit-toast",
						},
					);
				} else {
					notify.error(error?.message ?? "error");
					captureException(error);
				}
			}
			loadingIndicator.finish();
		}

		injectGlobal`
			.points-limit-toast h5 {
				font-size: 1.5rem !important;
			}

			.points-limit-toast p {
				padding: 1rem 0;
			}

			.points-limit-toast button {
				border-radius: 0.5rem;
				border: 1px solid #000;
				background-color: #fff;
				color: #000;
				padding: 0.5rem 1rem;
			}
		`;

		return () => (
			<CVStack gap="3" w="100%">
				<CHeading size="md">{gift.name}</CHeading>
				<CImage
					src={`http://localhost:8000${gift.image_card.url}`}
					maxH="200px"
					maxW="fit-content"
				/>
				<CBox innerHTML={marked.parse(gift.description_short) as string} />

				<CFlex justify="space-between">
					<CBox>{gift.points}</CBox>
					<CBox>{gift.fit_confidence}</CBox>
				</CFlex>

				<CFlex w="100%" justify="flex-end" pos="relative">
					<CFlex gap="3">
						{!isOrderPending.value && (
							<CButton
								onClick={() => onGiftOrderRequest(gift.id, "submit")}
								loading={loadingIndicator.isLoading}
								variant="solid"
							>
								Yes please
							</CButton>
						)}
						{isOrderPending.value && (
							<CButton
								onClick={() => onGiftOrderRequest(gift.id, "withdraw")}
								loading={loadingIndicator.isLoading}
								variant="outline"
								colorScheme="gray"
							>
								Cancel
							</CButton>
						)}
					</CFlex>
					{Boolean(confettiTrigger.value) && (
						<CBox pos="absolute" top="50%" right="40px">
							{/* @ts-ignore */}
							<ConfettiExplosion
								key={confettiTrigger.value}
								particleSize={8}
								particleCount={100}
								force={0.2}
								stageWidth={400}
								shouldDestroyAfterDone
							/>
						</CBox>
					)}
				</CFlex>
			</CVStack>
		);
	},
});

const GIFT_ORDER_SUBMIT = gql(`
	mutation GiftOrderSubmit($giftId: ID!, $isIgnorePointsBalance: Boolean = false) {
    gift_order_submit(gift_id: $giftId, is_ignore_points_balance: $isIgnorePointsBalance) {
      id
    }
  }
`);

const GIFT_ORDER_WITHDRAW = gql(`
	mutation GiftOrderWithdraw($giftId: ID!, $isIgnorePointsBalance: Boolean = false) {
    gift_order_withdraw(gift_id: $giftId, is_ignore_points_balance: $isIgnorePointsBalance) {
      id
    }
  }
`);
