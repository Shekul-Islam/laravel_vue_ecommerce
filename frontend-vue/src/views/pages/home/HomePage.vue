<script setup>
import {
  BannerPart,
  CategoryItems,
  RecentSoldItems,
  PopularItems,
  FeatureItems,
  NewItems,
} from "@/components/home";

import axiosInstance from "@/services/axiosService";

import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const homePageDatas = ref("");
const topbarDatas = ref("");

const getHomePageData = async () => {
  try {
    const res = await axiosInstance.get(`/posts`);
    homePageDatas.value = res.data.result;
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getHomePageData();
});

// topbar-api

const getTopbarData = async () => {
  try {
    const response = await axiosInstance.get(`/sliders`);
    if (response?.data.result) {
      topbarDatas.value = response.data.result;
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getTopbarData();
});

// topbar-api
</script>

<template>

  <div>
    <span >
<<<<<<< HEAD
      {{ topbarDatas.data }}
=======
      
      <span>
        <BannerPart :albab="topbarDatas.data" />
      </span>
      <span>
        <CategoryItems :albab="topbarDatas.data" />
      </span>
      <span><RecentSoldItems /></span>
      <span><PopularItems /></span>
      <span><FeatureItems /></span>
      <span><NewItems /></span>
    </span>
  </div>

  <!-- <div>
    <span >
      
>>>>>>> 06a5a79d8d19c8be2a3460355ccd21c2653c1732
      <span>
        <BannerPart :albab="topbarDatas.data" />
      </span>
      <span>
        <CategoryItems :albab="topbarDatas.data" />
      </span>
      <span><RecentSoldItems /></span>
      <span><PopularItems /></span>
      <span><FeatureItems /></span>
      <span><NewItems /></span>
    </span>
  </div> -->


   <!-- <div>
    <span v-for="(tbdata, index) in topbarDatas.data" :key="index">
      {{ tbdata }}
      <span>
        <BannerPart :tbdata="tbdata" />
      </span>
      <span>
        <CategoryItems :tbdata="tbdata" />
      </span>
      <span><RecentSoldItems /></span>
      <span><PopularItems /></span>
      <span><FeatureItems /></span>
      <span><NewItems /></span>
    </span>
  </div> -->
</template>

<style scoped></style>
