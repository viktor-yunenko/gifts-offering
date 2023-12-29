import { defineComponent } from "vue";
import { NuxtLayout, NuxtPage } from "#components";

export default defineComponent({
	render() {
		return (
			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>
		);
	},
});
