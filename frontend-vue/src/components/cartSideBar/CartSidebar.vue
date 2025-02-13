<script setup>
// All Import File  Code Is Here......................................................................................................
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useCart, useCommonIsToggleFunctionality } from "@/stores";
// All Variable  Code Is Here.....................................................................................................
const cart = useCart();
const { cartItemCount, cartItem, totalPrice } = storeToRefs(cart);
const commonIsToggleFunctionality = useCommonIsToggleFunctionality();
const { cartSideBar } = storeToRefs(commonIsToggleFunctionality);


const cartShow = () => {
  commonIsToggleFunctionality.isCartSideBarOpenOrClose();
};
// coupon 
const showCouponForm  = ref(false);
// API Calling Code Is Here.....................................................................................................

// All Function  Code Is Here.....................................................................................................
// coupon 

const toggleCouponForm = () => {
  showCouponForm.value = !showCouponForm.value;
}


const deleteCart = (index) => {
  cart.destroy(index);
};

const cartDecrement = (index) => {
  cart.decrement(index);
};

const cartIncrement = (index) => {
  cart.increment(index);
};

const couponBtn = () => {
        
        $(".coupon-btn").hide(), $(".coupon-form").css("display", "flex");

        };
</script>

<template lang="">
 
  <div>
    <div class="backdrop" :class="{ active: cartSideBar }" @click="commonIsToggleFunctionality.isCartSideBarOpenOrClose"></div>
    
    <!--=====================================
                  CART SIDEBAR PART START
        =======================================-->
        <aside  class="cart-sidebar" :class="{ active: cartSideBar }">
            <div class="cart-header">
                <div class="cart-total" v-if="cartItemCount !== 0">
                    <i class="fas fa-shopping-basket"></i>
                    <span>total item ({{ cartItemCount }}) </span>
                </div>

                <div class="cart-total"  v-else >
                  <i class="fas fa-shopping-basket"></i>
                  <span>আপনার কার্টে কিছু নেই</span>
                </div>
                <button class="cart-close" @click="commonIsToggleFunctionality.isCartSideBarOpenOrClose"><i class="icofont-close"></i></button>
                
            </div>
                
            <Transition name="fade" mode="out-in" class="cart-list">
               <TransitionGroup
                name="list"
                tag="ul"
                class="cart-list"
                v-if="cartItemCount !== 0"
               >
               
                <li 
                 class="cart-item"
                 v-for="(cart, index) in cartItem"
                 :key="cart.product_id"
                >
                    <div class="cart-media">
                        <a href="#"><img :src="cart?.image" alt="product"></a>
                        <button class="cart-delete" @click.prevent="deleteCart(index)">
                          <i class="far fa-trash-alt"></i>
                        </button>
                    </div>

                    <div class="cart-info-group">
                        <div class="cart-info">
                            <h6>
                              <router-link to="{ name: 'productDetailsPage'}">existing product name</router-link>
                            </h6>
                            <p>
                              {{ $filters.currencySymbol(Math.round(cart.sell_price)) }}
                            </p>
                        </div>

                        <div class="cart-action-group">
                            <div class="product-action">
                                <button class="action-minus" title="Quantity Minus" @click.prevent="cartDecrement(index)">
                                  <i class="fas fa-minus"></i>
                                </button>
                                <input 
                                  class="action-input" 
                                  title="Quantity Number" 
                                  type="text" 
                                  name="quantity" 
                                  :disabled="cart.quantity === 1 ? true : false"
                                  :value="cart.quantity"
                                >
                                <button class="action-plus" title="Quantity Plus"  @click.prevent="cartIncrement(index)">
                                  <i class="icofont-plus"></i>
                                </button>
                            </div>
                            {{ $filters.currencySymbol(Math.round((cart.sell_price) * cart.quantity)) }}
                        </div>
                    </div>
                </li> 
               </TransitionGroup>

               <ul class="cart-list" v-else>
                 <li class="cart-item cartItemImage">
                   <img src="@/assets/images/cart/cart.png" alt="" />
                 </li>
                 <h3 class="text-danger text-center">আপনার কার্টে কিছু নেই</h3>
               </ul>
            </Transition>

            <div class="cart-footer" v-if="cartItemCount" >
                <button class="coupon-btn">Do you have a coupon code?</button>
                <form class="coupon-form">
                    <input type="text" placeholder="Enter your coupon code">
                    <button type="submit"><span>apply</span></button>
                </form>

                <router-link :to="{name: 'user.checkoutPage'}" class="cart-checkout-btn">
                    <span class="checkout-label" style="width: 60%;">Proceed to Checkout</span>
                    <span class="checkout-price">{{ $filters.currencySymbol(totalPrice)}}</span>
                </router-link>
            </div>
        </aside>
        <!--=====================================
                    CART SIDEBAR PART END
        =======================================-->

  </div>
</template>

<style scoped>



.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: none; /* স্টেট অনুযায়ী কন্ট্রোল করা হবে */
  transition: opacity 0.3s ease;
}

.backdrop.active {
  display: block;
  opacity: 1;
}

.cart-sidebar {
  position: fixed;
  top: 0;
  right: -100%;
  width: 400px;
  height: 100%;
  background: #fff;
  z-index: 1000;
  transition: right 0.3s ease-in-out;
}

.cart-sidebar.active {
  right: 0;
}




.cartItemImage {
  margin-top: 60px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
