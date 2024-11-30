import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService";

export const useLandingPageStore = defineStore("landing-page", {
  state: ()=> ({
    landingPageData: {},
  }),
  persist: true,


  actions: {
    async homeData (){
     try {
      const res = await axiosInstance.get('/sliders');
      if (res?.data?.success){
        this.landingPageData = res?.data?.result
        
      }
      
     } catch (error) {
      console.log(error);
     } 
    }
  }
})