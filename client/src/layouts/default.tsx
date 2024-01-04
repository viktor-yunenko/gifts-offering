import { CFlex, CTag } from "@chakra-ui/vue-next";
import { keyframes } from "@emotion/css";
import type { ComponentPublicInstance } from "@vue/runtime-core";
import { computed, defineComponent, ref } from "vue";
import { useAuth } from "~/composables/useAuth";
import { useOrders } from "~/composables/useOrders";
import { CSkeleton } from "~/modules/chakra/components/CSkeleton";
import { NuxtLoadingIndicator } from "#components";

export default defineComponent({
	setup(props, { slots }) {
		const auth = useAuth();
		const orders = useOrders();

		const isAnimatePointsOnChange = ref(false);
		const authLoadCounter = ref(0);

		const userBarRef = ref<ComponentPublicInstance>();
		const userBarPadding = computed(() => {
			const additionalSpace = 16;
			return userBarRef.value
				? `${userBarRef.value?.$el.clientHeight + additionalSpace}px`
				: "0px";
		});

		const isOrdersPlural = computed(() => orders.ordersPendingCount() > 1);

		auth.onResult(() => {
			authLoadCounter.value++;

			if (authLoadCounter.value > 2) {
				isAnimatePointsOnChange.value = true;
			}
		});

		const style = {
			p: 12,
		};

		return () => (
			// hide overflow to keep viewport during <ConfettiExplosion />
			<CFlex
				direction="column"
				overflow="hidden"
				pos="relative"
				pb={userBarPadding.value}
			>
				<CFlex direction="column" h="100%" w="100%" p={style.p}>
					<NuxtLoadingIndicator />
					{slots.default?.()}
				</CFlex>

				<CFlex
					ref={userBarRef as any}
					pos="fixed"
					bottom="0"
					w="100%"
					justify="space-between"
					border="1px solid"
					borderColor="gray.200"
					boxShadow={"base"}
					px={style.p}
					py="4"
					bg="white"
				>
					<CFlex gap="1.5">
						{auth.loading && (
							<CTag
								key={authLoadCounter.value}
								animation={
									isAnimatePointsOnChange.value
										? `${keyframes`from, to { opacity: 1 } 50% { opacity: 0 }`} 0.4s linear 2`
										: 0
								}
							>
								{auth?.user()?.points}
							</CTag>
						)}
						{!auth.loading && <CSkeleton w="11" h="100%" />}
						<CFlex>points</CFlex>
					</CFlex>

					{orders.ordersPendingCount() ? (
						<CFlex color="gray.500">
							{orders.ordersPendingCount()} pending{" "}
							{isOrdersPlural.value ? "gifts" : "gift"}
						</CFlex>
					) : (
						<CFlex>Welcome ^^</CFlex>
					)}
				</CFlex>
			</CFlex>
		);
	},
});
