import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService";

export const useLoginStore = defineStore ("login-page", {
  state: ()=> ({
    loginPageData: {},
  }),

  persist: true,

  actions: {
    async loginData () {
      try {
        const res = await axiosInstance.post("/users/login");
        if(res?.data?.success){
          this.loginPageData = res?.data?.result

          console.log(this.loginPageData);
          
        }
        console.log(res);
        
      } catch (error) {
        console.log(error);
        
      }
    }
  }
})