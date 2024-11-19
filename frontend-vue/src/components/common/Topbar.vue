<script setup>

import axiosInstance from '@/services/axiosService';

import {ref, onMounted} from 'vue';

const topbarDatas = ref ();

const topbarData = async ()=> {
  try {
    const res = await axiosInstance.get(`/sliders`)
    console.log(res);
    topbarDatas.value = res.data.result.data;
    
  } catch (error) {
    console.log(error);
    
  }
};

onMounted (()=> {
  topbarData();
})

</script>

<template>
 
  <div >
    <div class="header-top">
      <div class="container">
        <div class="row" >
          <div class="col-md-12 col-lg-5">
            <div class="header-top-welcome">
              <p>Welcome to Ecomart in Your Dream Online Store!</p>
            </div>
          </div>
          <div class="col-md-5 col-lg-3"></div>
          <div class="col-md-7 col-lg-4">
            <ul class="header-top-list">
              <li><router-link :to="{name: 'seller.apply'}" href="offer.html">Seller Apply</router-link></li>
              <li><a href="faq.html">need help</a></li>
              <li><a href="contact.html">contact us</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>