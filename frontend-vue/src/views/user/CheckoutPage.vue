<script setup>
import CheckoutModal from "../../components/modal/CheckoutModal.vue";
import axiosInstance from "@/services/axiosService.js";
import { useCart, useOrder, useAuth, useModal, useCommonIsToggleFunctionality, useNotification } from "@/stores";
import { storeToRefs } from "pinia";
import { onMounted, reactive, ref, onUpdated, onBeforeUpdate, onUnmounted, computed, watch  } from "vue";
import { useRouter } from "vue-router";
// validation error
import { Form, Field } from "vee-validate";
import * as yup from "yup";


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
      if (payment_gateway.name === 'Cash On Delivery') {
        paymentGetwayName.value = payment_gateway.name;
      }
      if (payment_gateway.name === 'Nagad') {
        paymentGetwayName.value = payment_gateway.name;
      }  
    }

    // order work start here 
    // Reactive state for the contact list and new contact
const contacts = reactive([]);
const newContact = reactive({
  name: "",
  type: "",
  phone: "",
});

// Function to add or edit a contact
const addContact = () => {
  if (newContact.index !== undefined) {
    // Edit existing contact
    contacts[newContact.index] = { ...newContact };
    delete newContact.index;
  } else {
    // Add new contact
    contacts.push({ ...newContact });
  }
  resetForm();
};

// Function to reset the form
const resetForm = () => {
  newContact.name = "";
  newContact.type = "";
  newContact.phone = "";
};

// Function to edit an existing contact
const editContact = (index) => {
  Object.assign(newContact, { ...contacts[index], index });
};

// Function to remove a contact
const removeContact = (index) => {
  contacts.splice(index, 1);
};





    const orderSubmited = async () => {
     const res =   await order.storeOrder({
          userToken              : userToken.value,
          name                   : name.value,
          phoneNumber            : phoneNumber.value,
          district               : district.value,
          address                : address.value,
          orderNote              : orderNote.value,
          items                  : cartItem.value,
          coupon_id              : couponId.value,
          totalPrice             : totalPrice.value,
          payment_gateway_id     : payment_gateway_id.value,
          delivery_gateway_id    : delivery_gateway_id.value == 0 ? null    : delivery_gateway_id.value,
          deliverCharge          : deliverCharge.value ? deliverCharge.value: null,
          payment_send_number    : paymentSendNumber.value,
          payment_received_number: paymentReceivedNumber.value,
          // campaign_id: campaignId.value,
        });
       if (res.status == 200) {
          clickIsOrder.value = false;
       }else{
        blockSmsErrorMessage.value = res
        notify.Error(`${res}`);      
       }
      
    }

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

// order work end here 

// if destop version is available then show this order note start
const checkScreenSize = () => {
  isDesktop.value = window.innerWidth > 768;
};
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

    
    const couponBtn = () => {
        
        $(".coupon-btn").hide(), $(".coupon-form").css("display", "flex");

        };

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
        const freeShippingOption = deliveryInfo.value.data.find((delivery) => delivery.id === 3);
        if (freeShippingOption) {
          delivery_gateway_id.value = freeShippingOption.id;
          getDeliveryAmount();
        }
      } else if (delivery_gateway_id.value === 3) {
        delivery_gateway_id.value = 1; 
        getDeliveryAmount();
      }
    });

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
                <div class="row">
                    <div class="col-lg-12">
                        <div class="alert-info">
                            <p>Returning customer? <a href="login.html">Click here to login</a></p>
                        </div>
                    </div>

                    <div class="col-lg-12">
                        <div class="account-card">
                            <div class="account-title">
                                <h4>Your order</h4>
                            </div>
                            <div class="account-content">
                                <div class="table-scroll">
                                    <table class="table-list">
                                        <thead>
                                            <tr>
                                                <th scope="col">Serial</th>
                                                <th scope="col">Product</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">brand</th>
                                                <th scope="col">quantity</th>
                                                <th scope="col">Total Price</th>
                                                <th scope="col">action</th>
                                            </tr>
                                        </thead>
                                        
                                        <tbody>
                                            <tr v-for="(product, index) in cartItem" :key="index" class="checkoutTable">
                                                <th scope="row">{{ 1 + index }}</th>
                                                <td class="align-items-center"><a href="" class="img"><img :src="product.image" class="img w-50 h-50" alt="product.image"></a></td>
                                                <td class="text-wrap align-items-center">{{ product.name }}</td>
                                                <td>{{ Math.round(product.sell_price) }}</td>
                                                <td class="align-item-center">{{ product?.campaign_slug }}</td>
                                                <td class="w-25">

                                                  <div class="checkout-page-action">
                                                      <button
                                                        class=""
                                                        title="Quantity Minus"
                                                        @click.prevent="cartDecrement(index)"
                                                      >
                                                        <i class="fas fa-minus"></i>
                                                      </button>
                                                      <input
                                                        class=""
                                                        title="Quantity Number"
                                                        type="text"
                                                        name="quantity"
                                                        :disabled="product.quantity === 1 ? true : false"
                                                        :value="product.quantity"
                                                      />
                                                      <button
                                                        class=""
                                                        title="Quantity Plus"
                                                        @click.prevent="cartIncrement(index)"
                                                      >
                                                        <i class="fas fa-plus"></i>
                                                      </button>
                                                  </div>

                                                </td>
                                                <td>{{ (Math.round(product.sell_price)) * product.quantity }}</td>
                                               
                                                <td class="table-action d-flex justify-content-between">
                                                    <button>
                                                      <a title="Product View" href="#" class="fas fa-eye" @click.prevent="previewProductModal(relatedData?.slug)"></a>
                                                    </button>
                                                    <button class="cart-delete" @click.prevent="deleteCart(index)">
                                                      <i class="far fa-trash-alt text-danger" title="Delete Item"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div class="continue-shopping">
                                  <router-link :to="{ name: 'shop'}"> <i class="fas fa-arrow-left"></i> Continue Shopping</router-link>
                                </div>
                                <div class="is-free-shipping-active" v-if="(isFreeShippingChecking?.type == 'quantity' && cartItemCount >= isFreeShippingChecking?.quantity) || (isFreeShippingChecking?.type == 'price' && totalPrice >= isFreeShippingChecking?.price)">
                                  <p>You are Enjoying Free Shipping!</p>
                                </div>
                                <div :class="{ 'is-free-shipping': isFreeShippingChecking }" v-else>
                                  <span v-if="isFreeShippingChecking?.type == 'price'">
                                    <p>Add {{ isFreeShippingChecking?.price -  totalPrice}} more Price to get free shipping!</p>
                                  </span>
                                  <span v-if="isFreeShippingChecking?.type == 'quantity'">
                                    <p>Add {{ isFreeShippingChecking?.quantity -  cartItemCount}} more product to get free shipping!</p>
                                  </span>
                                </div>

                                <div class="left my-3 p-0">
                                    <div class="d-flex justify-content-between is-coupon" @click="isOpenCoupon">
                                      <h6>Do you have any coupon ?</h6>
                                      <button class="btn-danger btn-sm" ><i class="fas fa-chevron-down " :class="{'isRoted' : isOpen}"></i></button>
                                    </div>
                                    <div class="input-group p-3" :class="{'d-none' : !isOpen}">
                                      <input type="text" class="form-control" placeholder="Apply Your Coupon Here" aria-label="Input group example" aria-describedby="btnGroupAddon" v-model="coupon">
                                      <div class="input-group-text btn-danger" id="btnGroupAddon" @click.prevent="couponCalculate">Apply</div>
                                    </div>
                                    <span v-if="couponErrorMessage" class="text-danger ps-3">{{ couponErrorMessage }}</span>
                                </div>

                               
                                <div class="checkout-charge">
                                    <h5 class="text-wrap d-flex justify-content-center">Order Summery</h5>
                                    <ul>
                                        <li>
                                            <span>Sub total</span>
                                            <span class="text-dark">{{ cart.totalPrice }} <span class="font-weight-bold">TK</span></span>
                                        </li>
                                        <li>
                                            <span class="">Delivary Charge</span>
                                            <span class="text-dark">{{ deliverCharge }}<span class="font-weight-bold">TK</span></span>
                                        </li>
                                        <li v-if="couponDiscountAmount">
                                            <span class="text-danger">Coupon Discount</span>
                                            <span class="text-danger"> -({{ couponDiscountAmount ?  cart.totalPrice - couponDiscountAmount : 0 }})<span class="font-weight-bold">TK</span></span>
                                        </li>
                                        <li>
                                            <span>Total<small>(Incl. VAT)</small></span>
                                            <span class="text-dark"><span class="flag-discount me-4">Amount</span> {{ couponDiscountAmount ?  Number(deliverCharge) + couponDiscountAmount : cart.totalPrice + Number(deliverCharge) }}  <span class="font-weight-bold">TK</span></span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-12">
                        <div class="account-card">
                            <div class="account-title">
                                <h4>Delivery Schedule</h4>
                            </div>
                            <div class="account-content">
                                <div class="row">
                                    <div class="col-md-6 col-lg-4 alert fade show">
                                        <div class="profile-card schedule active">
                                            <h6>express</h6>
                                            <p>90 min express delivery</p>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-lg-4 alert fade show">
                                        <div class="profile-card schedule">
                                            <h6>8am-10pm</h6> 
                                            <p>8.00 AM - 10.00 PM</p>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-lg-4 alert fade show">
                                        <div class="profile-card schedule">
                                            <h6>Next day</h6>
                                            <p>Next day or Tomorrow</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

               
                  <div class="col-12">
                   <Form
                   @submit.prevent="placeOrder"
                   :validation-schema="schema"
                   v-slot="{ errors, isSubmitting }"
                   >
                    <div class="row">
                      <div class="col-md-6 col-lg-4">
                        <div class="account-card">
                            <div class="account-title">
                                <h4>customer contact</h4>
                                <button data-bs-toggle="modal" data-bs-target="#contact-add">add contact</button>
                            </div>

                          <div class="account-content">
                            <div class="alert fade show">
                              <div
                                class="profile-card"
                                v-for="(contact, index) in contacts"
                                :key="index"
                              >
                                <div class="contact-option">
                                  <div>
                                    <h6>Name: <span>{{ contact.name }}</span></h6>
                                  </div>
                                  <div>
                                    <h6>Contact Type: <span>{{ contact.type }}</span></h6>
                                  </div>
                                  <div>
                                    <h6>Phone: <span>{{ contact.phone }}</span></h6>
                                  </div>
                                  <ul>
                                    <li>
                                      <button
                                        class="edit icofont-edit"
                                        title="Edit This"
                                        data-bs-toggle="modal"
                                        data-bs-target="#contact-add"
                                        @click="editContact(index)"
                                      ></button>
                                    </li>
                                    <li>
                                      <button
                                        class="trash icofont-ui-delete"
                                        title="Remove This"
                                        @click="removeContact(index)"
                                      ></button>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>

                    <div class="col-md-6 col-lg-4">
                        <div class="account-card">
                            <div class="account-title">
                                <h4>delivery address</h4>
                                <button data-bs-toggle="modal" data-bs-target="#address-add">add address</button>
                            </div>
                            <div class="account-content">
                                    <div class=" alert fade show">
                                        <div class="profile-card address active">
                                            <div class="address-option">
                                                <div>
                                                  <h6>Home : </h6>
                                                  <span>jalkuri, fatullah, narayanganj-1420. word no-09, road no-17/A</span>
                                                </div>
                                              <ul class="user-action">
                                                  <li><button class="edit icofont-edit" title="Edit This" data-bs-toggle="modal" data-bs-target="#address-edit"></button></li>
                                                  <li><button class="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert"></button></li>
                                              </ul>
                                            </div>
                                        </div>
                                    </div>
                              </div>
                          </div>
                      </div>

                      <div class="col-md-6 col-lg-4">
                        <div class="account-card mb-0">
                            <div class="account-title">
                                <h4>payment option</h4>
                                <button data-bs-toggle="modal" data-bs-target="#payment-add">add card</button>
                            </div>
                            <div class="account-content">
                                    <div class=" alert fade show">
                                        <div class="payment-card payment active">
                                            <img src="@/assets/images/payment/png/01.png" alt="payment">
                                            <h4>card number</h4>
                                            <p>
                                                <span>****</span>
                                                <span>****</span>
                                                <span>****</span>
                                                <sup>1876</sup>
                                            </p>
                                            <h5>miron mahmud</h5>
                                            <button class="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert"></button>
                                        </div>
                                    </div>
                              </div>
                          </div>
                        </div>
                    </div>
                    <div v-if="isLoading" class="preloader"></div>
                    <button type="submit"  class="text-center orderBTN mt-3 w-100" @click="placeOrder()">
                      <span v-if="loading" class="spinner-border spinner-border-sm mr-1"></span>
                      <span v-else>Place Order</span>
                    </button>
                    <span class="text-danger" v-if="blockSmsErrorMessage">{{ blockSmsErrorMessage }}</span>
                   </Form>
                  </div>
                
                
                <div>
                  <div class="checkout-check">
                                <input type="checkbox" id="checkout-check">
                                <label for="checkout-check">By making this purchase you agree to our <a href="#">Terms and Conditions</a>.</label>
                            </div>
                            <div class="checkout-proced">
                                <router-link :to="{name: 'user.invoice'}" class="btn btn-inline">proced to checkout</router-link>
                            </div>
                </div>
            </div>
        </section>
        <!--=====================================
                    CHECKOUT PART END
        =======================================-->


        <!--=====================================
                    MODAL ADD FORM START
        =======================================-->
          <CheckoutModal/>
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

</style>