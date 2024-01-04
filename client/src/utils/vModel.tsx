import type { Ref } from "vue";

export function vModel<T>(ref: Ref<T>) {
	/**
	 * TSX doesn't allow to write something as `<Input vModel={email} />`
	 * but this function allows to write `<Input {...vModel(email)} />`
	 */
	return {
		modelValue: ref.value,
		[vModelUpdateReceiver]: (value: T) => {
			console.log("inside vModel", value);
			ref.value = value;
		},
	};
}

export const vModelUpdateEmit = "update:modelValue";
export const vModelUpdateReceiver = "onUpdate:modelValue";
