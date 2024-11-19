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
      {{ topbarDatas.data[0] }}
      <span>
        <BannerPart :albab="topbarDatas.data[1]" />
      </span>
      <span>
        <CategoryItems :albab="topbarDatas.data[3]" />
      </span>
      <span><RecentSoldItems /></span>
      <span><PopularItems /></span>
      <span><FeatureItems /></span>
      <span><NewItems /></span>
    </span>
  </div>


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
