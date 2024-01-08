import { CBox, CCenter, CImage, CLink } from "@chakra-ui/vue-next";
import { css } from "@emotion/css";
// @ts-ignore
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import {
	type PropType,
	defineComponent,
	onMounted,
	onUnmounted,
	ref,
} from "vue";
import type { Gift } from "~/appQueries";
import { useRuntimeConfig } from "#app";

export const GiftCardImages = defineComponent({
	props: {
		gift: {
			type: Object as PropType<Gift>,
			required: true,
		},
	},
	setup(props) {
		const config = useRuntimeConfig();

		const lightbox = ref<PhotoSwipeLightbox | null>(null);

		const photoswipeElId = `photoswipe-${props.gift.id}`;

		onMounted(() => {
			if (!lightbox.value) {
				const lightboxInstance = new PhotoSwipeLightbox({
					gallery: `#${photoswipeElId}`,
					children: "a",
					pswpModule: () => import("photoswipe"),
				});
				lightboxInstance.init();
				lightbox.value = lightboxInstance;
			}
		});

		onUnmounted(() => {
			if (lightbox.value) {
				lightbox.value.destroy();
				lightbox.value = null;
			}
		});

		if (props.gift.images.length === 0) {
			return null;
		}

		return () => (
			<CBox
				class={css`
						--swiper-pagination-color: var(--chakra-colors-cyan-300);
						--swiper-pagination-bullet-inactive-color: var(--chakra-colors-gray-200);
						--swiper-pagination-bullet-inactive-opacity: 1;

					.swiper {
						overflow-x: hidden;

						.swiper-pagination {
							display: flex;
							position: static;
							align-items: center;
							justify-content: center;
							margin-top: var(--chakra-space-3);
						}
					}
				`}
				overflowX="hidden"
				zIndex="0"
				id={photoswipeElId}
			>
				<Swiper
					direction="horizontal"
					pagination={{ clickable: true }}
					modules={[Pagination]}
				>
					{props.gift.images.map((image) => (
						<SwiperSlide key={image.id}>
							<CCenter>
								<CLink
									href={`${config.public.serverUrl}${image.image.url}`}
									data-pswp-width={image.image.width}
									data-pswp-height={image.image.height}
									isExternal
								>
									<CImage
										src={`${config.public.serverUrl}${image.image.url}`}
										maxH="350px"
									/>
								</CLink>
							</CCenter>
						</SwiperSlide>
					))}
				</Swiper>
			</CBox>
		);
	},
});
