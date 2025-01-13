import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService";

export const soldItemStore = defineStore ("sold-item", {
  state: () => ({
    soldItemData: {},
    products: [],
  }),

  persist: true,


  actions: {
    async soldData () {
    try {
      const res = await axiosInstance.get('/sections');
      
      if (res?.data?.success) {
        this.soldItemData = res?.data?.result
      }
    } catch (error) {
      
    }
      
    },

    async getData(type = "", brand, category, subCategory, attributeIds, price, search, paginateSize) {
            this.loading = true
            
          try {
            const res = await axiosInstance.get(`/products`, {
              params: {
                type,
                price,
                paginate_size      : paginateSize,
                brand_ids          : brand,
                category_ids       : category,
                sub_category_id    : subCategory,
                attribute_value_ids: attributeIds,
                search_key         : search,
              },
            });
            if (res.status === 200) {
              this.products = res.data.result;
              return res.data.result
            }
          } catch (error) {
            if (error.response.data) {
              return new Promise((reject) => {
                reject(error.response.data);
              });
            }
          } finally {
            this.loading = false
          }
        }

  }
})