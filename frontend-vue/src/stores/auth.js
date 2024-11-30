import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService";
import { Loading } from "element-plus/es/components/loading/src/service.mjs";
export const useAuth = defineStore('auth', {
  state: () => ({
    user:{},
    Loading: false,
  }),

  persist: {
    path: ["user"],
  },
 actions: {
  async login(formData){
  // console.log(formData);
  try {
    const res = await axiosInstance.post(
     "/user/login",
      formData
    );
// console.log(res);

    if (res.status === 200) {

      this.user = res.data;

      return new Promise((resolve) => {
        resolve(res.data);
      });
    }

  } catch (error) {
    // console.log(error);
    if (error.response.data){

      return new Promise((reject) => {
        reject(error.response.data.errors);
      });
    }
  }
  },

  async logout () {
    this.Loading = true;
   try {
    const res = await axiosInstance.post("/user/logout");
      console.log(res);
      
   } catch (error) {

   }finally{
    this.Loading = false;
   }
   },
 },
  
});

