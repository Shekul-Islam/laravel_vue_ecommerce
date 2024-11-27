<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import { ref, onMounted, watch} from "vue";
import {useLandingPageStore} from "@/stores";

const landing = useLandingPageStore ();

watch(() => landing.landingPageData, () => {
  console.log(landing.landingPageData);
  
})

onMounted (()=> {
  landing.homeData();
})





// const props = defineProps({
//  albab: {
//     type: Object,
//     default: {}, 
//   },
// });

// import axiosInstance from '@/services/axiosService';
// import { onMounted, ref } from 'vue';

// const sliderDatas = ref ("");

// const getHomePageData = async ()=> {
// try {
//   const res = await axiosInstance.get(`/sliders`)
//   sliderDatas.value = res.data.result;
//   console.log(res);
// }catch (error){
//   console.log(error);
// }
// };

// onMounted(()=>{
//   getHomePageData();
// });

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
                <!-- <swiper-slide v-for="(slider, index) in sliderDatas.data" :key="index">
                 <div>
                  <img :src="slider.image" width="100%" height="700px" alt=""/>
                 </div>
                </swiper-slide> -->


                <swiper-slide v-for="item in landing.landingPageData.data" :key="item.id" >
                  <img :src="item.image" alt="item.image" height="1200px"/>
                 
                </swiper-slide>

                <!-- <swiper-slide >
                  <img :src="albab.image" alt=""/>
                  {{ console.log('tbdata:', tbdata) }}
                </swiper-slide> -->
                
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