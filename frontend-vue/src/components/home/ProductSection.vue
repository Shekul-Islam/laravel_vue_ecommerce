<script setup>
import { watch,ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { soldItemStore, useProduct, useCommonIsToggleFunctionality } from "@/stores";

import { storeToRefs } from "pinia";
import { mrpOrOfferPrice, addToCart } from "@/composables";

import ModalFade from "@/components/modal/ModalFade.vue";

// Pinia stores
const soldStore = soldItemStore();
const { products } = storeToRefs(soldStore);

// Route
const route = useRoute();

// single product
const singleProduct = useProduct();
const singleProductDataAdd = ref("");
const relatedProductsAdd = ref("");

// Product-related functions


// Ref variables
const singleProductData = ref(null);
const relatedShopProductsData = ref([]);
const previewData = ref("");
const activeBtns  = ref(false);

//product variation variables
const productVariationData  = ref("");



const commonIsToggleFunctionality = useCommonIsToggleFunctionality();
const emit = defineEmits(['productVariationPrice', 'productVariationData', 'activeBtns']);



// product prices start
const handleProductVariationData = (data) => {
  productVariationData.value = data 
  emit('productVariationData', data);
}
// product prices end

// product prices start
const handleActiveBtns = (data) => {
  activeBtns.value = data
  emit('activeBtns', data);
}
// product prices end


const props = defineProps({
 singleProduct: {
    type: [Object, String],
    default: {},
  },

 productVariations: {
    type: Object,
    default: {}, 
  },
 campaignSlug: {
    type: String,
    default: null,
  },
 type: {
    type: String,
    default: null, 
  },
});

// single product add
const getSingleProductAdd = async () =>  {
    const res = await singleProduct.getSingleProductDataAdd(route.params.slug);
    if(res?.success){
      singleProductDataAdd.value = res?.result;
      console.log(singleProductDataAdd);
      
      getRelatedProductsAdd(res?.result?.category?.id);
    }
}
const getRelatedProductsAdd = async (id) =>  {
    const res = await related.getCategoryDataAdd(id);
    relatedProductsAdd.value = res;
}
// single product


//single shop product
const getSingleProduct = async () => {
  const res = await singleProduct?.getSingleProductData();
  if (res){
    singleProductData.value = res?.result;
    getRelatedProducts(res?.result?.category?.id);
  }
}

const getRelatedProducts = async(id) =>{
  const res = await singleProduct?.getCategoryData(id);
  relatedShopProductsData.value = res;
}

const previewModal = async (productSlug) =>{
  const res = await singleProduct?.getSingleProductData(productSlug);
  if (res?.success){
    previewData.value = res?.result;
    console.log(previewData.value);
    
  }
  $("#product-view").modal("show");
}
//single shop product


const cartShow = () => {
  commonIsToggleFunctionality.isCartSideBarOpenOrClose();
};

watch(
  () => route.params.slug,
  (newSlug, oldSlug) => {
    
    getSingleProduct();
  }
);


onMounted(() => {
  soldStore.soldData();
  getSingleProduct();
  getRelatedProducts();

});
</script>

<template>
  
  <div>
    
    <section class="section recent-sold-items" v-for="(section, index) in soldStore?.soldItemData?.data" :key="index">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h2>{{section.title}}</h2>
            </div>
          </div>
        </div>
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
          <div class="col" v-for="(data, i) in section?.products?.data" :key="i">
            <div class="product-card">
              <div class="product-media">
                <div class="product-label">
                  <label class="label-text sale">{{data?.type}}</label>
                </div>

                <button class="product-wish wish">
                  <i class="fas fa-heart"></i>
                </button>

               
                <router-link :to="{ name: 'productDetailsPage', params: { slug:data.slug } }" class="fas fa-shopping-basket">
                  <a  class="product-image">
                  <img :src="data?.image" alt="Dr. Comfort Belt Sandal BS101"/>
                </a>
                </router-link>
                <div class="product-widget">
                      <a title="Product Compare" href="compare.html" class="fas fa-random"></a>
                      <a title="Product Video" v-show="product?.video_url" :href="product?.video_url" class="venobox fas fa-play" data-vbtype="video" data-autoplay="true"></a>
                      <a title="Product View" href="#" class="fas fa-eye" data-bs-target="#product-view"  @click.prevent="previewModal(data?.slug)"></a>
                </div>
              </div>


              <div class="product-content">
                <h6 class="product-name">
                  <router-link :to="{name: 'productDetailsPage'}">{{data?.name}}</router-link>
                </h6>
                <span style="font-size:12px;">
                  <span style="font-weight:700;">Category :</span> 
                  {{ data?.category?.name }}
                </span>

                <h6 class="product-price">
                  <span v-if="data?.variations?.data?.length">
                    <span>{{ data?.variation_price_range?.min_price }} Tk <span v-if="data?.variation_price_range?.max_price != data?.variation_price_range?.min_price"> - {{ data?.variation_price_range?.max_price }} Tk</span></span>
                  </span>

                  <span v-else>
                    <span v-if="data?.offer_price != 0"><del class="text-danger">{{ data?.mrp }} Tk</del></span>
                    <span> {{ data?.offer_price != 0 ? data?.offer_price : data?.mrp }} Tk</span>
                  </span>
                </h6>
                
                
                  <div :class="`${type}-add-group`">
                      <div class="row" v-if="singleProductDataAdd?.variations?.data.length > 0">
                        <div class="col-md-12 mt-lg-0 mt-3">
                          <button class="product-add" title="Add to Cart" 
                            :disabled="activeBtns === false && singleProductDataAdd?.variations?.data.length > 0"
                            :class="{ singleProductBtn: activeBtns === false }"
                            
                            @click.prevent="
                              addToCart(
                                singleProductDataAdd,
                                quantityInput,
                                productVariationData,
                                productVariationPrice,
                                campaignSlug
                              )
                            ">
                            <i :class=" loading == singleProductDataAdd.id? 'fa-solid fa-spinner fa-spin': 'fas fa-shopping-basket'"></i>
                            <span>add to cart</span>
                          </button>
                        </div>
                        
                      </div>
                      
                      <div class="row" v-else>
                        <div class="col-md-12 mt-lg-0 mt-3">
                          <button
                            class="product-add"
                            title="Add to Cart"
                            @click.prevent="addToCart(singleProductDataAdd, quantityInput, null, 0, campaignSlug)"
                            @click="cartShow"
                          >
                            <i
                              :class="
                                loading == singleProductDataAdd.id
                                  ? 'fa-solid fa-spinner fa-spin'
                                  : 'fas fa-shopping-basket'
                              "
                            ></i>
                            <span>add to cart</span>
                          </button>
                        </div>
                      
                      </div>
                    </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12">
            <div class="section-btn-25">
              <a href="shop" class="btn btn-outline"
                ><i class="fas fa-eye"></i><span>show more</span></a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
    <ModalFade :preview-data="previewData"/>
  </div>
</template>

<style scoped>

.singleProductBtn {
  background: rgb(199, 40, 40);
  color: white;
  border: 0;
  cursor: pointer;
  padding: 1em;
  opacity: 0.5;
  cursor: not-allowed;
}


</style>
