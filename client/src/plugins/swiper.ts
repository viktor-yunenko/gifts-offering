import "swiper/css";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
	// the author of swiper doesn't understand why warnings must be fixed
	// so here we go.
	// ticket [ignored]: https://github.com/nolimits4web/swiper/issues/4974
	nuxtApp.vueApp.config.warnHandler = (msg, instance, trace) => {
		if (
			trace.includes("Swiper") &&
			msg.includes(
				`Slot "default" invoked outside of the render function: this will not track dependencies used in the slot.`,
			)
		) {
			return;
		}
		console.warn(msg, instance, "\n", trace);
	};
});
