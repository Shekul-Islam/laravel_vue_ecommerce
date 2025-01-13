

<script setup>
import { ref } from "vue";
import axiosInstance from "@/services/axiosService.js";
import { useCart } from "@/stores";
import { storeToRefs } from "pinia";

const emit = defineEmits(['cuponSubmited']);
const cart = useCart();
const { totalPrice } = storeToRefs(cart);
// coupon 
const showCouponForm  = ref(false);
const couponDiscountAmount  = ref();
const coupon = ref('');
const couponErrorMessage = ref();
const couponId = ref();

const couponOpened = ref(false);

const cuponOpen = () => {
    couponOpened.value =! couponOpened.value
}

// coupon 

const couponCalculate = async() => {
  const res = await axiosInstance.get(`/coupons/check?coupon_code=${coupon.value}&cart_total_amount=${totalPrice.value}`); 
  couponErrorMessage.value = res.data.message 
  couponDiscountAmount.value = res.data.result.discount_amount;
  couponId.value = res.data.result.coupon_id;
  emit('cuponSubmited', couponDiscountAmount.value, couponId.value);
}


</script>

<template>
    <div class="checkout-discount">
        <h4>Have a coupon?
            <button data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseOne" class="btn btn-link btn-toggle" @click.prevent="cuponOpen()">ENTER YOUR CODE</button>
        </h4>
        <transition name="slide-fade">
            <div v-if="couponOpened" id="collapseTwo" class="collapse show">
                <div class="feature-box">
                    <div class="feature-box-content">
                        <p>If you have a coupon code, please apply it below.</p>

                        <form action="#">
                            <div class="input-group">
                                <input type="text" class="form-control form-control-sm w-auto" placeholder="Coupon code" required="" v-model="coupon"/>
                                <div class="input-group-append">
                                    <button class="btn btn-sm mt-0" type="submit" @click.prevent="couponCalculate()">
                                        Apply Coupon
                                    </button>
                                </div>
                            </div>
                        </form>
                        <p class="text-danger">{{ couponErrorMessage }}</p>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>


<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.5s ease-in-out; /* Adjust the duration and timing function */
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

</style>