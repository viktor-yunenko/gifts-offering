import { CBox, CFlex, CTag, CVStack } from "@chakra-ui/vue-next";
import { keyframes } from "@emotion/css";
import { defineComponent, ref } from "vue";
import { useAuth } from "~/composables/useAuth";
import { NuxtLoadingIndicator } from "#components";
import { CSkeleton } from "~/modules/chakra/components/CSkeleton";

export default defineComponent({
	setup(props, { slots }) {
		const auth = useAuth();

		const isAnimatePointsOnChange = ref(false);
		const authLoadCounter = ref(0);

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
			<CFlex direction="column" overflowX="hidden">
				<CFlex
					justify="space-between"
					border="1px solid"
					borderColor="gray.100"
					px={style.p}
					py="6"
				>
					<CFlex>Welcome, {auth?.user()?.first_name}!</CFlex>

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
				</CFlex>

				<CFlex direction="column" h="100%" w="100%" p={style.p}>
					<NuxtLoadingIndicator />
					{slots.default?.()}
				</CFlex>
			</CFlex>
		);
	},
});
