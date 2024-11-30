<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import { ref, onMounted} from "vue";
import {useLandingPageStore} from "@/stores";

const landing = useLandingPageStore ();

onMounted (()=> {
  landing.homeData();
})

</script>
<template>
  <div>
    <section class="banner-part" >
      <div>
      </div>
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
                
                <swiper-slide v-for="item in landing.landingPageData.data" :key="item.id">
                  <img :src="item.image" alt="item.image"/>
                </swiper-slide>
                
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