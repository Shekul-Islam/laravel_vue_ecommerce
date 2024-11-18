<script setup>
import BannerPart from '@/components/home/BannerPart.vue';
import CategoryItems from '@/components/home/CategoryItems.vue';
import RecentSoldItems from '@/components/home/RecentSoldItems.vue';
import PopularItems from '@/components/home/PopularItems.vue';
import FeatureItems from '@/components/home/FeatureItems.vue';
import NewItems from '@/components/home/NewItems.vue';
</script>
<template>
  <div>
    <BannerPart/>

    <CategoryItems/>

    <RecentSoldItems/>

    <PopularItems/>

    <FeatureItems/>

    <NewItems/>
  </div>
</template>

<style scoped></style>
