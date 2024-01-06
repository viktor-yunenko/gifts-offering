import { CButton } from "@chakra-ui/c-button";
import {
	CBox,
	CCenter,
	CFlex,
	CHeading,
	CImage,
	CTag,
	CText,
	useTheme,
} from "@chakra-ui/vue-next";
import { css } from "@emotion/css";
import { captureException } from "@sentry/vue";
import { useMutation } from "@vue/apollo-composable";
import { gql } from "#graphql";
import { type GiftsQuery, OrderStatus } from "#graphql/graphql";
import { useLoadingIndicator, useNotify } from "#imports";

import { marked } from "marked";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import type { PropType } from "vue";
import { computed, defineComponent, ref, watch } from "vue";
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
		const theme = useTheme();

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

		const style = {
			spacing: 6,
		};

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

		const listStyleFill = computed(() => {
			// @ts-ignore
			const listStylePrimary = theme.colors.fuchsia[500];
			// @ts-ignore
			const listStyleSecondary = theme.colors.cyan[500];

			return isOrderPending.value
				? listStyleSecondary.replace("#", "%23")
				: listStylePrimary.replace("#", "%23");
		});

		return () => (
			<CFlex
				direction="column"
				gap={style.spacing / 2}
				w="100%"
				bg="white"
				p={style.spacing}
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

				<CBox
					class={css`
						--swiper-pagination-bottom: -20px;
						.swiper {
							overflow: visible;
						}
					`}
					pb="3"
				>
					<Swiper
						direction="horizontal"
						pagination={{ clickable: true }}
						modules={[Pagination]}
					>
						{props.gift.images.map((image) => (
							<SwiperSlide key={image.id}>
								<CCenter>
									<CImage
										src={`http://localhost:8000${image.image.url}`}
										maxH="200px"
										maxW="fit-content"
									/>
								</CCenter>
							</SwiperSlide>
						))}
					</Swiper>
				</CBox>

				<CBox
					innerHTML={marked.parse(props.gift.description_short) as string}
					sx={{
						ul: {
							listStyleImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 22 22" fill="${listStyleFill.value}"><circle cx="8" cy="8" r="8"/></svg>')`,
							ml: 5,
						},
						i: {
							fontStyle: "italic",
						},
						strong: {
							fontWeight: "bold",
						},
					}}
				/>

				<CFlex justify="space-between">
					<CBox>{props.gift.fit_confidence}</CBox>
				</CFlex>

				<CFlex w="100%" justify="space-between" pos="relative">
					<CFlex gap="2" align="center">
						<CTag
							key={isOrderPending.value.toString()}
							colorScheme={isOrderPending.value ? "cyan" : "fuchsia"}
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
								That's a yes
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
