<script setup>
import { onMounted } from "vue";
import { newProductStore } from "@/stores";

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const product = newProductStore();

onMounted (()=> {
  product.productData ();
})
</script>


<template>
  <div>
    <section class="section new-items">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="section-heading">
              <h2>collected new items</h2>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <ul class="new-slider slider-arrow">
              <swiper
                :slidesPerView="5"
                :spaceBetween="30"
                :autoplay="{ delay: 3000, disableOnInteraction: false }"
                :loop="true"
                :pagination="{ clickable: true }"
                :navigation="true"
                :modules="[Pagination, Navigation, Autoplay]"
                class="mySwiper"
              >
                <swiper-slide v-for="(data, index) in product?.newProduct?.data" :key="index">
                  <li>
                    <div class="product-card">
                      <div class="product-media">
                        <div class="product-label">
                          <label class="label-text new">New</label>
                        </div>

                        <button class="product-wish wish">
                          <i class="fas fa-heart"></i>
                        </button>

                       <router-link class="product-image" :to="{name: 'productDetailsPage'}">
                           <img :src="data?.image" alt="product"/>
                       </router-link>
                      </div>
                      <div class="product-content">
                        <h6 class="product-name">
                          <router-link :to="{name: 'productDetailsPage'}">{{data?.slug}}</router-link>
                        </h6>

                        <span>{{ data?.category?.name }}</span>

                        <h6 class="product-price">
                          <span v-if="data?.variations?.data?.length">
                            <span> {{ data?.variation_price_range?.min_price }} tk<span v-if="data?.variation_price_range.max_price != data?.variation_price_range.min_price"> - {{ data?.variation_price_range?.max_price }} tk</span></span>
                          </span>

                          <span v-else>
                            <span v-if="data?.offer_price != 0"> <del class="text-danger">{{ data?.mrp}}tk</del></span>
                            <span> {{ data?.offer_price != 0 ? data?.offer_price : data?.mrp }} tk</span>
                          </span>
                        
                        </h6>

                        <button class="product-add" title="Add to Cart">
                          <router-link to="/product-details/:slug?" class="fas fa-shopping-basket"></router-link><span>Add</span>
                        </button>
                      </div>
                    </div>
                  </li>
                </swiper-slide>

              </swiper>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="section-btn-25">
              <a href="shop-4column.html" class="btn btn-outline"
                ><i class="fas fa-eye"></i><span>show more</span></a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<style scoped>

</style>