<script setup>


import { onMounted, watch } from 'vue';
import { useCategory } from '@/stores';

const category = useCategory();

watch (()=> category.getCategories, ()=> {

  console.log(category?.getCategories);

})

onMounted (() => {
  category.getCategories ();
})


</script>


<template>
  <div>
    <section class="section category-items">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h3 style="float: left">SHOP BY CATEGORIES</h3>
            </div>
          </div>
        </div>

        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5" v-if="category?.categoryPageData?.data">

          <div class="col" v-for="(data, index) in category?.categoryPageData?.data" :key="index">
            <div class="product-card">
              <ul>
                <li >
                  <a class="suggest-card" href="shopPage">
                    <img :src="data.image" :alt="data.name"/>
                  </a>
                </li>
              </ul>
              <h6 class="text-center mt-2">
                {{ data?.name }}
              </h6>
            </div>
          </div>


        </div>
      </div>
    </section>
  </div>
</template>


<style scoped>

</style>