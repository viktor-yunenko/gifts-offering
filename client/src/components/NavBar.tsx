import { CFlex, CIcon, CTag, CText } from "@chakra-ui/vue-next";
import { keyframes } from "@emotion/css";
import type { ComponentPublicInstance } from "@vue/runtime-core";
import { defineComponent, ref, watch } from "vue";
import { useAuth } from "~/composables/useAuth";
import { useOrders } from "~/composables/useOrders";
import { CSkeleton } from "~/modules/chakra/components/CSkeleton";

export const NavBar = defineComponent({
	props: {
		px: {
			type: Number,
			default: 12,
		},
	},
	emits: {
		bodyPaddingChanged: (value: string) => true,
	},
	setup(props, { emit }) {
		const auth = useAuth();
		const orders = useOrders();

		const isAnimatePointsOnChange = ref(false);
		const authLoadCounter = ref(0);

		const userBarRef = ref<ComponentPublicInstance>();
		watch(userBarRef, () => {
			const userBarPadding = userBarRef.value
				? `${userBarRef.value?.$el.clientHeight}px`
				: "0px";
			emit("bodyPaddingChanged", userBarPadding);
		});

		auth.onResult(() => {
			authLoadCounter.value += 1;

			if (authLoadCounter.value > 2) {
				isAnimatePointsOnChange.value = true;
			}
		});

		return () => (
			<CFlex
				ref={userBarRef as any}
				pos="fixed"
				top="0"
				w="100%"
				justify="space-between"
				borderColor="gray.200"
				px={props.px}
				py="4"
				bg="white"
				boxShadow="lg"
			>
				<CFlex gap="1.5" px="2px">
					{auth.loading && (
						<CTag colorScheme="cyan">
							<CText
								key={auth?.user()?.points}
								animation={
									isAnimatePointsOnChange.value
										? `${keyframes`from, to { opacity: 1 } 50% { opacity: 0 }`} 0.4s linear 1`
										: 0
								}
							>
								{auth?.user()?.points}
							</CText>
						</CTag>
					)}
					{!auth.loading && <CSkeleton w="11" h="100%" />}
					<CFlex>points</CFlex>
				</CFlex>

				{orders.ordersPendingCount() ? (
					<CFlex
						key={orders.ordersPendingCount()}
						color="gray.500"
						align="center"
						gap="1"
					>
						<CIcon boxSize="6" name="bi-gift" color="cyan.600" mb="-7px" />
						<CTag colorScheme="cyan">{orders.ordersPendingCount()}</CTag>
					</CFlex>
				) : (
					<CFlex color="gray.700">Don't be shy :)</CFlex>
				)}
			</CFlex>
		);
	},
});
