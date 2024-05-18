import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import styles from "./partners.module.css";
import "swiper/css";
import "swiper/css/pagination";
import { partnersWhiteData } from "../../data/partners-white";

interface PartnersProps {}

const Partners: React.FC<PartnersProps> = () => {
  return (
    <div className={styles.container}>
      <Swiper
        slidesPerView={7}
        autoplay={{
          delay: 500,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={10}
        modules={[Autoplay, Pagination, Navigation]}
        className={styles.swiper}
      >
        {partnersWhiteData.logos.length > 0 &&
          partnersWhiteData.logos.map((partner) => (
            <SwiperSlide key={partner.order} className={styles.swiperSlide}>
              <img src={partner.srcGray} alt={partner.name} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Partners;
