<script setup>

import axiosInstance from '@/services/axiosService';

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';




const route = useRoute();
const homePageDatas = ref("");

const getHomePageData = async ()=> {
try {
  const res = await axiosInstance.get(`/posts`)
  homePageDatas.value = res.data.result;
  console.log(res);


}catch (error){
  console.log(error);

}

};

onMounted(()=>{
  getHomePageData();
});

</script>


<template>

  <div>
   {{ getHomePageData }}
  </div>

  

</template>


<style scoped>

</style>