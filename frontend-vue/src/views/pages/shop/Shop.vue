<script setup>
import { onMounted } from 'vue';
import { shopStore } from '@/stores';
import { productStore } from '@/stores';

const shop = shopStore();
const product = productStore();



const bannerImage = new URL("@/assets/images/single-banner.jpg", import.meta.url).href;


onMounted(()=> {
  shop?.shopData();
})

onMounted(()=> {
  product?.productsData();
})

</script>

<template>
  <div>
    <section class="inner-section single-banner" :style="{ background: 'url(' + bannerImage + ') center center no-repeat', }">
      <div class="container">
        <h2>Shop Page</h2>
      </div>
    </section>

    <section class="inner-section shop-part" >
      <div class="container">
        <div class="row content-reverse">

          <div class="col-lg-3" >
            <div class="shop-widget">
              <h6 class="shop-widget-title">Filter by Price</h6>
              <form>
                <div class="shop-widget-group" v-if="shop?.shops">
                  <input type="text" :placeholder="`Min - ${shop?.shops?.min_sell_price}`">
                  <input type="text" :placeholder="`Max - ${shop?.shops?.max_sell_price }`"/>
                </div>

                <button class="shop-widget-btn">
                  <i class="fas fa-search"></i><span>search</span>
                </button>
              </form>
            </div>

            <div class="shop-widget" >
              <h6 class="shop-widget-title">Filter by Brand</h6>
              <form>
                <input class="shop-widget-search" type="text" placeholder="Search..."/>
                <ul class="shop-widget-list shop-widget-scroll">
                  <li v-for=" (brands, index) in shop?.shops?.brands" :key="index">
                    <div class="shop-widget-content">
                      <input type="checkbox" id="brand1"/><label for="brand1">{{brands?.name}}</label>
                    </div>
                    <span class="shop-widget-number">({{brands?.products_count}})</span>
                  </li>
                </ul>

                <button class="shop-widget-btn">
                  <i class="far fa-trash-alt"></i><span>clear filter</span>
                </button>
                
              </form>
            </div>

            <div class="shop-widget">
              <h6 class="shop-widget-title">Filter by Category</h6>

              <form>
                <input class="shop-widget-search" type="text" placeholder="Search..."/>
                <ul class="shop-widget-list shop-widget-scroll">
                  <li v-for=" (category, i) in shop?.shops?.categories" :key="i">
                    <div class="shop-widget-content">
                      <input type="checkbox" id="cate1"/><label for="cate1">{{category?.name}}</label>
                    </div>
                    <span class="shop-widget-number">({{category?.products_count}})</span>
                  </li>

                </ul>

                <button class="shop-widget-btn">
                  <i class="far fa-trash-alt"></i><span>clear filter</span>
                </button>
              </form>
            </div>
          </div>

          <div class="col-lg-9">
            <div class="row">
              <div class="col-lg-12" >
                <div class="top-filter">
                  <div class="filter-show">
                    <label class="filter-label">Show :</label>
                    <select class="form-select filter-select">
                      <option value="1">12</option>
                      <option value="2">24</option>
                      <option value="3">36</option>
                    </select>
                  </div>

                  <div class="filter-short">
                    <label class="filter-label">Short by :</label
                    ><select class="form-select filter-select">
                      <option selected>default</option>
                      <option value="3">trending</option>
                      <option value="1">featured</option>
                      <option value="2">recommend</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            

            <div class="row row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4" >
              <div class="col"  v-for="(item, id) in product?.products?.data" :key="id">
                <div class="product-card">
                  <div class="product-media">

                    <div class="product-label">
                      <label class="label-text rate">Popular</label>
                      
                      <label class="view-label off">-2%</label>
                    </div>

                    <button class="product-wish wish">
                      <i class="fas fa-heart"></i>
                    </button>

                    <a class="product-image" href="product-video.html">
                      <img :src="item?.image" :alt="item.image"/>
                    </a>
                  </div>

                  <div class="product-content">
                    <h6 class="product-name">
                      <a href="product-video.html">{{item?.name}}</a>
                    </h6>
                    <h6 class="product-price">

                      <span v-if="item?.variations?.data?.length">
                        <span>{{ item?.variation_price_range?.min_price }} tk <span v-if="item?.variation_price_range?.max_sell_price != item?.variation_price_range?.min_sell_price"> - {{ item?.max_sell_price }} tk</span></span>
                      </span>

                      <span v-else>
                        <span v-if="item?.offer_price !=0"><del class="text-danger">{{ item?.mrp }} tk</del></span>
                        <span>{{ item?.offer_price != 0 ? offer_price : item?.mrp }} tk</span>
                      </span>
                      
                    </h6>
                    <button class="product-add" title="Add to Cart">
                      <i class="fas fa-shopping-basket"></i><span>Add</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="bottom-paginate">
                  <p class="page-info">Showing 12 of 60 Results</p>
                  <ul class="pagination">
                    <li class="page-item">
                      <a class="page-link" href="#"
                        ><i class="fas fa-long-arrow-alt-left"></i
                      ></a>
                    </li>
                    <li class="page-item">
                      <a class="page-link active" href="#">1</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">2</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">3</a>
                    </li>
                    <li class="page-item">...</li>
                    <li class="page-item">
                      <a class="page-link" href="#">60</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#"
                        ><i class="fas fa-long-arrow-alt-right"></i
                      ></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
