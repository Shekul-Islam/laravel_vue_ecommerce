<script setup>
import { useProduct } from "@/stores";
import {useShop} from "@/stores/";
import { storeToRefs } from "pinia";
// import { data } from "jquery";
import { onMounted, ref, watch,watchEffect  } from "vue";
import { useRoute } from 'vue-router';
import ModalFade from '@/components/modal/ModalFade.vue'
import ProductDetails from "@/components/product/ProductDetails.vue";
import { mrpOrOfferPrice } from "@/composables";

/*===============
    Swipper
================*/
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";


const route = useRoute();
const singleProduct = useProduct();
const shopProduct = useShop();


const singleProductData = ref("");
const productVariationPrice = ref("");
const relatedProducts = ref("");
const previewData = ref({});

// ✅ Get Single Product
const getSingleProduct = async () => {
  console.log("Fetching product for slug:", route.params.slug);
  const res = await singleProduct.getSingleProductData(route.params.slug);
  if (res?.success) {
    singleProductData.value = res?.result;
    console.log("Single Product Data:", singleProductData.value);

    if (res?.result?.category?.id) {
      getRelatedProducts(res.result.category.id);
    }
  }
};

const getRelatedProducts = async (id) =>  {
    const res = await singleProduct.getCategoryData(id);
    relatedProducts.value = res;
}


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

const getProducts = async ()=> {
  const response = await shopProduct.getData(route.params.category)
  shopProduct.value = response;
  
}


const scrollToTop = () => {
  window.scrollTo({
    top: 700,
    behavior: "smooth",
  });

  
const selectedProduct = ref(null);

const showProductModal = (product) => {
  selectedProduct.value = product;
};

};

const handleProductVariationPrice = (data) => {
   if (data?.length){
    productVariationPrice.value = data[0];
    console.log("ProductVariationPrice", productVariationPrice.value);
    
   }
};

const previewProductModal = async(productSlug) =>{

  const res = await singleProduct.getSingleProductData(productSlug);
    if(res?.success){
      
      previewData.value = res?.result || {};
    }

  $("#product-view").modal("show");
}

const bannerImage = new URL ("@/assets/images/single-banner.jpg", import.meta.url).href;

// ✅ Slug পাওয়ার জন্য watchEffect ব্যবহার করুন
watchEffect(() => {
  console.log("ProductDetails.vue Route Slug:", route.params.slug);

  if (route.params.slug) {
    getSingleProduct();
  } else {
    console.error("Slug is missing or undefined in ProductDetails.vue!");
  }
});

onMounted(() => {
    getSingleProduct();
    getProducts();
    handleProductVariationPrice();
    getRelatedProducts();
    getSingleProduct();
})
</script>


<template>
  <div>
         <!--=====================================
                    BANNER PART START
        =======================================-->
        <section class="single-banner inner-section" :style=" {background: 'url(' + bannerImage +') center center no-repeate'}">
            <div class="container">
                <h2>product video</h2>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li class="breadcrumb-item"><a href="shop-4column.html">shop-4column</a></li>
                    <li class="breadcrumb-item active" aria-current="page">product-video</li>
                </ol>
            </div>
        </section>
        <!--=====================================
                    BANNER PART END
        =======================================-->


        <!--=====================================
                PRODUCT DETAILS PART START
        =======================================-->
       
        <ProductDetails/>
        <!--=====================================
                PRODUCT DETAILS PART END
        =======================================-->


        <!--=====================================
                  PRODUCT TAB PART START
        =======================================-->
        <section class="inner-section">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <ul class="nav nav-tabs">
                            <li><a href="#tab-desc" class="tab-link active" data-bs-toggle="tab">descriptions</a></li>
                            <li><a href="#tab-spec" class="tab-link" data-bs-toggle="tab">Specifications</a></li>
                            <li><a href="#tab-reve" class="tab-link" data-bs-toggle="tab">reviews (2)</a></li>
                        </ul>
                    </div>
                </div>

<!-- DESCRIPTIONS -->
                <div class="tab-pane fade show active" id="tab-desc">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="product-details-frame">
                                <div class="tab-descrip">
                                    <p>{{singleProductData?.description}}</p>
                                    <ul>
                                        <li>{{singleProductData?.short_description}}</li>
                                        <li>{{singleProductData?.short_description}}</li>
                                        <li>{{singleProductData?.short_description}}</li>
                                        <li>{{singleProductData?.short_description}}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="col-lg-6">
                            <div class="product-details-frame">
                                <div class="tab-descrip">
                                    <img src="@/assets/images/video.jpg" alt="video">
                                    <a title="Product Video" href="https://youtu.be/9xzcVxSBbG8" target="_blank" class="venobox fas fa-play" data-autoplay="true" data-vbtype="video"></a>
                                </div>
                            </div>
                        </div> -->
                        <div :class="`col-lg-6 ${type}-list-group`" v-if="singleProductData?.video_url">
                         <div class="product-details-frame">
                            <div class="videoHW tab-descrip">
                            <iframe class="venobox fas fa-play mt-5"  :src="getEmbedUrl(singleProductData?.video_url)" target="_blank" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>              
                          </div>
                         </div>
                        </div>
                    </div>
                </div>

<!-- SPECIFICATONS -->
                <div class="tab-pane fade" id="tab-spec">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="product-details-frame">
                                <table class="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Product code</th>
                                            <td>SKU: 101783</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Weight</th>
                                            <td>1kg, 2kg</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Styles</th>
                                            <td>@Girly</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Properties</th>
                                            <td>Short Dress</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

<!-- REVIEWS -->
                <div class="tab-pane fade" id="tab-reve">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="product-details-frame">
                                <ul class="review-list">
                                    <li class="review-item">
                                        <div class="review-media">
                                            <a class="review-avatar" href="#">
                                                <img src="@/assets/images/avatar/01.jpg" alt="review">
                                            </a>
                                            <h5 class="review-meta">
                                                <a href="#">miron mahmud</a>
                                                <span>June 02, 2020</span>
                                            </h5>
                                        </div>
                                        <ul class="review-rating">
                                            <li class="icofont-ui-rating"></li>
                                            <li class="icofont-ui-rating"></li>
                                            <li class="icofont-ui-rating"></li>
                                            <li class="icofont-ui-rating"></li>
                                            <li class="icofont-ui-rate-blank"></li>
                                        </ul>
                                        <p class="review-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus hic amet qui velit, molestiae suscipit perferendis, autem doloremque blanditiis dolores nulla excepturi ea nobis!</p>
                                        <form class="review-reply">
                                            <input type="text" placeholder="reply your thoughts">
                                            <button><i class="icofont-reply"></i>reply</button>
                                        </form>
                                        <ul class="review-reply-list">
                                            <li class="review-reply-item">
                                                <div class="review-media">
                                                    <a class="review-avatar" href="#">
                                                        <img src="@/assets/images/avatar/02.jpg" alt="review">
                                                    </a>
                                                    <h5 class="review-meta">
                                                        <a href="#">labonno khan</a>
                                                        <span><b>author -</b> June 02, 2020</span>
                                                    </h5>
                                                </div>
                                                <p class="review-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus hic amet qui velit, molestiae suscipit perferendis, autem doloremque blanditiis dolores nulla excepturi ea nobis!</p>
                                                <form class="review-reply">
                                                    <input type="text" placeholder="reply your thoughts">
                                                    <button><i class="icofont-reply"></i>reply</button>
                                                </form>
                                            </li>
                                            <li class="review-reply-item">
                                                <div class="review-media">
                                                    <a class="review-avatar" href="#">
                                                      <img src="@/assets/images/avatar/03.jpg" alt="review">
                                                    </a>
                                                    <h5 class="review-meta">
                                                      <a href="#">tahmina bonny</a>
                                                      <span>June 02, 2020</span>
                                                    </h5>
                                                </div>
                                                <p class="review-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus hic amet qui velit, molestiae suscipit perferendis, autem doloremque blanditiis dolores nulla excepturi ea nobis!</p>
                                                <form class="review-reply">
                                                    <input type="text" placeholder="reply your thoughts">
                                                    <button><i class="icofont-reply"></i>reply</button>
                                                </form>
                                            </li>
                                        </ul>
                                    </li>

                                    <li class="review-item">
                                        <div class="review-media">
                                            <a class="review-avatar" href="#">
                                                <img src="@/assets/images/avatar/04.jpg" alt="review">
                                            </a>
                                            <h5 class="review-meta">
                                              <a href="#">shipu shikdar</a>
                                              <span>June 02, 2020</span>
                                            </h5>
                                        </div>
                                        <ul class="review-rating">
                                          <li class="icofont-ui-rating"></li>
                                          <li class="icofont-ui-rating"></li>
                                          <li class="icofont-ui-rating"></li>
                                          <li class="icofont-ui-rating"></li>
                                          <li class="icofont-ui-rate-blank"></li>
                                        </ul>
                                        <p class="review-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus hic amet qui velit, molestiae suscipit perferendis, autem doloremque blanditiis dolores nulla excepturi ea nobis!</p>
                                        <form class="review-reply">
                                            <input type="text" placeholder="reply your thoughts">
                                            <button><i class="icofont-reply"></i>reply</button>
                                        </form>
                                    </li>
                                </ul>
                            </div>

                            <div class="product-details-frame">
                                <h3 class="frame-title">add your review</h3>
                                <form class="review-form">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="star-rating">
                                              <input type="radio" name="rating" id="star-1"><label for="star-1"></label>
                                              <input type="radio" name="rating" id="star-2"><label for="star-2"></label>
                                              <input type="radio" name="rating" id="star-3"><label for="star-3"></label>
                                              <input type="radio" name="rating" id="star-4"><label for="star-4"></label>
                                              <input type="radio" name="rating" id="star-5"><label for="star-5"></label>
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                              <textarea class="form-control" placeholder="Describe"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                          <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Name">
                                          </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                              <input type="email" class="form-control" placeholder="Email">
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <button class="btn btn-inline">
                                              <i class="icofont-water-drop"></i>
                                              <span>drop your review</span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--=====================================
                    PRODUCT TAB PART END
        =======================================-->


        <!--=====================================
                 PRODUCT RELATED PART START
        =======================================-->
        <section class="inner-section">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="section-heading">
                            <h2>related this items</h2>
                        </div>
                    </div>
                </div>

<!-- RELATED-ITEMS -->
                <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                    <div class="col" v-for="(relatedData, index)  in relatedProducts?.data" :key="index">
                        <div class="product-card">
                            <div class="product-media">   
                                <div class="product-label">
                                  <label class="label-text sale">sale</label>
                                </div>
                                <button class="product-wish wish">
                                  <i class="fas fa-heart"></i>
                                </button>
                                <router-link class="product-image" :to="{ name: 'productDetailsPage', params: { slug:relatedData.slug } }">
                                  <a class="product-image">
                                    <img :src="relatedData?.image" alt="relatedData?.image">
                                  </a>
                                </router-link>
                                <div class="product-widget">
                                    <a title="Product Compare" href="compare.html" class="fas fa-random"></a>
                                    <a title="Product Video" v-show="relatedData?.video_url" :href="relatedData?.video_url" class="venobox fas fa-play" data-vbtype="video" data-autoplay="true"></a>
                                    <a title="Product View" href="#" class="fas fa-eye" @click.prevent="previewProductModal(relatedData?.slug)"></a>
                                </div>
                            </div>
                            <div class="product-content">
                                <div class="product-rating">
                                    <i class="active icofont-star"></i>
                                    <i class="active icofont-star"></i>
                                    <i class="active icofont-star"></i>
                                    <i class="active icofont-star"></i>
                                    <i class="icofont-star"></i>
                                    <a href="product-video.html">(3)</a>
                                </div>
                                <h6 class="product-name">
                                    <a href="product-video.html">{{relatedData?.name}}</a>
                                </h6>
                                
                              

                                <span class="product-price" v-if="relatedData?.variations?.data?.length"> 
                                 <h6 class="details-price" v-if="productVariationPrice == '' || productVariationPrice == undefined">
                                     <span v-if="relatedData?.variation_price_range?.min_price == relatedData?.variation_price_range?.max_price ">{{ $filters?.currencySymbol(relatedData?.variation_price_range?.min_price || relatedData?.variation_price_range?.max_price) }}</span>
                                     <!-- <span>{{singleProductData?.variation_price_range?.min_price}} {{ singleProductData?.variation_price_range?.max_price }}</span> -->
                                 </h6>
                               
                                 <h6 :class="`${type}-price my-2`" v-else>
                                   <span>{{
                                     $filters.currencySymbol(productVariationPrice?.sell_price)
                                   }}</span>
                                 </h6>

                                </span>
                           
                           <span v-else>
                              <h6 :class="`${type}-price details-price` ">
                                <del>{{ $filters.currencySymbol(relatedData.mrp) }}</del>
                                <span>{{ $filters.currencySymbol( mrpOrOfferPrice( relatedData.mrp, relatedData.offer_price ))}}</span>
                                <!-- <a class="discout_amount" v-if="product.offer_price != 0" >Save {{ Math.round(product.mrp - product.offer_price) }}৳</a > -->
                              </h6>
                            </span>

                                <button class="product-add" title="Add to Cart" @click="scrollToTop">
                                    <span><router-link :to="{ name: 'productDetailsPage', params:{ slug:relatedData?.slug } }" class="fas fa-shopping-basket">Product Preview</router-link></span>
                                </button>
                                <div class="product-action">
                                    <button class="action-minus" title="Quantity Minus"><i class="icofont-minus"></i></button>
                                    <input class="action-input" title="Quantity Number" type="text" name="quantity" value="1">
                                    <button class="action-plus" title="Quantity Plus"><i class="icofont-plus"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

<!-- VIEW-ALL-PRODUCTS -->
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-btn-25">
                            <a href="/shop" class="btn btn-outline">
                                <i class="fas fa-eye"></i>
                                <span>view all related</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--=====================================
                 PRODUCT RELATED PART END
        =======================================-->

        <ModalFade :preview-data="previewData"/>
  </div>
</template>



<style scoped>

.footer-price{
  font-size: 24px;
  font-weight: 600;
  color: red;
}


.review-img-section img {
  max-width: 100%;
}

/* Related and cross sell product heading title start */

.section-header-text {
  background-color: #f5f6f7;
  padding: 10px 20px;
  border: 3px solid var(--primary) !important;
  border-top-width: 7px !important;
  border-radius: 15px / 45px !important;
  box-shadow: #ccdbe8 3px 3px 15px inset, #ffffff80 -3px -3px 12px 1px inset;
  transition: all linear 0.2s;
}

.section-header-text:hover {
  background-color: #f5f6f7;
  border: 3px solid var(--secondary-color) !important;
  border-top-width: 7px !important;
  border-radius: 15px / 45px !important;
  transition: all linear 0.2s;
}

.heading-line {
  width: 100%;
  background-color: var(--primary);
  height: 2px;
  margin-top: -25px;
}
.heading-line:hover {
  background-color: var(--secondary-color);
}


/* Related and cross sell product heading title end */


/* image zooming start*/
.image-container {
  position: relative;
  width: 400px;
  overflow: hidden;
  cursor: crosshair;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.zoom-lens {
    position: absolute;
    width: 250px;
    height: 250px;
    border: 2px solid #000;
    background-repeat: no-repeat;
    visibility: hidden;
    pointer-events: none;
    z-index: 10;
    border-radius: 10px;
}
/* image zooming end*/


/* MOdla css */
.view-price {
  margin-bottom: 0px !important;
}

.view-add-group {
  margin: 20px 0px 15px;
}

/* MOdla css */

/* Define the keyframes for the pulse animation */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Base button styling */

.main-order-btn {
  animation: pulse 1s infinite;
  margin: 0px;
  border: var(--primary);
}
.main-order-btn:hover {
  border: var(--primary);
}

.discout_amount {
  border: 1px solid var(--primary);
  margin-left: 20px;
  padding: 0px 8px;
  border-radius: 5px;
  background-color: var(--primary);
  color: var(--white) !important;
  font-size: 18px;
  margin-bottom: 5px;
  border-top: 2px solid var(--primary);
  border-left: 2px solid var(--primary);
  border-bottom: 2px solid var(--primary);
  border-right: 2px solid var(--primary);
  border-top-left-radius: 20px !important;
  border-bottom-right-radius: 20px !important;
}


.img-display {
  overflow: hidden;
}
.img-showcase {
  display: flex;
  width: 100%;
  transition: all 0.5s ease;
}
.img-showcase img {
  min-width: 100%;
}
.img-select {
  display: flex;
}
.img-item {
  margin: 0.3rem;
}
.img-item:nth-child(1),
.img-item:nth-child(2),
.img-item:nth-child(3) {
  margin-right: 0;
}
.img-item:hover {
  opacity: 0.8;
}
.active-thumb {
  border: 2px solid #119744;
}

.image-gallery {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 5px;
}

.is-active {
  color: var(--white) !important;
  background: var(--primary) !important;
}

.singleProductBtn {
  background: rgb(199, 40, 40);
  color: white;
  border: 0;
  cursor: pointer;
  padding: 1em;
  opacity: 0.5;
  cursor: not-allowed;
}

.variationRemoveBtn {
  padding: 1px 10px;
  background-color: white;
  color: rgb(255, 0, 0);
  border-radius: 5px;
  border: 2px solid rgb(255, 0, 0);
}
.variationRemoveBtn:hover {
  background-color: rgb(255, 0, 0);
  color: white;
  border: 2px solid rgb(255, 0, 0);
}

.is-disabled {
  pointer-events: none;
  opacity: 0.5;
}

.quantity {
  display: flex;
  border: 2px solid var(--primary);
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.quantity-disabled {
  background: rgb(199, 40, 40);
  color: white;
  cursor: pointer;
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity button {
  background-color: var(--primary);
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 20px;
  width: 30px;
  height: auto;
  text-align: center;
  transition: background-color 0.2s;
}

.quantity button:hover {
  background-color: rgb(172, 16, 16);
  color: white;
}

.input-box {
  width: 40px;
  text-align: center;
  border: none;
  padding: 8px 10px;
  font-size: 16px;
  outline: none;
}

/* Hide the number input spin buttons */
.input-box::-webkit-inner-spin-button,
.input-box::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input-box[type="number"] {
  -moz-appearance: textfield;
}

/* sticky footer start */

.quentyDefaultClass {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.quentyDefaultClass button {
  font-size: 28px;
}

.quentyDefaultClass input {
  margin: 0px 8px;
  border-radius: 5px;
}

.btnColor {
  animation: pulse 1s infinite;
  background-color: var(--primary);
  color: rgb(255, 255, 255);
  padding: 9px 32px;
  border-radius: 5px;
}

.main-footer-nav-section {
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0px -7px 16px -4px rgba(0, 0, 0, 0.69);
  -webkit-box-shadow: 8px -9px 24px -12px rgba(5, 19, 3, 0.69);
  -moz-box-shadow: 0px -7px 16px -4px rgba(0, 0, 0, 0.69);
  position: fixed;
  bottom: -115px;
  transition: all 0.5s ease;
  width: 100%;
  z-index: 9999;
}

.main-nav-footer {
  justify-content: end;
}

/* right */

.footer-nav-right {
  display: flex;
  justify-content: center;
  align-items: center;
}
.price {
  display: flex;
}

.price h3 {
  font-size: 22px;
  margin-right: 5px;
}

.footer-nav-cart {
  display: flex;
  align-items: center;
}
.footer-nav-cart input {
  /* width: 57px; */
  border: 1px solid #494b51;
  height: 40px;
  padding: 9px;
  margin-right: 10px;
}
.footer-nav-cart button {
  padding: 6px 9px;
  border: 1px solid var(--primary);
  background-color: var(--primary);
  color: var(--white);
  border-radius: 5px;
}

/* left */
.footer-nav-left {
  display: flex;
  align-items: center;
}
.footer-nav-left img {
  width: 50px;
  margin-right: 10px;
}
.footer-nav-left p {
  font-size: 20px;
  align-items: center;
  margin: 0;
}

input[type="number"]::-webkit-inner-spin-button {
  color: #8bc4a1;
}


@media (max-width: 991px) {
  .btnColor {
    padding: 10px 15px;
    white-space: nowrap !important;
  }

  .price h3 {
    font-size: 20px;
    white-space: nowrap;
  }

  .footer-nav-left p {
    font-size: 19px;
  }

  .details-price del {
    color: var(--red);
    margin-right: 12px;
  }

  .quantity {
    border: 1px solid var(--primary);
  }
}

@media (max-width: 768px) {
  .videoHW iframe {
    width: 519px !important;
    height: 400px !important;
  }

  .btnColor {
    padding: 10px 15px;
    white-space: nowrap !important;
  }

  .price h3 {
    font-size: 20px;
    white-space: nowrap;
  }

  .footer-nav-left p {
    font-size: 19px;
  }

  .details-price del {
    color: var(--red);
    margin-right: 12px;
  }

  .quantity {
    border: 1px solid var(--primary);
  }
}

@media (max-width: 767px) {
  .footer-nav-left {
    display: none;
  }

  .price {
    display: none;
  }

  .main-nav-footer {
    justify-content: center;
  }

  .quantity {
    margin-right: 15px;
  }
}

@media (max-width: 375px) {
  .discout_amount {
    margin-left: 0px;
  }
}
</style>
