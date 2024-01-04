import { CButton } from "@chakra-ui/c-button";
import { CBox, CFlex, CHeading, CImage, CVStack } from "@chakra-ui/vue-next";
import { captureException } from "@sentry/vue";
import { useMutation } from "@vue/apollo-composable";

import { marked } from "marked";
import { defineComponent, ref, watch } from "vue";
import type { PropType } from "vue";
import ConfettiExplosion from "vue-confetti-explosion";
import { GiftOrderConfirmationModal } from "~/components/index/GiftOrderConfirmationModal";
import { GIFTS_QUERY } from "~/components/index/Index";
import { USER_QUERY } from "~/composables/useAuth";
import { vModel } from "~/utils/vModel";
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
					await submitGiftOrder({
						giftId,
						isIgnorePointsBalance: options?.isIgnorePointsBalance,
					});
					confettiTrigger.value += 1;
				} else {
					await withdrawGiftOrder({
						giftId,
						isIgnorePointsBalance: options?.isIgnorePointsBalance,
					});
				}
			} catch (error: any) {
				if (error?.message === "not_enough_points") {
					isConfirmationModalOpen.value = true;
				} else {
					notify.error(error?.message ?? "error");
					captureException(error);
				}
			}
			loadingIndicator.finish();
		}

		const isConfirmationModalOpen = ref(false);

		return () => (
			<CVStack gap="3" w="100%">
				<GiftOrderConfirmationModal
					giftId={props.gift.id}
					onConfirmed={async (giftId) =>
						await onGiftOrderRequest(giftId, "submit", {
							isIgnorePointsBalance: true,
						})
					}
					{...vModel(isConfirmationModalOpen)}
				/>

				<CHeading size="md">{props.gift.name}</CHeading>
				<CImage
					src={`http://localhost:8000${props.gift.image_card.url}`}
					maxH="200px"
					maxW="fit-content"
				/>
				<CBox
					innerHTML={marked.parse(props.gift.description_short) as string}
				/>

				<CFlex justify="space-between">
					<CBox>{props.gift.points}</CBox>
					<CBox>{props.gift.fit_confidence}</CBox>
				</CFlex>

				<CFlex w="100%" justify="flex-end" pos="relative">
					<CFlex gap="3">
						{!isOrderPending.value && (
							<CButton
								onClick={() => onGiftOrderRequest(props.gift.id, "submit")}
								loading={loadingIndicator.isLoading}
								variant="solid"
							>
								Yes please
							</CButton>
						)}
						{isOrderPending.value && (
							<CButton
								onClick={() => onGiftOrderRequest(props.gift.id, "withdraw")}
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
