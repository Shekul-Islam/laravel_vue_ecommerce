<script setup>
import {
  BannerSection,
  CategorySection,
  ProductSection,
  NewProductSection,
} from "@/components/home";

import axiosInstance from "@/services/axiosService";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";


const route = useRoute();
const topbarDatas = ref("");

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
      {{ topbarDatas.data }}
      <span>
        <BannerSection :albab="topbarDatas.data" />
      </span>

      <span>
        <CategorySection :albab="topbarDatas.data" />
      </span>

      <span>
        <ProductSection/>
        </span>

      <span>
        <NewProductSection/>
      </span>
    </span>
  </div>

  
</template>

<style scoped></style>
