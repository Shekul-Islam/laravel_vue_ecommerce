import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService";

export const popularStore = defineStore('popular-page', {
  state: ()=> ({
    popularPageData: {},
  }),
  persist: true,

  actions: {
    async popularData () {
      const res = await axiosInstance.get('/brands');
      if(res?.data?.success){
        this.popularPageData = res?.data?.result

        console.log(this.popularPageData);
      }
    }
  }
})