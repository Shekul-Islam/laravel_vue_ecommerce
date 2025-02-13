<script setup>

import {ref, onMounted} from 'vue';
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/stores';

const setting = useSettingStore();
const phone = ref('');
const email = ref('');
const description = ref('');

// watch (()=> setting?.settings, ()=> {
//   console.log(setting?.settings);
// })

const getSettingsData = async () => {
  const settingData = await setting.getData();
  
  settingData.data.forEach((ele)=>{
    if (ele.key == 'phone'){
      phone.value = ele.value;
    }
    if (ele.key == 'email'){
      email.value = ele.value;
    }
    if (ele.key == 'description'){
      description.value = ele.value;
    }
  })
}


onMounted (()=> {
  setting.getData();
  getSettingsData();
})



</script>

<template>
  
 
  <div >
    <div class="header-top">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-lg-6">
            <div class="header-top-welcome">
             <p>{{ description }}</p>
            </div>
          </div>
          
          <div class="col-md-7 col-lg-4">
            <ul class="header-top-list">
                <li v-if="email">
                  <a :href="'mailto:'+ email">
                    mail:
                    <i class="fas fa-envelope"></i>
                  </a>
                </li>

                <li v-if="phone">
                  <a :href="'tel:' + phone ">
                    hot line :
                     <i class="fas fa-phone"></i>
                    
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