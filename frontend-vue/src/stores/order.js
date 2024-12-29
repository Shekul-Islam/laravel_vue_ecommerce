// All Import File  Code Is Here......................................................................................................
import { defineStore } from 'pinia'
import axiosInstance from "@/services/axiosService.js";
import { useCart } from '@/stores'; 
import router from "@/router";


export const useOrder = defineStore('order', {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({ 
    orderItems: [],
    orderLists: {},
    backendErrors: {},
    loading: false,
    }),

 
  
  actions: {
    // API Calling Code Is Here.....................................................................................................
    
    async storeOrder(orderInfo) {
      console.log(orderInfo);
      try {
        this.loading = true;
        const response = await axiosInstance.post('/orders', orderInfo);
    
        if (response.status === 200) {
          if (response.data.result) {
            let url = response.data.result;
            window.location.href = url; // যদি URL থাকে, সরাসরি সেখানে রিডাইরেক্ট হবে
          } else {
            console.log('Redirecting to:', JSON.stringify({ name: 'user.thankYou' }));
            router.push({ name: 'user.thankYou' }).catch(err => console.log('Router error:', err));
            const cart = useCart();
            cart.removeAllItems();
          }
          return response;
        } else {
          this.backendErrors = response.data.message;
        }
      } catch (error) {
        console.error('Error during order submission:', error);
        return error.response?.data?.message || "Unknown error occurred";
      } finally {
        this.loading = false;
      }
    }, 


       async getOrderList(){
        const response = await axiosInstance.get('/orders');
        if (response.status === 200) {
          this.orderLists = response.data;
        }else{
          console.log(response);
        }

       }
      

     },
  })
  // All Function  Code Is Here.....................................................................................................