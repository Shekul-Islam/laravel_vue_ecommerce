<script setup>
// All Import File  Code Is Here......................................................................................................
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useCart, useCommonIsToggleFunctionality } from "@/stores";
// All Variable  Code Is Here.....................................................................................................
const cart = useCart();
const { cartItemCount, cartItem, totalPrice } = storeToRefs(cart);
// const commonIsToggleFunctionality = useCommonIsToggleFunctionality();
// const { cartSideBar } = storeToRefs(commonIsToggleFunctionality);


const cartClose = () => {
  $("body").css("overflow", "inherit"),
    $(".cart-sidebar").removeClass("active"),
    $(".backdrop").fadeOut();
};

// coupon 
const showCouponForm  = ref(false);
// API Calling Code Is Here.....................................................................................................

// All Function  Code Is Here.....................................................................................................
// coupon 

const cartSideBar = ref(false);

const toggleSidebar = () => {
  cartSideBar.value = !cartSideBar.value;
};

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
</script>


<template>
  <div class="backdrop" 
       :style="{ display: cartSideBar ? 'block' : 'none' }" 
       @click="toggleSidebar">
    <aside class="cart-sidebar">
      <div class="cart-header">
        <div class="cart-total">
          <i class="fas fa-shopping-basket"></i><span>total item (5)</span>
        </div>
        <button class="cart-close" @click="cartClose">
          <i class="icofont-close"></i>
        </button>
      </div>
      <ul class="cart-list">
        <li class="cart-item">
          <div class="cart-media">
            <a href="#"
              ><img src="@/assets/images/product/01.jpg" alt="product" /></a
            ><button class="cart-delete">
              <i class="far fa-trash-alt"></i>
            </button>
          </div>
          <div class="cart-info-group">
            <div class="cart-info">
              <h6><a href="product-single.html">existing product name</a></h6>
              <p>Unit Price - $8.75</p>
            </div>
            <div class="cart-action-group">
              <div class="product-action">
                <button class="action-minus" title="Quantity Minus">
                  <i class="icofont-minus"></i>
                </button><input
                  class="action-input"
                  title="Quantity Number"
                  type="text"
                  name="quantity"
                  value="1"
                /><button class="action-plus" title="Quantity Plus">
                  <i class="icofont-plus"></i>
                </button>
              </div>
              <h6>$56.98</h6>
            </div>
          </div>
        </li>
        <li class="cart-item">
          <div class="cart-media">
            <a href="#"
              ><img src="@/assets/images/product/02.jpg" alt="product" /></a
            ><button class="cart-delete">
              <i class="far fa-trash-alt"></i>
            </button>
          </div>
          <div class="cart-info-group">
            <div class="cart-info">
              <h6><a href="product-single.html">existing product name</a></h6>
              <p>Unit Price - $8.75</p>
            </div>
            <div class="cart-action-group">
              <div class="product-action">
                <button class="action-minus" title="Quantity Minus">
                  <i class="icofont-minus"></i></button
                ><input
                  class="action-input"
                  title="Quantity Number"
                  type="text"
                  name="quantity"
                  value="1"
                /><button class="action-plus" title="Quantity Plus">
                  <i class="icofont-plus"></i>
                </button>
              </div>
              <h6>$56.98</h6>
            </div>
          </div>
        </li>
        <li class="cart-item">
          <div class="cart-media">
            <a href="#"
              ><img src="@/assets/images/product/03.jpg" alt="product" /></a
            ><button class="cart-delete">
              <i class="far fa-trash-alt"></i>
            </button>
          </div>
          <div class="cart-info-group">
            <div class="cart-info">
              <h6><a href="product-single.html">existing product name</a></h6>
              <p>Unit Price - $8.75</p>
            </div>
            <div class="cart-action-group">
              <div class="product-action">
                <button class="action-minus" title="Quantity Minus">
                  <i class="icofont-minus"></i></button
                ><input
                  class="action-input"
                  title="Quantity Number"
                  type="text"
                  name="quantity"
                  value="1"
                /><button class="action-plus" title="Quantity Plus">
                  <i class="icofont-plus"></i>
                </button>
              </div>
              <h6>$56.98</h6>
            </div>
          </div>
        </li>
        <li class="cart-item">
          <div class="cart-media">
            <a href="#"
              ><img src="@/assets/images/product/04.jpg" alt="product" /></a
            ><button class="cart-delete">
              <i class="far fa-trash-alt"></i>
            </button>
          </div>
          <div class="cart-info-group">
            <div class="cart-info">
              <h6><a href="product-single.html">existing product name</a></h6>
              <p>Unit Price - $8.75</p>
            </div>
            <div class="cart-action-group">
              <div class="product-action">
                <button class="action-minus" title="Quantity Minus">
                  <i class="icofont-minus"></i></button
                ><input
                  class="action-input"
                  title="Quantity Number"
                  type="text"
                  name="quantity"
                  value="1"
                /><button class="action-plus" title="Quantity Plus">
                  <i class="icofont-plus"></i>
                </button>
              </div>
              <h6>$56.98</h6>
            </div>
          </div>
        </li>
        <li class="cart-item">
          <div class="cart-media">
            <a href="#"
              ><img src="@/assets/images/product/05.jpg" alt="product" /></a
            ><button class="cart-delete">
              <i class="far fa-trash-alt"></i>
            </button>
          </div>
          <div class="cart-info-group">
            <div class="cart-info">
              <h6><a href="product-single.html">existing product name</a></h6>
              <p>Unit Price - $8.75</p>
            </div>
            <div class="cart-action-group">
              <div class="product-action">
                <button class="action-minus" title="Quantity Minus">
                  <i class="icofont-minus"></i></button
                ><input
                  class="action-input"
                  title="Quantity Number"
                  type="text"
                  name="quantity"
                  value="1"
                /><button class="action-plus" title="Quantity Plus">
                  <i class="icofont-plus"></i>
                </button>
              </div>
              <h6>$56.98</h6>
            </div>
          </div>
        </li>
      </ul>
      <div class="cart-footer">
      
        <router-link :to="{name: 'user.checkout'}" class="cart-checkout-btn" href="checkout.html"
          ><span class="checkout-label">Proceed to Checkout</span
          ><span class="checkout-price">$369.78</span></router-link
        >
      </div>
    </aside>
  </div>
</template>

<style scoped></style>
