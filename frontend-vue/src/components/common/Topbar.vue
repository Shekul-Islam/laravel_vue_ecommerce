<script setup>

import {ref, onMounted, watch} from 'vue';
import { useSettingStore } from '@/stores';

const setting = useSettingStore();

watch (()=> setting?.settings, ()=> {
  console.log(setting?.settings);
})


onMounted (()=> {
  setting.getData();
})



</script>

<template>
  
 
  <div >
    <div class="header-top">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-lg-5">
            <div class="header-top-welcome">
             <p>{{ setting?.settings?.data?.find((i)=> i.key=="top_header_text").value }}</p>
            </div>
          </div>
          <div class="col-md-5 col-lg-3"></div>
          <div class="col-md-7 col-lg-4">
            <ul class="header-top-list">
              <li><router-link :to="{name: 'seller.apply'}" href="offer.html">Seller Apply</router-link></li>
              <li><a :href="setting?.findSetting('fb_page_link_for_fb_page_card')" target="_blank">
                <i class="fab fa-facebook"></i>
                </a></li>
                <li><a :href="setting?.findSetting('footer_email')" target="_blank">
                <i class="fas fa-envelope"></i>
                </a></li>
                <li><a :href="setting?.findSetting('phone_number')" target="_blank">
                <i class="fas fa-phone"></i>
                </a></li>
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>