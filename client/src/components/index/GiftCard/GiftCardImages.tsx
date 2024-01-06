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
		return () => (
			<CBox
				class={css`
						--swiper-pagination-bottom: -20px;
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
									src={`http://localhost:8000${image.image.url}`}
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
