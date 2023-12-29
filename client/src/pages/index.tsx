import { defineComponent } from "vue";
import { Homepage } from "~/components/Homepage";

export default defineComponent({
	setup() {
		return () => <Homepage />;
	},
});
