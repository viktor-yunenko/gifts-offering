import { useRuntimeConfig } from "#app";
import { CBox, CCenter, CImage } from "@chakra-ui/vue-next";
import { css } from "@emotion/css";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

import { type PropType, defineComponent } from "vue";
import type { Gift } from "~/components/index/GiftCard/types";

export const GiftCardImages = defineComponent({
	props: {
		gift: {
			type: Object as PropType<Gift>,
			required: true,
		},
	},
	setup(props) {
		const config = useRuntimeConfig();

		if (props.gift.images.length === 0) {
			return null;
		}

		return () => (
			<CBox
				class={css`
						--swiper-pagination-bottom: -1px;
						--swiper-pagination-color: var(--chakra-colors-cyan-400);
						--swiper-pagination-bullet-inactive-color: var(--chakra-colors-gray-200);
						--swiper-pagination-bullet-inactive-opacity: 1;

						.swiper {
							overflow: visible;
						}
					`}
				pb="3"
			>
				<Swiper
					direction="horizontal"
					pagination={{ clickable: true }}
					modules={[Pagination]}
				>
					{props.gift.images.map((image) => (
						<SwiperSlide key={image.id}>
							<CCenter>
								<CImage
									src={`${config.public.serverUrl}${image.image.url}`}
									maxH="200px"
									maxW="fit-content"
								/>
							</CCenter>
						</SwiperSlide>
					))}
				</Swiper>
			</CBox>
		);
	},
});
