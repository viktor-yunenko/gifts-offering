import { CFlex, CVStack } from "@chakra-ui/vue-next";
import { defineComponent } from "vue";
import { useAuth } from "~/composables/useAuth";
import { NuxtLoadingIndicator } from "#components";

export default defineComponent({
	setup(props, { slots }) {
		const auth = useAuth();

		const style = {
			p: 12,
		};

		return () => (
			<CVStack>
				<CFlex
					justify="space-between"
					border="1px solid"
					borderColor="gray.100"
					px={style.p}
					py="6"
				>
					<CFlex>Welcome, {auth?.user()?.first_name}!</CFlex>
					<CFlex>Points: {auth?.user()?.points}</CFlex>
				</CFlex>

				<CFlex h="100%" w="100%" p={style.p}>
					<NuxtLoadingIndicator />
					{slots.default?.()}
				</CFlex>
			</CVStack>
		);
	},
});
