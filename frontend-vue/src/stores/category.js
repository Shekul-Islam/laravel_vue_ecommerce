import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService";


export const useCategory = defineStore ("category-item", {
  state: ()=> ({
    categoryPageData: {},
  }),

  persist: true,
  
  actions: {
    async getCategories (){
      try {
        const res = await axiosInstance.get('/categories');
        if (res?.data?.success){
          this.categoryPageData = res?.data?.result

          console.log(this.categoryPageData);
          
          
         
        }
       
        
        
      } catch (error) {
        console.log(error);
        
      }
    }
  }
})