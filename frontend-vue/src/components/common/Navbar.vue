<script setup>


import { onMounted, watch } from 'vue';
import { categoryStore } from '@/stores';

const category = categoryStore();



onMounted (() => {
  category.categoryData ();
})


</script>

<template>
  <div>
    <nav class="navbar-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="navbar-content">
              <ul class="navbar-list">
                <li class="navbar-item dropdown">
                  <router-link :to="{ name: 'index' }" class="navbar-link">home</router-link>
                </li>

                <li class="navbar-item dropdown-megamenu">
                  <a class="navbar-link dropdown-arrow" href="#">Categories</a>
                  <div class="megamenu">
                    <div class="container">
                      <div class="row row-cols-5">

                        <div class="col" v-for="(data, index) in category?.categoryPageData?.data" :key="index">
                          <div class="megamenu-wrap">
                            <h5 class="megamenu-title">{{data?.name}}</h5>
                            <ul class="megamenu-list" v-if="data?.sub_categories?.length">
                              <li v-for="(subData, i) in data?.sub_categories" :key="i">
                                <a href="#">{{subData?.name}}</a>
                              </li>
                            </ul>
                          </div>
                        </div> 



                        <!-- <div class="col">
                          <div class="megamenu-wrap">
                            <h5 class="megamenu-title">vegetables</h5>
                            <ul class="megamenu-list">
                              <li><a href="#">carrot</a></li>
                              <li><a href="#">broccoli</a></li>
                              <li><a href="#">asparagus</a></li>
                              <li><a href="#">cauliflower</a></li>
                              <li><a href="#">eggplant</a></li>
                            </ul>
                          </div>
                        </div> -->

                   

                      </div>
                    </div>
                  </div>
                </li>

                <li class="navbar-item dropdown-megamenu">
                  <router-link :to="{name: 'shop'}" class="navbar-link" >Shop</router-link>
                </li>

                <li class="navbar-item dropdown-megamenu">
                  <router-link :to="{name: 'seller-page'}" class="navbar-link" >Seller</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>


<style scoped>

</style>