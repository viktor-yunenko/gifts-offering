import { CFlex } from "@chakra-ui/vue-next";
import { defineComponent } from "vue";
import { NuxtLoadingIndicator } from "#components";

export default defineComponent({
	setup(props, { slots }) {
		return () => (
			<CFlex>
				<NuxtLoadingIndicator />
				{slots.default?.()}
			</CFlex>
		);
	},
});
