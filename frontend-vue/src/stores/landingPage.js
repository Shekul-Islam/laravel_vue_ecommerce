import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService";

export const useLandingPageStore = defineStore("landing-page", {
  state: ()=> ({
    landingPageDatas: {},
  }),

  persist: true,


  actions: {
    async homeData (){
     try {
      const res = await axiosInstance.get('/landing-pages');
      if (res?.data?.success){
        this.landingPageDatas = res?.data?.result

        console.log(this.landingPageDatas);
        
      }
      console.log(res);
      
     } catch (error) {
      console.log(error);
      
     } 
    }

  }
})