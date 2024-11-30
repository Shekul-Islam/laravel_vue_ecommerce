import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService";

export const shopStore = defineStore ("shop-page", {
  state: ()=> ({
    shops: {},
  }),

  persist: true,

  actions: {
    async shopData () {
      try {
        const res = await axiosInstance.get('/products/shop-sidebar');
        if(res?.data?.success) {
          this.shops = res?.data?.result
          console.log(this?.shops);
        }

      } catch (error) {
        console.log(error);
        
      }
    }
  }
})