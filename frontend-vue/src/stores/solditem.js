import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService";

export const soldItemStore = defineStore ("sold-item", {
  state: () => ({
    soldItemData: {},
  }),

  persist: true,


  actions: {
    async soldData () {
    try {
      const res = await axiosInstance.get('/products');
      if (res?.data?.success) {
        this.soldItemData = res?.data?.result
      }
    } catch (error) {
      
    }
      
    }
  }
})