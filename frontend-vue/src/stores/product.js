import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService"
import { Pagination } from "swiper/modules";

export const productStore = defineStore ("product-page", {
    state: ()=> ({
        products: {},
    }),

    persist: true,

    actions: {
        async productsData () {
            try {   
            const res = await axiosInstance.get("/products");
            if(res?.data?.success){
                this.products = res?.data?.result
                console.log(this.products);
                
            }
            } catch (error) {
                console.log(error);
                
            }
        }
    }
})