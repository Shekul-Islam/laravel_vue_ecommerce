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
      console.log('Order Info:', orderInfo);
      try {
        this.loading = true;
        const response = await axiosInstance.post('/orders', orderInfo);
    
        if (response.status === 200) {
          const result = response.data.result;
    
          // ডেটা টাইপ যাচাই করুন
          if (typeof result === 'string' && result.startsWith('http')) {
            // যদি এটি একটি স্ট্রিং URL হয়
            window.location.href = result;
          } else if (typeof result === 'object' && result.id) {
            // যদি এটি একটি অবজেক্ট হয়
            console.log('Order created successfully:', result);
            router.push({ name: 'user.thankYou' }).catch(err => console.log('Router error:', err));
            const cart = useCart();
            cart.removeAllItems();
          } else {
            console.error('Unexpected result format:', result);
          }
    
          return response;
        } else {
          this.backendErrors = response.data.message;
          console.error('Backend Error:', response.data.message);
        }
      } catch (error) {
        console.error('Error during order submission:', error.response?.data || error.message);
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