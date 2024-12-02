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

                <li class="navbar-item dropdown-megamenue">
                  <a class="navbar-link dropdown-arrow" href="#">Categories</a>
                  <div class="megamenue">
                    <div class="container">
                      <div class="row row-cols-5">
                        <div class="col" v-for="(data, index) in category?.categoryPageData?.data" :key="index">
                          <div class="megamenue-wrap">
                            <h5 class="megamenue-title">{{data?.name}}</h5>
                            <ul class="megamenue-list" v-if="data?.sub_categories?.length">
                              <li v-for="(subData, i) in data?.sub_categories" :key="i">
                                <a href="#">{{subData?.name}}</a>
                              </li>
                            </ul>
                          </div>
                        </div> 
                      </div>
                    </div>
                  </div>
                </li>

                <li class="navbar-item dropdown-megamenue">
                  <router-link :to="{name: 'shop'}" class="navbar-link" >Shop</router-link>
                </li>

                <li class="navbar-item dropdown-megamenue">
                  <router-link :to="{name: 'blog'}" class="navbar-link" >Blog</router-link>
                </li>

                <li class="navbar-item dropdown-megamenue">
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