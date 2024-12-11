<script setup>
import { useProduct } from "@/stores";
import {useShop} from "@/stores/";
import { storeToRefs } from "pinia";
// import { data } from "jquery";
import { onMounted, ref, watch } from "vue";
import { useRoute } from 'vue-router';
import { mrpOrOfferPrice } from "@/composables";

/*==============
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
const related = useProduct();

const singleProductData = ref("");
const productVariationPrice = ref("");
const relatedProducts = ref("");

const getSingleProduct = async () =>  {
    const res = await singleProduct.getSingleProductData(route.params.slug);
    if(res?.success){
      singleProductData.value = res?.result;
      getRelatedProducts(res?.result?.category?.id);
    }
}

const getRelatedProducts = async (id) =>  {
    const res = await related.getCategoryData(id);
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
  console.log(shopProduct.value);
}


// const getProducts = () => {
//   products.value = [];
//   shop.getData(
//     productType.value,
//     selectedBrandIds.value,
//     selectedCategoryIds.value,
//     selectedSubCategoryIds.value,
//     selectedAttributeIds.value,
//     sortingPrice.value,
//     searchQuery.value,
//     paginateSize.value,
//   );
// };

const handleProductVariationPrice = (data) => {
   if (data?.length){
    productVariationPrice.value = data[0];
    console.log("ProductVariationPrice", productVariationPrice.value);
    
   }
    
};

const bannerImage = new URL ("@/assets/images/single-banner.jpg", import.meta.url).href;

// watch(() => route.params.slug, (newValue, oldValue) => {
//   getRelatedProducts();
//   });

  watch(
  () => route.params.slug,
  (newSlug, oldSlug) => {
    
    getSingleProduct();
  }
);


onMounted(() => {
    getSingleProduct();
    getProducts();
    handleProductVariationPrice();
    getRelatedProducts();
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
                                <li ><img :src="singleProductData?.image"></li>
                               
                            </ul>

                       
                            <ul class="details-thumb" >
                              <li><img :src="singleProductData?.image" alt=""></li>
                            </ul>
                </div>
              </div>

              <div class="col-md-6 col-lg-6">
                <div class="view-details">
                  <h3 class="view-name">
                    <a href="#">{{ singleProductData.name }}</a>
                  </h3>
                  <div class="view-meta">
                    <p>SKU: {{ singleProductData?.sku }}</p>
                    <p>BRAND:<a href="#">{{ singleProductData?.brand?.name }}</a></p>
                    
                    <div :class="`${type}-meta`">
                      <p v-if="singleProductData?.category">
                        Category: <a href="">{{ singleProductData?.category?.name }}</a>
                      </p>
                      <p v-if="singleProductData?.sub_category">
                        Sub Category: <a href="">{{ singleProductData?.sub_category?.name}}</a>
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
                  
                  {{ singleProductData }}
                  <span v-if="singleProductData"> 
                      {{ singleProductData?.variation_price_range?.min_price }}
                    <h3 class="details-price" v-if="productVariationPrice == '' || productVariationPrice == undefined">
                      <span v-if="singleProductData?.variation_price_range?.min_price == singleProductData?.variation_price_range?.max_price ">{{ $filters?.currencySymbol(singleProductData?.variation_price_range?.min_price || singleProductData?.variation_price_range?.max_price) }}</span>
                      <span>{{singleProductData?.variation_price_range?.min_price}} {{ singleProductData?.variation_price_range?.max_price }}</span>
                    </h3>                            
                    <h3 :class="`${type}-price my-2`" v-else-if="productVariationPrice != 0 ">
                      <span>
                        {{$filters.currencySymbol(productVariationPrice?.sell_price)}}
                      </span>
                    </h3>
                    <h3 :class="`${type}-price my-2`" v-else>
                      <span>
                        {{ singleProductData?.mrp }}
                      </span>
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
                  <div class="view-add-group">
                    <button class="product-add" title="Add to Cart">
                      <i class="fas fa-shopping-basket"></i
                      ><span>add to cart</span>
                    </button>
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