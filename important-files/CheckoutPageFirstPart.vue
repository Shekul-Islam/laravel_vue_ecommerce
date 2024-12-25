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