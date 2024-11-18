<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
</script>


<template>
  <div>
    <section class="banner-part">
      <div class="">
        <div class="row">
          <div class="col-lg-12 order-0 order-lg-1 order-xl-1">
            <div class="home-grid-slider slider-arrow slider-dots">
              <swiper
                :slidesPerView="1"
                :spaceBetween="30"
                :autoplay="{ delay: 3000, disableOnInteraction: false }"
                :loop="true"
                :pagination="{ clickable: true }"
                :navigation="true"
                :modules="[Pagination, Navigation, Autoplay]"
                class="mySwiper"
              >
                <swiper-slide
                  ><img src="@/assets/images/banner/01.jfif" alt=""
                /></swiper-slide>
                <swiper-slide
                  ><img src="@/assets/images/banner/02.jfif" alt=""
                /></swiper-slide>
                <swiper-slide
                  ><img src="@/assets/images/banner/03.jfif" alt=""
                /></swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<style scoped>

</style>