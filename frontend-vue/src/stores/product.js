import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService"
import { Pagination } from "swiper/modules";

export const useProduct = defineStore ("product-page", {
    state: ()=> ({
        products: {},
        singleProduct: {},
        productVariationData: {},
        relatedProducts: {},

    }),

    persist: true,

    actions: {
        async getProductsData () {
            try {   
            const res = await axiosInstance.get("/products");
            if(res?.data?.success){
                this.products = res?.data?.result
                console.log(this.products);
                
            }
            } catch (error) {
                console.log(error);
                
            }
        },

        async getCategoryData (categoryId) {
            try {   
            const res = await axiosInstance.get(`/products`, 
                {params: {
                    category_ids: [categoryId],
                }});
            if(res?.data?.success){
                this.relatedProducts = res?.data?.result 
                return res?.data?.result;
                
                
            }
            } catch (error) {
                console.log(error);
                
            }
        },

        async getSingleProductData() {
            
            try {   
                const res = await axiosInstance.get(`/products`);
                if (res?.data?.success) {
                    this.singleProduct = res?.data?.result;
                    return res?.data;
                }
            } catch (error) {
                console.error("Error fetching single product data:", error);
            }
        },
        
        
        async getVariationData(productVariationData) {
      
            this.loading = true;
            try {
              
              const res = await axiosInstance.get(`/products/variations`, {
                params: {
                  "product_id": productVariationData.product_id,
                  "attribute_id_1": productVariationData.attribute_id_1,
                  "attribute_id_2": productVariationData.attribute_id_2,
                  "attribute_id_3": productVariationData.attribute_id_3,
                  "attribute_value_id_1": productVariationData.attribute_value_id_1,
                  "attribute_value_id_2": productVariationData.attribute_value_id_2,
                  "attribute_value_id_3": productVariationData.attribute_value_id_3
                },
              });
      
              if (res?.status === 200) {
                return res?.data;
              }
              } catch (error) {
                  console.log(error);
              } finally {
                this.loading = false;
              }
          },        
    }
})
