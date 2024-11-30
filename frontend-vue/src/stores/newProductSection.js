import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService"
import { Pagination } from "swiper/modules";

export const newProductStore = defineStore ("new-product", {
    state: ()=> ({
        newProduct: {},
    }),

    persist: true,

    actions: {
        async productData () {
            try {   
            const res = await axiosInstance.get("/products", {params: {Pagination:5}});
            if(res?.data?.success){
                this.newProduct = res?.data?.result
            }
            } catch (error) {
                console.log(error);
                
            }
        }
    }
})