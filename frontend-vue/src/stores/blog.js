import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService";

export const useBlogStore = defineStore ('blog-page', {
  state: ()=> ({
    blogs: {},
  }),

  persis: true,

  actions: {
    async blogData () {
      try {
        const res = await axiosInstance.get('blog-posts');
        if(res?.data?.success){
          this.blogs = res?.data?.result;

          console.log(this?.blogs);

        }
      } catch (error) {
        console.log(error);
        
      }
    },
    findBlog(blogKey) {
      return this?.blogs?.data?.find((i)=> i.key == blogKey)
    }
  },
})