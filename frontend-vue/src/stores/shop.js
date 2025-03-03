// All Import File  Code Is Here......................................................................................................
import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService.js";

export const useShop = defineStore("shop", {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({
    products: [],
    sideBar: [],
    loading: false
  }),

  actions: {
    // API Calling Code Is Here.....................................................................................................

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
          this.products = res?.data?.result;
          return res?.data?.result
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
    },

    async sideBarData() {
      try {
        const res = await axiosInstance.get("/products/shop-sidebar");
        if (res.status === 200) {
          this.sideBar = res.data;
        }
      } catch (error) {
        console.log(error);
        
      }
    },


    async sideBarAttributeData() {
      try {
        const res = await axiosInstance.get("/attributes");
        console.log(res);
        if (res.status === 200) {
           return res.data.result.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

  },
});
// All Function  Code Is Here.....................................................................................................
