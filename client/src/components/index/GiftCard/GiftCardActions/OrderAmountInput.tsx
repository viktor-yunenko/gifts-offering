import { CIconButton } from "@chakra-ui/c-button";
import { CFlex } from "@chakra-ui/vue-next";
import { captureException } from "@sentry/vue";
import { useMutation } from "@vue/apollo-composable";
import { gql } from "#graphql";
import { type GiftsQuery } from "#graphql/graphql";
import { useLoadingIndicator, useNotify } from "#imports";

import type { PropType } from "vue";
import { defineComponent, ref } from "vue";
import { appQueries } from "~/appQueries";
import { OrderConfirmModal } from "~/components/index/GiftCard/GiftCardActions/OrderConfirmModal";
import { vModel } from "~/utils/vModel";

type Order = NonNullable<GiftsQuery["gifts"][number]["order"]>;

export const OrderAmountInput = defineComponent({
	props: {
		order: {
			type: Object as PropType<Order>,
			required: true,
		},
	},

	setup(props: { order: Order }) {
		const loadingIndicator = useLoadingIndicator();
		const notify = useNotify();

		const amountChangePending = ref<"plus" | "minus" | null>(null);
		const isConfirmModalOpen = ref(false);

		const { mutate: orderUpdateAmount } = useMutation(
			GIFT_ORDER_UPDATE_AMOUNT,
			{ refetchQueries: appQueries },
		);

		async function onOrderUpdateAmount(options?: {
			isIgnorePointsBalance: boolean;
		}) {
			loadingIndicator.start();
			const amountNew =
				props.order.amount + (amountChangePending.value === "plus" ? 1 : -1);
			try {
				await orderUpdateAmount({
					orderId: props.order.id,
					amount: amountNew,
					isIgnorePointsBalance: options?.isIgnorePointsBalance,
				});
				amountChangePending.value = null;
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
			<CFlex>
				<OrderConfirmModal
					{...vModel(isConfirmModalOpen)}
					onConfirmed={async () => {
						await onOrderUpdateAmount({ isIgnorePointsBalance: true });
					}}
				/>

				<CIconButton
					disabled={props.order.amount === 1}
					onClick={async () => {
						amountChangePending.value = "minus";
						await onOrderUpdateAmount({
							isIgnorePointsBalance: true,
						});
					}}
					icon="minus"
					// @ts-ignore
					colorScheme="cyan"
					borderRightRadius="0"
					ariaLabel="minus"
					bgColor="cyan.200"
				/>
				<CFlex
					w="10"
					borderTop="1px solid"
					borderBottom="1px solid"
					align="center"
					justify="center"
					borderColor="cyan.200"
				>
					{props.order.amount}
				</CFlex>
				<CIconButton
					onClick={async () => {
						amountChangePending.value = "plus";
						await onOrderUpdateAmount();
					}}
					icon="plus"
					// @ts-ignore
					colorScheme="cyan"
					borderLeftRadius="0"
					ariaLabel="plus"
					bgColor="cyan.200"
				/>
			</CFlex>
		);
	},
});

const GIFT_ORDER_UPDATE_AMOUNT = gql(`
	mutation GiftOrderUpdateAmount(
		$orderId: ID!
		$amount: Int!
		$isIgnorePointsBalance: Boolean = false
	) {
		gift_order_update_amount(
			order_id: $orderId
			amount: $amount
			is_ignore_points_balance: $isIgnorePointsBalance
		) {
			id
		}
	}
`);
