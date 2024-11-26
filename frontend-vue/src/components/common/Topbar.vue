<script setup>

import {ref, onMounted} from 'vue';
import { useSettingStore } from '@/stores';

const setting = useSettingStore();

console.log(setting?.settings);


onMounted (()=> {
  setting.getData();
})



</script>

<template>
  
 
  <div >
    {{setting?.settings }}
    <div class="header-top">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-lg-5">
            <div class="header-top-welcome">
             <p>{{ setting?.settings?.data?.find((i)=> i.key=="header_text_two").value }}</p>
            </div>
          </div>
          <div class="col-md-5 col-lg-3"></div>
          <div class="col-md-7 col-lg-4">
            <ul class="header-top-list">
              <li><router-link :to="{name: 'seller.apply'}" href="offer.html">Seller Apply</router-link></li>
              <li><a href="faq.html">{{ setting?.findSetting("phone_number") }}</a></li>
              <li><a href="contact.html">{{ setting?.findSetting("messenger_id")  }}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>