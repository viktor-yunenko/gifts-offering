import { CButton } from "@chakra-ui/c-button";
import { CBox, CFlex, CTag, CText } from "@chakra-ui/vue-next";
import { captureException } from "@sentry/vue";
import { useMutation } from "@vue/apollo-composable";
import type { PropType } from "vue";
import { computed, defineComponent, ref } from "vue";
import ConfettiExplosion from "vue-confetti-explosion";
import { appQueries } from "~/appQueries";
import { OrderAmountInput } from "~/components/index/GiftCard/GiftCardActions/OrderAmountInput";
import { OrderConfirmModal } from "~/components/index/GiftCard/GiftCardActions/OrderConfirmModal";
import type { Gift } from "~/components/index/GiftCard/types";
import { vModel } from "~/utils/vModel";
import { gql } from "#graphql";
import { OrderStatus } from "#graphql/graphql";
import { useLoadingIndicator, useNotify } from "#imports";

export const GiftCardActions = defineComponent({
	props: {
		gift: {
			type: Object as PropType<Gift>,
			required: true,
		},
	},
	setup(props: { gift: Gift }) {
		const loadingIndicator = useLoadingIndicator();
		const notify = useNotify();

		const confettiTrigger = ref(0);
		const isConfirmModalOpen = ref(false);
		const isOrderPending = computed(() => {
			return props.gift.order?.status === OrderStatus.Submitted;
		});

		const { mutate: orderSubmitOrWithdraw } = useMutation(
			GIFT_ORDER_SUBMIT_OR_WITHDRAW,
			{ refetchQueries: appQueries },
		);

		async function onOrderSubmitOrWithdraw(
			status: OrderStatus,
			options?: { isIgnorePointsBalance: boolean },
		) {
			loadingIndicator.start();
			try {
				await orderSubmitOrWithdraw({
					giftId: props.gift.id,
					status,
					isIgnorePointsBalance: options?.isIgnorePointsBalance,
				});

				if (status === OrderStatus.Submitted) {
					confettiTrigger.value += 1;
				}
			} catch (error: any) {
				if (error?.message === "not_enough_points") {
					isConfirmModalOpen.value = true;
				} else {
					notify.error(error?.message ?? "error");
					captureException(error);
					console.error(error);
				}
			}
			loadingIndicator.finish();
		}

		return () => (
			<CFlex w="100%" justify="space-between" pos="relative">
				<OrderConfirmModal
					{...vModel(isConfirmModalOpen)}
					onConfirmed={async () => {
						await onOrderSubmitOrWithdraw(OrderStatus.Submitted, {
							isIgnorePointsBalance: true,
						});
					}}
				/>

				<CFlex gap="2" align="center">
					<CTag
						key={isOrderPending.value.toString()}
						colorScheme={isOrderPending.value ? "gray" : "cyan"}
						bg={[isOrderPending.value ? "gray.50" : "cyan.50"]}
					>
						{props.gift.points}
					</CTag>
					<CText>points</CText>
				</CFlex>

				<CFlex gap="3">
					{!isOrderPending.value && (
						<CButton
							onClick={() => onOrderSubmitOrWithdraw(OrderStatus.Submitted)}
							loading={loadingIndicator.isLoading}
							variant="solid"
						>
							That's a yes!
						</CButton>
					)}
					{isOrderPending.value && (
						<CFlex gap="4">
							<CButton
								onClick={() => onOrderSubmitOrWithdraw(OrderStatus.Withdrawn)}
								loading={loadingIndicator.isLoading}
								variant="outline"
								colorScheme="gray"
								fontWeight="normal"
							>
								Cancel
							</CButton>
							<OrderAmountInput order={props.gift.order!} />
						</CFlex>
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
							stageHeight={1600}
						/>
					</CBox>
				)}
			</CFlex>
		);
	},
});

const GIFT_ORDER_SUBMIT_OR_WITHDRAW = gql(`
	mutation GiftOrderSubmitOrWithdraw(
		$giftId: ID!
		$status: OrderStatus!
		$isIgnorePointsBalance: Boolean = false
	) {
		gift_order_submit_or_withdraw(
			gift_id: $giftId
			status: $status
			is_ignore_points_balance: $isIgnorePointsBalance
		) {
			id
		}
	}
`);
