import { CButton } from "@chakra-ui/c-button";
import {
	CBox,
	CCenter,
	CFlex,
	CHeading,
	CImage,
	CVStack,
} from "@chakra-ui/vue-next";
import { captureException } from "@sentry/vue";
import { useMutation } from "@vue/apollo-composable";
import { gql } from "#graphql";
import { type GiftsQuery, OrderStatus } from "#graphql/graphql";
import { useLoadingIndicator, useNotify } from "#imports";

import { marked } from "marked";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import type { PropType } from "vue";
import { defineComponent, ref, watch } from "vue";
import ConfettiExplosion from "vue-confetti-explosion";
import { appQueries } from "~/appQueries";
import { ConfirmPointsIgnoreModal } from "~/components/index/GiftCard/ConfirmPointsIgnoreModal";
import { OrderAmountInput } from "~/components/index/GiftCard/OrderAmountInput";
import { vModel } from "~/utils/vModel";

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
		const isConfirmModalOpen = ref(false);

		watch(
			() => props.gift.order?.status,
			(status) => {
				isOrderPending.value = status === OrderStatus.Submitted;
			},
			{ immediate: true },
		);

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
			<CVStack
				gap="3"
				w="100%"
				bg="white"
				p="6"
				borderRadius="md"
				boxShadow="md"
			>
				<ConfirmPointsIgnoreModal
					{...vModel(isConfirmModalOpen)}
					onConfirmed={async () => {
						await onOrderSubmitOrWithdraw(OrderStatus.Submitted, {
							isIgnorePointsBalance: true,
						});
					}}
				/>

				<CHeading
					size="md"
					color={isOrderPending.value ? "cyan.600" : "fuchsia.600"}
				>
					{props.gift.name}
				</CHeading>

				<Swiper
					direction="horizontal"
					pagination={{ clickable: true }}
					modules={[Pagination]}
				>
					{props.gift.images.map((image) => (
						<SwiperSlide key={image.id}>
							<CCenter pb="10">
								<CImage
									src={`http://localhost:8000${image.image.url}`}
									maxH="200px"
									maxW="fit-content"
								/>
							</CCenter>
						</SwiperSlide>
					))}
				</Swiper>

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
								onClick={() => onOrderSubmitOrWithdraw(OrderStatus.Submitted)}
								loading={loadingIndicator.isLoading}
								variant="solid"
							>
								Yes please
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
			</CVStack>
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
