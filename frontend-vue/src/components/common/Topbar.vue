<script setup>

import {ref, onMounted} from 'vue';
import { useSettingStore } from '@/stores';

const setting = useSettingStore();

// watch (()=> setting?.settings, ()=> {
//   console.log(setting?.settings);
// })


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

                <li>
                  <a :href="'mailto:' + setting?.findSetting('footer_email')">
                    <i class="fas fa-envelope"></i>
                  </a>
                </li>

                <li>
                  <a href="tel:+8801784801663">
                    <i class="fas fa-phone"></i>
                    +8801784801663
                  </a>
                </li>
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>