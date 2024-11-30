import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService";


export const categoryStore = defineStore ("category-item", {
  state: ()=> ({
    categoryPageData: {},
  }),

  persist: true,

  actions: {
    async categoryData (){
      try {
        const res = await axiosInstance.get('/categories');
        if (res?.data?.success){
          this.categoryPageData = res?.data?.result

         
        }
       
        
        
      } catch (error) {
        console.log(error);
        
      }
    }
  }
})