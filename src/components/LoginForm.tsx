import { CButton } from "@chakra-ui/c-button";
import { CInput } from "@chakra-ui/c-input";
import { CBox } from "@chakra-ui/vue-next";
import { captureException } from "@sentry/vue";
import { defineComponent, ref } from "vue";
import { vModel } from "~/utils/vModel";
import { useLoadingIndicator, useSupabaseClient } from "#imports";

export const LoginForm = defineComponent({
	setup() {
		const supabase = useSupabaseClient();
		const loading = useLoadingIndicator();

		const email = ref("");

		async function login() {
			loading.start();
			try {
				const { error } = await supabase.auth.signInWithOtp({
					email: email.value,
				});
				if (error) {
					captureException(error);
				}
			} catch (error) {
				captureException(error);
			}
			loading.finish();
		}

		return () => (
			<CBox>
				<CInput
					disabled={loading.isLoading.value}
					placeholder="email@example.com"
					type="email"
					{...vModel(email)}
				/>
				<CButton isLoading={loading.isLoading.value} onClick={login}>
					Login
				</CButton>
			</CBox>
		);
	},
});
