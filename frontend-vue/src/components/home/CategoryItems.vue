<script setup>


import { onMounted, watch } from 'vue';
import { categoryStore } from '@/stores';

const category = categoryStore();

watch (()=> category.categoryData, ()=> {

  console.log(category?.categoryData);
  
})

onMounted (() => {
  category.categoryData ();
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

        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5" v-if="category?.categoryPageData?.data" >
          <div class="col" >
            <div class="product-card" >
              <ul>
                <li >
                  <a class="suggest-card" href="shop-4column.html">
                    <img :src="category?.categoryPageData?.data?.find ((i) => i.name =='Loafer').image" alt="Loafer" />
                  </a>
                </li>
              </ul>
              <h6 class="text-center mt-2">{{ category?.categoryPageData?.data?.find((i)=> i.name=="Loafer").name }}</h6>
            </div>
          </div>

          <div class="col" >
            <div class="product-card" >
              <ul>
                <li >
                  <a class="suggest-card" href="shop-4column.html">
                    <img :src="category?.categoryPageData?.data?.find ((i) => i.name =='Casual').image" alt="Casual" />
                  </a>
                </li>
              </ul>
              <h6 class="text-center mt-2">{{ category?.categoryPageData?.data?.find((i)=> i.name=="Casual").name }}</h6>
            </div>
          </div>

          <div class="col" >
            <div class="product-card" >
              <ul>
                <li >
                  <a class="suggest-card" href="shop-4column.html">
                    <img :src="category?.categoryPageData?.data?.find ((i) => i.name =='Formal').image" alt="Formal" />
                  </a>
                </li>
              </ul>
              <h6 class="text-center mt-2">{{ category?.categoryPageData?.data?.find((i)=> i.name=="Formal").name }}</h6>
            </div>
          </div>

          <div class="col" >
            <div class="product-card" >
              <ul>
                <li >
                  <a class="suggest-card" href="shop-4column.html">
                    <img :src="category?.categoryPageData?.data?.find ((i) => i.name =='Sandal').image" alt="Sandal" />
                  </a>
                </li>
              </ul>
              <h6 class="text-center mt-2">{{ category?.categoryPageData?.data?.find((i)=> i.name=="Sandal").name }}</h6>
            </div>
          </div>

          <div class="col" >
            <div class="product-card" >
              <ul>
                <li >
                  <a class="suggest-card" href="shop-4column.html">
                    <img :src="category?.categoryPageData?.data?.find ((i) => i.name =='Belt').image" alt="Belt" />
                  </a>
                </li>
              </ul>
              <h6 class="text-center mt-2">{{ category?.categoryPageData?.data?.find((i)=> i.name=="Belt").name }}</h6>
            </div>
          </div>

          <div class="col" >
            <div class="product-card" >
              <ul>
                <li >
                  <a class="suggest-card" href="shop-4column.html">
                    <img :src="category?.categoryPageData?.data?.find ((i) => i.name =='Loafer').image" alt="Loafer" />
                  </a>
                </li>
              </ul>
              <h6 class="text-center mt-2">{{ category?.categoryPageData?.data?.find((i)=> i.name=="Loafer").name }}</h6>
            </div>
          </div>

          <div class="col" >
            <div class="product-card" >
              <ul>
                <li >
                  <a class="suggest-card" href="shop-4column.html">
                    <img :src="category?.categoryPageData?.data?.find ((i) => i.name =='Casual').image" alt="Casual" />
                  </a>
                </li>
              </ul>
              <h6 class="text-center mt-2">{{ category?.categoryPageData?.data?.find((i)=> i.name=="Casual").name }}</h6>
            </div>
          </div>

          <div class="col" >
            <div class="product-card" >
              <ul>
                <li >
                  <a class="suggest-card" href="shop-4column.html">
                    <img :src="category?.categoryPageData?.data?.find ((i) => i.name =='Formal').image" alt="Formal" />
                  </a>
                </li>
              </ul>
              <h6 class="text-center mt-2">{{ category?.categoryPageData?.data?.find((i)=> i.name=="Formal").name }}</h6>
            </div>
          </div>

          <div class="col">
            <div class="product-card">
              <ul>
                <li >
                  <a class="suggest-card" href="shop-4column.html">
                    <img :src="category?.categoryPageData?.data?.find ((i) => i.name =='Sandal').image" alt="Sandal" />
                  </a>
                </li>
              </ul>
              <h6 class="text-center mt-2">{{ category?.categoryPageData?.data?.find((i)=> i.name=="Sandal").name }}</h6>
            </div>
          </div>

          <div class="col">
            <div class="product-card">
              <ul>
                <li >
                  <a class="suggest-card" href="shop-4column.html">
                    <img :src="category?.categoryPageData?.data?.find ((i) => i.name =='Belt').image" alt="Belt" />
                  </a>
                </li>
              </ul>
              <h6 class="text-center mt-2">{{ category?.categoryPageData?.data?.find((i)=> i.name=="Belt").name }}</h6>
            </div>
          </div>

          <div class="col">
            <div class="product-card">
              <ul>
                <li>
                  <a class="suggest-card" href="shop-4column.html">
                    <img src="@/assets/images/promo/home/07.jpg" alt="" />
                  </a>
                </li>
              </ul>

              <h6 class="text-center mt-2">category name</h6>
            </div>
          </div>

          <div class="col">
            <div class="product-card">
              <ul>
                <li>
                  <a class="suggest-card" href="shop-4column.html">
                    <img src="@/assets/images/promo/home/07.jpg" alt="" />
                  </a>
                </li>
              </ul>

              <h6 class="text-center mt-2">category name</h6>
            </div>
          </div>

          <div class="col">
            <div class="product-card">
              <ul>
                <li>
                  <a class="suggest-card" href="shop-4column.html">
                    <img src="@/assets/images/promo/home/07.jpg" alt="" />
                  </a>
                </li>
              </ul>

              <h6 class="text-center mt-2">category name</h6>
            </div>
          </div>

          <div class="col">
            <div class="product-card">
              <ul>
                <li>
                  <a class="suggest-card" href="shop-4column.html">
                    <img src="@/assets/images/promo/home/07.jpg" alt="" />
                  </a>
                </li>
              </ul>

              <h6 class="text-center mt-2">category name</h6>
            </div>
          </div>

          <div class="col">
            <div class="product-card">
              <ul>
                <li>
                  <a class="suggest-card" href="shop-4column.html">
                    <img src="@/assets/images/promo/home/07.jpg" alt="" />
                  </a>
                </li>
              </ul>

              <h6 class="text-center mt-2">category name</h6>
            </div>
          </div>


        </div>
      </div>
    </section>
  </div>
</template>


<style scoped>

</style>