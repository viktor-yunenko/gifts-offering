import { CFlex } from "@chakra-ui/vue-next";
import { injectGlobal } from "@emotion/css";
import { defineComponent, ref } from "vue";
import { NavBar } from "~/components/NavBar";
import { NuxtLoadingIndicator } from "#components";

export default defineComponent({
	setup(props, { slots }) {
		const bodyPaddingTop = ref("0px");
		const style = {
			p: 5,
		};

		injectGlobal`
			html {
				// to show when user on mobile touch-drags the vertical viewport outside of its bounds
				background: var(--chakra-colors-gray-100);
			}
		`;

		return () => (
			<CFlex
				direction="column"
				// hide overflow to keep viewport stable during <ConfettiExplosion />
				overflow="hidden"
				pos="relative"
				pt={bodyPaddingTop.value}
				bg="gray.100"
			>
				<CFlex direction="column" h="100%" w="100%" p={style.p}>
					<NuxtLoadingIndicator />
					{slots.default?.()}
				</CFlex>

				<NavBar
					px={style.p}
					onBodyPaddingChanged={(value) => {
						bodyPaddingTop.value = value;
					}}
				/>
			</CFlex>
		);
	},
});
