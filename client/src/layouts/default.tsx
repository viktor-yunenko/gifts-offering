import { CFlex } from "@chakra-ui/vue-next";
import { defineComponent } from "vue";
import { NuxtLoadingIndicator } from "#components";

export default defineComponent({
	setup(props, { slots }) {
		return () => (
			<CFlex h="100%" w="100%">
				<NuxtLoadingIndicator />
				{slots.default?.()}
			</CFlex>
		);
	},
});
