import { CFlex } from "@chakra-ui/vue-next";
import { defineComponent, ref } from "vue";
import { NavBar } from "~/components/NavBar";
import { NuxtLoadingIndicator } from "#components";

export default defineComponent({
	setup(props, { slots }) {
		const bodyPaddingBottom = ref("0px");
		const style = {
			p: 6,
		};

		return () => (
			// hide overflow to keep viewport during <ConfettiExplosion />
			<CFlex
				direction="column"
				overflow="hidden"
				pos="relative"
				pb={bodyPaddingBottom.value}
			>
				<CFlex direction="column" h="100%" w="100%" p={style.p}>
					<NuxtLoadingIndicator />
					{slots.default?.()}
				</CFlex>

				<NavBar
					px={style.p}
					onBodyPaddingChanged={(value) => {
						bodyPaddingBottom.value = value;
					}}
				/>
			</CFlex>
		);
	},
});
