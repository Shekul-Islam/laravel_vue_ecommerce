<script setup>
import axiosInstance from "@/services/axiosService.js";
import { useCart, useOrder, useAuth, useModal, useCommonIsToggleFunctionality, useNotification } from "@/stores";
import { storeToRefs } from "pinia";
import { onMounted, onUpdated, onBeforeUpdate, onUnmounted, computed, watch  } from "vue";
// validation error
import * as yup from "yup";
import { ref } from 'vue';
import { useRouter } from "vue-router";
// validation error
import { Form, Field } from "vee-validate";




 

const commonIsToggleFunctionality             = useCommonIsToggleFunctionality();
const { cartSideBar }                         = storeToRefs(commonIsToggleFunctionality);
const isDesktop                               = ref(window.innerWidth > 768);
const modal                                   = useModal()
const router                                  = useRouter()
const auth                                    = useAuth();
const { isOrder }                             = storeToRefs(auth);
const cart                                    = useCart();
const { cartItem, totalPrice, cartItemCount } = storeToRefs(cart);
const order                                   = useOrder();
const { storeOrder, backendErrors, loading }  = storeToRefs(order);
const isLoading                               = ref(false);
const clickIsOrder                            = ref(true);
const isFreeShippingChecking                  = ref();
const blockSmsErrorMessage                    = ref();
const notify                                  = useNotification();


const userToken           = ref(localStorage.getItem('user_token'));
const name                = ref(auth?.user?.user?.name);
const phoneNumber         = ref(auth?.user?.user?.phone_number);
const district            = ref("");
const address             = ref("");
const payment_gateway_id  = ref(1);
const delivery_gateway_id = ref(1);
const deliverCharge       = ref();
const deliveryInfo        = ref([]);
const payment_gateways    = ref([]);
const orderNote           = ref("");



// coupon 
const showCouponForm       = ref(false);
const couponDiscountAmount = ref();
const coupon               = ref('');
const couponErrorMessage   = ref();
const couponId             = ref();
const isOpen               = ref(false);

// Refs for the input fields
const nameFieldRef        = ref(null);
const phoneNumberFieldRef = ref(null);
const districtFieldRef    = ref(null);
const addressFieldRef     = ref(null);
const deliveryGatewayRef  = ref(null);
const paymentGatewayRef   = ref(null);

// payment getways details
  const bkash                 = ref('');
  const nogod                 = ref('');
  const rocket                = ref('');
  const cod                   = ref('');
  const paymentGetwayName     = ref('');
  const paymentSendNumber     = ref();
  const paymentReceivedNumber = ref();

const isOpenCoupon = () =>{
  isOpen.value = !isOpen.value;
}
// if destop version is available then show this order note start
const checkScreenSize = () => {
  isDesktop.value = window.innerWidth > 768;
};

    const getDeliveryGateway = async () => {
      try {
        const res = await axiosInstance.get("/delivery-gateway");
        deliveryInfo.value = res.data.result;

        if (cartItem.value.some((item) => item.free_shipping === 1)) {
          delivery_gateway_id.value = 0;
          deliverCharge.value = 0;
        } else {
          delivery_gateway_id.value = res.data.result.data[0].id;
          deliverCharge.value = res.data.result.data[0].delivery_fee;
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getDeliveryAmount = async () => {
      try {
        const res = await axiosInstance.get(`/delivery-gateway/price/${delivery_gateway_id.value}`);
        deliverCharge.value = res.data.result.delivery_fee;
      } catch (error) {
        console.log(error);
      }
    };

    const getPaymentGetway = async () => {
      try {
        const res = await axiosInstance.get(`/payment-gateway`);
        payment_gateways.value = res.data.result;
      } catch (error) { }
    };

    const selectedGetway = (payment_gateway) => {
      payment_gateway_id.value = payment_gateway.id;

      if (payment_gateway.name === 'Bkash') {
        paymentGetwayName.value = payment_gateway.name;
      }
      if (payment_gateway.name === 'Nagad') {
        paymentGetwayName.value = payment_gateway.name;
      }
      if (payment_gateway.name === 'Cash On Delivery') {
        paymentGetwayName.value = payment_gateway.name;
      }
    }

// order work start here 

    const orderSubmited = async () => {
  // ভ্যারিয়েবল তৈরি করে ডেটা সংরক্ষণ
  console.log(name.value);
  
  const orderData = {
    userToken           : userToken.value,
    customer_name       : name.value,
    phone_number        : phoneNumber.value,
    district            : district.value,
    address_details     : address.value,
    note                : orderNote.value,
    items               : cartItem.value,
    coupon_id           : couponId.value,
    totalPrice          : totalPrice.value,
    payment_gateway_id  : payment_gateway_id.value,
    delivery_gateway_id : delivery_gateway_id.value == 0 ? null : delivery_gateway_id.value,
    deliverCharge       : deliverCharge.value ? deliverCharge.value : null,
    payment_send_number : paymentSendNumber.value,
    payment_received_number: paymentReceivedNumber.value,
  };

  // ডেটা `storeOrder`-এ প্রেরণ
  const res = await order.storeOrder(orderData);
  console.log(orderData);
  

  if (res.status == 200) {
    clickIsOrder.value = false;
  } else {
    blockSmsErrorMessage.value = res;
    notify.Error(`${res}`);
  }
};

/*=======================
        isLoading
=======================*/

const placeOrder = async() => {
      isLoading.value = true;
      try {
        await orderSubmited();
        // Handle successful order submission
      } catch (error) {
        // Handle error
        console.error("Order submission failed:", error);
      
       } finally {
        isLoading.value = false; // Hide the preloader
      }

      // if (Object.keys(auth.user).length > 0) {
      // }else{
      //   const res = await auth.login({phone_number: phoneNumber.value, name: name.value});
      //   if (res?.status == 200) {
      //     modal.toggleModal()
      //   }
      // }

    };



    const handleOrderSubmitted = () => {
      orderSubmited(); 
    }
/*=======================
        isLoading
=======================*/


// order work end here 

// if destop version is available then show this order note end

// Scroll to the first error field
    const scrollToErrorField = () => {
      if (!name.value) {
        nameFieldRef.value?.scrollIntoView({ behavior: "smooth", block: "center" });
        nameFieldRef.value?.focus();
        return;
      }
      if (!phoneNumber.value) {
        phoneNumberFieldRef.value?.scrollIntoView({ behavior: "smooth", block: "center" });
        phoneNumberFieldRef.value?.focus();
        return;
      }
      if (!district.value) {
        districtFieldRef.value?.scrollIntoView({ behavior: "smooth", block: "center" });
        districtFieldRef.value?.focus();
        return;
      }
      if (!address.value) {
        addressFieldRef.value?.scrollIntoView({ behavior: "smooth", block: "center" });
        addressFieldRef.value?.focus();
        return;
      }
      if (!delivery_gateway_id.value) {
        deliveryGatewayRef.value?.scrollIntoView({ behavior: "smooth", block: "center" });
        deliveryGatewayRef.value?.focus();
        return;
      }
      if (!payment_gateway_id.value) {
        paymentGatewayRef.value?.scrollIntoView({ behavior: "smooth", block: "center" });
        paymentGatewayRef.value?.focus();
        return;
      }
    };


// cart delete 

    const deleteCart = (index) => {
      cart.destroy(index);
    };

    const cartIncrement = (index) => {
      cart.increment(index);
    };

    const cartDecrement = (index) => {
      cart.decrement(index);
    };

// coupon 

    const couponCalculate = async() => {
      try {

          const res = await axiosInstance.get(`/coupons/check?coupon_code=${coupon.value}&cart_total_amount=${totalPrice.value}`);   
          console.log(res);
          
          if (res.status == 200) {
          couponDiscountAmount.value = res.data.result.discount_amount;
          couponId.value = res.data.result.coupon_id;
          isOpen.value = false

        }else{
          couponErrorMessage.value = res.data.message 
        }
      } catch (error) {
        couponErrorMessage.value = error.response.data.message      
      }
    }


// validation error
    const schema = yup.object({
      name               : yup.string().required("আপনার নাম IS REQUIRED"),
      phone              : yup.string().required("আপনার মোবাইল নাম্বার IS REQUIRED"),
      district           : yup.string().required("District Feild Is Required"),
      address            : yup.string().required("আপনার সম্পূর্ণ ঠিকানা IS REQUIRED"),
      delivery_gateway_id: yup.string().required("Delivery Gateway Feild Is Required"),
      payment_gateway_id : yup.string().required("Payment Gateway Feild Is Required"),
    });

// has free shipping function 
    const hasFreeShipping = () => {
      return cartItem.value.some(item => item.free_shipping === 1);
    }


// total price section hide and show 

    // const showTotalPriceSection = () => {
    //   const hideAndShowTopSection    = document.querySelector('.hide_and_show_top_section');
    //   const hideAndShowButtomSection = document.querySelector('.hide_and_show_bottam_section');
    //   const scrollScreenSize         = window.screen.width;
      
    //   if (scrollScreenSize < 768) {            
    //     hideAndShowTopSection.classList.add('price_section_hide');
    //     hideAndShowButtomSection.classList.remove('price_section_show');
    //   }else{
    //     hideAndShowButtomSection.classList.add('price_section_hide');
    //     hideAndShowTopSection.classList.remove('price_section_show');
    //   }
    // }

// total price section hide and show 

// is cart item empty then fall back start
//  const isCartItemEmpty = () => {
//   if (cartItem.value.length <= 0) {
//     router.push({ name:'shopPage'});
//   }
//  }
// is cart item empty then fall back end

// free shipping section show and hide start
    const freeShippingChecking = async () => {
      const res = await axiosInstance.get("/free-delivery/get");
      isFreeShippingChecking.value = res.data.result;    
      delivery_gateway_id.value = 1;   
      getDeliveryAmount();
    }
// free shipping section show and hide end

// get Selected Delivery Id start
    const getSelectedDeliveryId = (deliveryId) => {
      delivery_gateway_id.value =deliveryId
      // delivery_gateway_id.value = deliveryId;
      // getDeliveryAmount();
      // if (deliveryId != 3) {
      // }
      if (deliveryId != 3 && isFreeShippingChecking.value) {
        delivery_gateway_id.value = deliveryId;
        getDeliveryAmount();
      }else if (deliveryId == 3 && isFreeShippingEligible.value){
        delivery_gateway_id.value = deliveryId;
        getDeliveryAmount();
      }
    }

    const isFreeShippingEligible = computed(() => {
      return (isFreeShippingChecking.value?.type === 'quantity' && cartItemCount.value >= isFreeShippingChecking.value.quantity) ||
            (isFreeShippingChecking.value?.type === 'price' && totalPrice.value >= isFreeShippingChecking.value.price);
    });
    
    // Automatically select free shipping when eligible

    watch(isFreeShippingEligible, (newVal) => {
  if (newVal) {        
    const freeShippingOption = (deliveryInfo.value?.data || []).find((delivery) => delivery.id === 3);
    if (freeShippingOption) {
      delivery_gateway_id.value = freeShippingOption.id;
      getDeliveryAmount();
    }
  } else if (delivery_gateway_id.value === 3) {
    delivery_gateway_id.value = 1; 
    getDeliveryAmount();
  }
});



    // watch(isFreeShippingEligible, (newVal) => {
    //   if (newVal) {        
    //     const freeShippingOption = deliveryInfo.value.data.find((delivery) => delivery.id === 3);
    //     if (freeShippingOption) {
    //       delivery_gateway_id.value = freeShippingOption.id;
    //       getDeliveryAmount();
    //     }
    //   } else if (delivery_gateway_id.value === 3) {
    //     delivery_gateway_id.value = 1; 
    //     getDeliveryAmount();
    //   }
    // });
    
// get Selected Delivery Id end

  onMounted(() => {
    getDeliveryGateway();
    getPaymentGetway();
    modal.Modalclose();
    // showTotalPriceSection();  
    freeShippingChecking();  
    let uniqueID = localStorage.getItem('uniqueVisitorID')
    window.addEventListener('resize', checkScreenSize);
    commonIsToggleFunctionality.cartSideBar = false;
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize);
  });

   








</script>

<template>
  <div class="testing">
             <!-- pre loader -->
        <div v-if="isLoading" class="preloader">
          <div class="loader"></div>
        </div>
            <!-- pre loader -->
      
            <!--=====================================
                    BANNER PART START
        =======================================-->
        <section class="inner-section single-banner" style="background: url(images/single-banner.jpg) no-repeat center;">
            <div class="container">
                <h2>checkout</h2>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li class="breadcrumb-item"><a href="shop-4column.html">shop grid</a></li>
                    <li class="breadcrumb-item active" aria-current="page">checkout</li>
                </ol>
            </div>
        </section>
        <!--=====================================
                    BANNER PART END
        =======================================-->


        <!--=====================================
                    CHECKOUT PART START
        =======================================-->
        <section class="inner-section checkout-part">
            <div class="container">
               <!-- checkoutfirstpart  -->
               <div class="row">
                    <div class="col-lg-12">
                        <div class="alert-info">
                            <p>Returning customer? <a href="login.html">Click here to login</a></p>
                        </div>
                    </div>
                    <div class="container mt-5 checkout-page">
                      <div class="row">
                        <!-- Left Section -->
                        <div class="col-md-9 left-section border-black">
                          <table class="table table-bordered">
                            <thead>
                              <tr class="checkout-heading">
                                <th>Sl</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Unit Price</th>
                                <th>Quantity</th>
                                <th scope="col">Total Price</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(product, index) in cartItem" :key="index" class="checkout-data">
                                <td>{{ 1 + index }}</td>
                                <td><img :src="product.image" alt="product.image" class="img w-100 h-100"></td>
                                <td>{{ product.name }}</td>
                                <td>{{ Math.round(product.sell_price) }}</td>
                                <td>
                                 <div class="d-flex align-items-center">
                                    <button class="btn btn-outline-secondary btn-sm"
                                       title="Quantity Minus"
                                       @click.prevent="cartDecrement(index)">
                                       <i class="fas fa-minus"></i>
                                    </button>
                                    <input
                                      title="Quantity Number"
                                       type="text"
                                       name="quantity"
                                       :disabled="product.quantity === 1 ? true : false"
                                       :value="product.quantity"
                                      class="form-control form-control-sm mx-2 text-center" style="width: 50px;">
                                    <button class="btn btn-outline-secondary btn-sm"
                                     title="Quantity Plus"
                                       @click.prevent="cartIncrement(index)">
                                    <i class="fas fa-plus"></i>
                                    </button>
                                  </div>
                                </td>
                                <td>{{ (Math.round(product.sell_price)) * product.quantity }}</td>
                                <td><button @click.prevent="deleteCart(index)" class="btn btn-danger btn-sm">Delete</button></td>
                              </tr>
                            </tbody>
                          </table>
                          
                          <div class="row">
                            <div class="col-md-6">
                                  <router-link :to="{name: 'shop'}" class="btn btn-link">← Continue Shopping</router-link>
                              <div class="mt-3 coupon-section">
                                <input type="text" class="form-control d-inline-block w-75" placeholder="Apply Coupon . . ." v-model="coupon">
                                <button class="btn btn-primary small-btn" @click.prevent="couponCalculate">Apply</button>
                                <span v-if="couponErrorMessage" class="text-danger ps-3">{{ couponErrorMessage }}</span>
                              </div>
                              
                            </div>
                            <div class="col-md-6">
                              <div class="left mt-5 my-3 hide_and_show_bottam_section ">
                                <h5 class="text-wrap text-center">Order Summery</h5>
                                <div class="line"></div>
                                <div class="d-flex justify-content-between my-2">
                                  <p class="text-danger">Sub Total </p>
                                  <p class="text-danger">{{ cart.totalPrice }} <span class="font-weight-bold">TK</span></p>
                                </div>
                                <div class="d-flex justify-content-between my-2">
                                  <p class="text-danger">Delivary Charge</p>
                                  <p class="text-danger">{{ deliverCharge }}<span class="font-weight-bold">TK</span></p>
                                </div>
                                <div class="d-flex justify-content-between my-2" v-if="couponDiscountAmount">
                                  <p class="text-danger">Coupon Discount</p>
                                  <p class="text-danger"> -({{ couponDiscountAmount ?  cart.totalPrice - couponDiscountAmount : 0 }})<span class="font-weight-bold">TK</span></p>
                                </div>
                                <div class="line"></div>
                                <div class="d-flex justify-content-between my-2">
                                  <p class="text-danger">Total </p>
                                  <p class="text-danger"><span class="flag-discount me-4">Amount = </span> {{ couponDiscountAmount ?  Number(deliverCharge) + couponDiscountAmount : cart.totalPrice + Number(deliverCharge) }}  <span class="font-weight-bold">TK</span></p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="mt-4 notes-section" v-if="isDesktop">
                                <h6>প্রয়োজনীয় কোনো তথ্য দিতে এখানে লিখুন:</h6>
                                <textarea class="form-control" rows="3" placeholder="দয়া করে আপনার অর্ডারের জন্য ..." v-model="orderNote"></textarea>
                              </div>
                        </div>
                        <!-- Right Section -->
                        <div class="col-md-3 right-section border-black">
                          <Form
                            @submit.prevent="placeOrder"
                            :validation-schema="schema"
                            v-slot="{ errors, isSubmitting }"
                          >
                            <h5 class="border-bottom pb-2">অর্ডার কনফার্ম করতে...</h5>
                            <div class="mb-3">
                              <label for="name" class="form-label">নাম:</label>
                              <Field 
                              name="name" type="text" 
                              id="name" class="form-control" 
                              placeholder="এখানে নাম লিখুন..."
                              :class="{ 'is-invalid': errors.name }"
                              v-model="name"
                              />
                            <span class="text-danger" v-if="errors.name">{{ errors.name }}</span>
                            </div>

                            <div class="mb-3">
                              <label for="phone" class="form-label">মোবাইল নাম্বার:</label>
                              <Field 
                              name="phone" type="text" 
                              id="phone" class="form-control" 
                              placeholder="এখানে মোবাইল নাম্বার লিখুন..."
                              :class="{ 'is-invalid': errors.phone }"
                              v-model="phoneNumber"
                              />
                              <span class="text-danger" v-if="errors.phone">{{ errors.phone }}</span>
                              <span class="text-danger" v-if="backendErrors?.phone_number">{{ backendErrors.phone_number[0] }}</span>
                            </div>

                            <div class="mb-3">
                              <label for="address" class="form-label">ঠিকানা:</label>
                              <Field 
                              name="address" type="text" 
                              id="address" class="form-control" 
                              placeholder="বাড়ি নং, রোড নং, থানা/উপজেলা..."
                              :class="{ 'is-invalid': errors.address }"
                              v-model="address"
                              />
                              <span class="text-danger" v-if="errors.address">{{ errors.address }}</span>
                            </div>

                            <h5 class="border-bottom pb-2">ডেলিভারি চার্জ</h5>
                            <div v-for="(delivery, index) in deliveryInfo.data" :key="index"  @click="getSelectedDeliveryId(delivery.id)">
                              <div class="form-check" v-if="!(delivery.id === 3 && !isFreeShippingEligible)">
                              <input 
                                class="form-check-input me-2"
                                type="radio"  
                                :id="'deliveryGateway_' + delivery.id"
                                name="delivery_gateway_id"  
                                :value="delivery.id"
                                v-model="delivery_gateway_id"
                              >
                              <label  class="form-check-label" :for="'deliveryGateway_' + delivery.id" >{{ delivery.name + ' - ' + Number(delivery.delivery_fee) }} টাকা </label>
                            </div>
                            </div>
                            
                            <div class="secend-box p-2 bg-light mt-3">
                              <div class="">
                                <div class=" fw-bolder text-dark">সম্পূর্ণ নিরাপদ পেমেন্ট</div>
                              </div>
                              <div v-for="(payment_gateway, index) in payment_gateways.data" :key="index">
                                <div class="formRadioControl d-flex align-items-center"  @click="selectedGetway(payment_gateway)">
                                  <input
                                    class="form-check-input payment-getway-input me-2 mt-0"
                                    type="radio"
                                    :id="'paymentGateway_' + index"
                                    name="payment_gateway_id"
                                    :value="payment_gateway.id"
                                    v-model="payment_gateway_id"
                                  >
                                  
                                  <div class="d-flex justify-content-between w-100 align-items-center">
                                    <label class="form-check-label payment-getway-lebal" :for="'paymentGateway_' + index">{{ payment_gateway.name }}</label>
                                    <img :src="payment_gateway.image" alt="" style="width: 40px;">
                                  </div>
                                </div>
                               
                                <div class="form-check" v-if="paymentGetwayName === 'Bkash' && payment_gateway.name === paymentGetwayName">
                                  <span>
                                    <span class="text-danger font-weight-bold">"Upto 300 Taka Discount"</span><br>
                                    <span class="text-danger">➞</span> BKash Agent Number : 01873 046 404 <br>
                                    <div class="paymentgetway-customize-input-feilds">
                                      <span>bKash Send Number</span>
                                      <input type="email" class="form-control form-control-sm" placeholder="017XXXXXXXX" v-model="paymentSendNumber">
                                    </div>
                                    <div class="paymentgetway-customize-input-feilds">
                                      <span>bKash Received Number</span>
                                      <input type="email" class="form-control form-control-sm" placeholder="017XXXXXXXX" v-model="paymentReceivedNumber">
                                    </div>
                                  </span>
                                </div>
                                
                                <div class="form-check" v-else-if="paymentGetwayName === 'Nagad'  && payment_gateway.name === paymentGetwayName">
                                  <span>
                                    <span class="text-danger font-weight-bold">"Upto 300 Taka Discount"</span><br>
                                      <span class="text-danger">➞</span> Nagad Agent Number : 01894 689 206 <br>
                                      <div class="paymentgetway-customize-input-feilds">
                                        <span>Nagad Send Number</span>
                                        <input type="email" class="form-control form-control-sm" placeholder="017XXXXXXXX" v-model="paymentSendNumber">
                                      </div>
                                      <div class="paymentgetway-customize-input-feilds">
                                        <span>Nagad Received Number</span>
                                        <input type="email" class="form-control form-control-sm" placeholder="017XXXXXXXX" v-model="paymentReceivedNumber">
                                      </div>
                                  </span>
                                </div>

                                <!-- <div class="form-check"  v-else-if="paymentGetwayName == 'Cash On Delivery'  &&  payment_gateway.name == paymentGetwayName">
                                  <input type="radio" id="card" name="payment" class="form-check-input">
                                  <label for="card" class="form-check-label">Card Payment</label>
                                </div> -->
                                <div class="form-check box box--top" v-else-if="paymentGetwayName == 'Cash On Delivery'  &&  payment_gateway.name == paymentGetwayName">
                                  <span class="text-danger">➞</span> Pay with cash upon delivery. 
                                </div>
                              </div>
                            </div>

                            <button type="submit" class="btn btn-success txt-white w-100" @click="placeOrder()">
                              <a  class="text-white text-decoration-none">
                                <span v-if="isLoading" class="spinner-border spinner-border-sm mr-1"></span>
                                <span v-else>Place Order</span>
                              </a>
                            </button>
                            <span class="text-danger" v-if="blockSmsErrorMessage">{{ blockSmsErrorMessage }}</span>
                          </Form>
                        </div>
                      </div>
                    </div>

                </div>
               <!-- checkoutfirstpart  -->
                
              
            </div>
        </section>
        <!--=====================================
                    CHECKOUT PART END
        =======================================-->


        <!--=====================================
                    MODAL ADD FORM START
        =======================================-->
                   
        <!--=====================================
                    MODAL EDIT FORM END
        =======================================-->
  </div>
</template>


<style scoped>

.checkout-page-action{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}

/* ===================
  checkout-second
=====================*/

.checkout-heading th{
  font-size: 16px;
  text-align: center;
  padding: 8px;
}
.checkout-data{
  font-size: 16px;
}
.border-black {
  border: 1px solid black;
  padding: 15px;
  background-color: #fff;
}

.checkout-page {
  background-color: #f9f9f9;
  padding: 20px;
}

textarea::placeholder {
  font-size: 14px;
  color: #888;
}

.small-btn {
  padding: 12px 17px; /* Adjust padding */
  font-size: 14px;   /* Adjust font size */
  height: auto;      /* Ensure height adjusts dynamically */
}
.btn-outline-secondary{
  padding: 11px 17px; /* Adjust padding */
  font-size: 14px;   /* Adjust font size */
  height: auto;      /* Ensure height adjusts dynamically */
}
form label {
  font-weight: bold;
}

form .form-check-label {
  font-size: 14px;
}

form button {
  margin-top: 10px;
}
button .router-link {
  color: white; 
  text-decoration: none;
}



.secend-box{
  box-shadow: 3px 5px 9px -3px rgba(0,0,0,0.7);
-webkit-box-shadow: 3px 5px 9px -3px rgba(0,0,0,0.7);
-moz-box-shadow: 3px 5px 9px -3px rgba(0,0,0,0.7);
padding: 15px;
border-top: 4px solid var(--primary) !important;
border-left: 4px solid var(--primary) !important;
border-bottom: 1px solid var(--primary) !important;
border-right: 2px solid var(--primary) !important;
border-top-left-radius: 20px !important;
border-bottom-right-radius: 20px !important;
border: 1px solid var(--primary) !important;
}

.fw-bolder i {
  margin: 0px 5px;
  border: 1px solid var(--primary);
  padding: 5px;
  border-radius: 50%;
  background-color: var(--primary);
  color: white;
}
.line{
  border-bottom: 2px solid var(--primary);
}

</style>