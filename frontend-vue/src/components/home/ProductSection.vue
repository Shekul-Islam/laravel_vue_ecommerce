<script setup>
import { onMounted } from "vue";
import { soldItemStore } from "@/stores";

const soldStore = soldItemStore();

onMounted(() => {
  soldStore.soldData();
});
</script>

<template>
  <div>
    <section class="section recent-sold-items" v-for="(section, index) in soldStore?.soldItemData?.data" :key="index">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h2>{{section.title}}</h2>
            </div>
          </div>
        </div>
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">

          <div class="col" v-for="(data, i) in section?.products?.data" :key="i">
            <div class="product-card">
              <div class="product-media">
                <div class="product-label">
                  <label class="label-text sale">{{data?.type}}</label>
                </div>

                <button class="product-wish wish">
                  <i class="fas fa-heart"></i>
                </button>

                <router-link :to="{ name: 'single-product' }" class="product-image">
                  <img :src="data?.image" alt="Dr. Comfort Belt Sandal BS101"/>
                </router-link>
              </div>

              <div class="product-content">
                <h6 class="product-name">
                  <a href="product-video.html">{{data?.name}}</a>
                </h6>
                <span style="font-size:12px;">
                  <span style="font-weight:700;">Category :</span> 
                  {{ data?.category?.name }}
                </span>

                <h6 class="product-price">
                  <span v-if="data?.variations?.data?.length">
                    <span>{{ data?.variation_price_range?.min_price }} Tk <span v-if="data?.variation_price_range?.max_price != data?.variation_price_range?.min_price"> - {{ data?.variation_price_range?.max_price }} Tk</span></span>
                  </span>

                  <span v-else>
                    <span v-if="data?.offer_price != 0"><del class="text-danger">{{ data?.mrp }} Tk</del></span>
                    <span> {{ data?.offer_price != 0 ? data?.offer_price : data?.mrp }} Tk</span>
                  </span>
                </h6>
                
                <button class="product-add" title="Add to Cart">
                  <router-link :to="{name: ('/product-details/:slug?')}" class="fas fa-shopping-basket"></router-link><span>Add</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12">
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

<style scoped></style>
