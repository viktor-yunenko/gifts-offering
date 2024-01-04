import { CButton } from "@chakra-ui/c-button";
import { CFlex, CText } from "@chakra-ui/vue-next";
import { UModal } from "#components";

import { defineComponent, ref, watch } from "vue";
import { vModelUpdateEmit, vModelUpdateReceiver } from "~/utils/vModel";

export const PointsIgnoreModal = defineComponent({
	props: {
		modelValue: {
			type: Boolean,
			default: false,
		},
		giftId: {
			type: String,
		},
	},
	emits: {
		confirmed: (giftId: string) => true,
		[vModelUpdateEmit]: (value: boolean) => true,
	},
	setup(props, { emit }) {
		const isOpen = ref(false);

		watch(
			() => props.giftId,
			() => {
				console.log("props.giftId changed");
				isOpen.value = true;
			},
			{ immediate: true },
		);

		return () => (
			<UModal
				modelValue={props.modelValue}
				{...{
					[vModelUpdateReceiver]: (value: boolean) => {
						emit(vModelUpdateEmit, value);
					},
				}}
			>
				<CFlex direction="column" p="6" gap="4" bg="white">
					<CText fontSize="lg" my="-1">
						Not enough points :'(
					</CText>

					<CText>
						We can roll with it though! Assuming you won't feel awkward about
						receiving that many gifts from me :P
					</CText>
					<CButton
						onClick={() => {
							emit(vModelUpdateEmit, false);
							emit("confirmed", props.giftId!);
						}}
					>
						Let's roll!
					</CButton>
				</CFlex>
			</UModal>
		);
	},
});
