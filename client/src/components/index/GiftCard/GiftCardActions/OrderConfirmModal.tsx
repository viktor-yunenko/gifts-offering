import { CButton, CIconButton } from "@chakra-ui/c-button";
import { CFlex, CText, CVStack } from "@chakra-ui/vue-next";
import { UModal } from "#components";

import { defineComponent, ref } from "vue";
import { vModelUpdateEmit, vModelUpdateReceiver } from "~/utils/vModel";

export const OrderConfirmModal = defineComponent({
	props: {
		modelValue: {
			type: Boolean,
			default: false,
		},
		amountChangeRequested: {
			type: Number,
		},
	},
	emits: {
		confirmed: (isAmountChange?: boolean) => true,
		[vModelUpdateEmit]: (value: boolean) => true,
	},
	setup(props, { emit }) {
		const isOpen = ref(false);

		const style = {
			gap: 4,
		};

		return () => (
			<UModal
				modelValue={props.modelValue}
				{...{
					[vModelUpdateReceiver]: (value: boolean) => {
						emit(vModelUpdateEmit, value);
					},
				}}
			>
				<CVStack p="6" bg="white">
					<CFlex w="100%" justify="space-between" align="center">
						<CText fontSize="lg" my="-1">
							Oh, not enough points
						</CText>
						<CIconButton
							w="3"
							color="gray.500"
							/* @ts-ignore */
							colorScheme="gray"
							variant="ghost"
							icon="close"
							onClick={() => {
								emit(vModelUpdateEmit, false);
							}}
							ariaLabel="Close modal"
						/>
					</CFlex>
					<CVStack direction="column" spacing={style.gap} bg="white">
						<CText>
							We can roll with it though! Assuming you won't feel awkward about
							receiving that many gifts from me :P
						</CText>
						<CFlex justify="flex-end">
							<CButton
								variant="outline"
								onClick={() => {
									emit(vModelUpdateEmit, false);
									emit("confirmed", false);
								}}
							>
								Let's roll!
							</CButton>
						</CFlex>
					</CVStack>
				</CVStack>
			</UModal>
		);
	},
});
