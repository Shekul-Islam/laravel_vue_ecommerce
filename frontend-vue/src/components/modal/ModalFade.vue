<script setup>
import {useShop} from "@/stores/";
// import { data } from "jquery";
import { onMounted, ref } from "vue";
import { useRoute } from 'vue-router';
import { mrpOrOfferPrice } from "@/composables";


const props = defineProps({
  previewData : {
    type: Object,
    required: true,
  }
})



const route = useRoute();
const shopProduct = useShop();

const singleProductData = ref("");
const productVariationPrice = ref("");
const relatedProducts = ref("");

const productType = ref("");
const selectedBrandIds = ref([]);
const selectedCategoryIds = ref([]);
const selectedAttributeIds = ref([]);
const selectedSubCategoryIds = ref("");
const sortingPrice = ref([]);
const searchQuery = ref("");
const paginateSize = ref("");


const color = "white";
const size = "8px";

const handleProductVariationPrice = (data) => {
   if (data?.length){
    productVariationPrice.value = data[0];
    console.log("productVariationPrice", productVariationPrice.value);
    
   }
    
};

const bannerImage = new URL ("@/assets/images/single-banner.jpg", import.meta.url).href;

// watch(() => route.params.slug, (newValue, oldValue) => {
//   getRelatedProducts();
//   });



onMounted(() => {
    handleProductVariationPrice();
})
</script>

<template>
  <div>
    
    <div class="modal fade" id="product-view">
      <div class="modal-dialog">
        <div class="modal-content">
          <button
            class="modal-close icofont-close"
            data-bs-dismiss="modal"
          ></button>

          <div class="product-view">
            <div class="row">
              <div class="col-md-6 col-lg-6">
                <div class="details-gallery">
                            <div class="details-label-group">
                                <label class="details-label new">new</label>
                                <label class="details-label off">-10%</label>
                            </div>
                            <ul class="details-preview" >
                                <li ><img :src="previewData?.image"></li>
                               
                            </ul>
                       
                            <ul class="details-thumb" >
                              <li><img :src="previewData?.image" alt=""></li>
                            </ul>
                </div>
              </div>

              <div class="col-md-6 col-lg-6">
                <div class="view-details">
                  <h3 class="view-name">
                    <a href="#">{{ previewData.name }}</a>
                  </h3>
                  <div class="view-meta">
                    <p>SKU: {{ previewData?.sku }}</p>
                    <p>BRAND:<a href="#">{{ previewData?.brand?.name }}</a></p>
                    
                    <div :class="`${type}-meta`">
                      <p v-if="previewData?.category">
                        Category: <a href="">{{ previewData?.category?.name }}</a>
                      </p>
                      <p v-if="previewData?.sub_category">
                        Sub Category: <a href="">{{ previewData?.sub_category?.name}}</a>
                      </p>
                    </div>
                  </div>
                  <div class="view-rating">
                    <i class="active icofont-star"></i
                    ><i class="active icofont-star"></i
                    ><i class="active icofont-star"></i
                    ><i class="active icofont-star"></i
                    ><i class="icofont-star"></i
                    ><a href="product-video.html">(3 reviews)</a>
                  </div>
                 
                  <span v-if="previewData?.variations?.data?.length"> 
                    {{ previewData?.variation_price_range?.min_price }}
                    <h3 class="details-price" v-if="previewData?.variation_price_range == '' || previewData?.variation_price_range == undefined">
                      <span v-if="previewData?.variation_price_range?.min_price == previewData?.variation_price_range?.max_price ">{{ $filters?.currencySymbol(previewData?.variation_price_range?.min_price || previewData?.variation_price_range?.max_price) }}</span>
                      <span>{{previewData?.variation_price_range?.min_price}} {{ previewData?.variation_price_range?.max_price }}</span>
                    </h3>                            
                    <h3 :class="`${type}-price my-2`" v-else>
                      <span>{{ 
                        $filters.currencySymbol(previewData?.sell_price)
                         }}</span>
                    </h3>
                  </span>
                  <span v-else>
                    <h3 :class="`${type}-price details-price` ">
                      <del>{{ $filters.currencySymbol(previewData.mrp) }}</del>
                      <span>{{ $filters.currencySymbol( mrpOrOfferPrice( previewData.mrp, previewData.offer_price ))}}</span>
                    </h3>
                  </span>
                  <p class="view-desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit non
                    tempora magni repudiandae sint suscipit tempore quis maxime
                    explicabo veniam eos reprehenderit fuga
                  </p>
                  <div class="view-list-group">
                    <label class="view-list-title">tags:</label>
                    <ul class="view-tag-list">
                      <li><a href="#">organic</a></li>
                      <li><a href="#">vegetable</a></li>
                      <li><a href="#">chilis</a></li>
                    </ul>
                  </div>
                  <div class="view-list-group">
                    <label class="view-list-title">Share:</label>
                    <ul class="view-share-list">
                      <li>
                        <a
                          href="#"
                          class="icofont-facebook"
                          title="Facebook"
                        ></a>
                      </li>
                      <li>
                        <a href="#" class="icofont-twitter" title="Twitter"></a>
                      </li>
                      <li>
                        <a
                          href="#"
                          class="icofont-linkedin"
                          title="Linkedin"
                        ></a>
                      </li>
                      <li>
                        <a
                          href="#"
                          class="icofont-instagram"
                          title="Instagram"
                        ></a>
                      </li>
                    </ul>
                  </div>


                  
                 <div :class="`${type}-list-group mt-3`">
                   <div
                     class="quantity"
                     :class="{
                       'quantity-disabled':
                         activeBtns === false &&
                         singleProduct?.variations?.data.length > 0,
                     }"
                   >
                     <button
                       class="minus"
                       :disabled="
                         activeBtns === false &&
                         singleProduct?.variations?.data.length > 0
                       "
                       aria-label="Decrease"
                       @click.prevent="decrementCartItem"
                     >
                       &minus;
                     </button>
                     <input
                       type="number"
                       class="input-box"
                       min="1"
                       max="10"
                       v-model="quantityInput"
                     />
                     <button
                       class="plus"
                       :disabled="
                         activeBtns === false &&
                         singleProduct?.variations?.data.length > 0
                       "
                       aria-label="Increase"
                       @click.prevent="incrementCartItem"
                     >
                       &plus;
                     </button>
                   </div>
                </div>


                  <div class="view-add-group">
                    <div :class="`${type}-add-group`">
                              <div class="row" v-if="singleProductData?.variations?.data.length > 0">
                                <div class="col-md-6 mt-lg-0 mt-3">
                                  <button class="product-add" title="Add to Cart" 
                                    :disabled="activeBtns === false && singleProductData?.variations?.data.length > 0"
                                    :class="{ singleProductBtn: activeBtns === false }"
                                    
                                    @click.prevent="
                                      addToCart(
                                        singleProductData,
                                        quantityInput,
                                        productVariationData,
                                        productVariationPrice,
                                        campaignSlug
                                      )
                                    ">
                                    <i :class=" loading == singleProductData.id? 'fa-solid fa-spinner fa-spin': 'fas fa-shopping-basket'"></i>
                                    <span>add to cart</span>
                                  </button>
                                </div>

                                <div class="col-md-6 mt-lg-0 mt-3" v-if="activeBtns === false">
                                  <a
                                    class="product-add main-order-btn"
                                    :class="{ 'singleProductBtn ': activeBtns === false }"
                                    title="Add to Cart">

                                    <i class="fas fa-cart-plus"></i>
                                    <span>Buy Now</span>
                                  </a>
                                </div>

                                <div class="col-md-6 mt-lg-0 mt-3" v-else>
                                  <router-link
                                    :to="{ name: 'user.checkoutPage' }"
                                    class="product-add main-order-btn"
                                    :class="{ 'singleProductBtn ': activeBtns === false }"
                                    title="Add to Cart"
                                    @click.prevent="
                                      addToCart(
                                        singleProductData,
                                        quantityInput,
                                        productVariationData,
                                        productVariationPrice,
                                        campaignSlug
                                      );
                                      modalClose()
                                    "
                                  >
                                    <i class="fas fa-cart-plus"></i>
                                    <span>Buy Now</span>
                                  </router-link>
                                </div>
                              </div>
                              
                              <div class="row" v-else>
                                <div class="col-md-6 mt-lg-0 mt-3">
                                  <button
                                    class="product-add"
                                    title="Add to Cart"
                                    @click.prevent="addToCart(singleProductData, quantityInput, null, 0, campaignSlug)"
                                    @click="cartShow"
                                  >
                                    <i
                                      :class="
                                        loading == singleProductData.id
                                          ? 'fa-solid fa-spinner fa-spin'
                                          : 'fas fa-shopping-basket'
                                      "
                                    ></i>
                                    <span>add to cart</span>
                                  </button>
                                </div>
                                <div class="col-md-6 mt-lg-0 mt-3">
                                  <router-link
                                    :to="{ name: 'user.checkoutPage' }"
                                    class="product-add main-order-btn"
                                    title="Add to Cart"
                                    @click.prevent="addToCart(singleProductData, quantityInput, null, 0, campaignSlug); modalClose()"
                                  >
                                    <i class="fas fa-cart-plus"></i>
                                    <span>Buy Now</span>
                                  </router-link>
                                </div>
                              </div>
                            </div>
                   
                  </div>

                  
                  <div class="view-action-group">
                    <a class="view-wish wish" href="#" title="Add Your Wishlist"
                      ><i class="icofont-heart"></i><span>add to wish</span></a
                    ><a
                      class="view-compare"
                      href="compare.html"
                      title="Compare This Item"
                      ><i class="fas fa-random"></i><span>Compare This</span></a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>


.details-thumb li img{
  width: 100px;
  height: 100px;
}
</style>