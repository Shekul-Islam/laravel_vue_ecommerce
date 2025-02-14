<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, computed, watch  } from "vue";
import { storeToRefs } from "pinia";
import { useShop, useProduct, useCart, useAuth, useCommonIsToggleFunctionality } from "@/stores";
import { mrpOrOfferPrice } from "@/composables";
import ModalFade from "../../../components/modal/ModalFade.vue";
import ShopSidebar from "../../../components/shopsidebar/ShopSidebar.vue";


// All Variable  Code Is Here.....................................................................................................
const route = useRoute();
const router= useRouter();
const auth = useAuth();
const commonIsToggleFunctionality = useCommonIsToggleFunctionality();
const cart = useCart();
const { loadings } = storeToRefs(cart);
const isloadings = ref(loadings);
const quantityInput = ref(1);
const getAttributeDatas = ref();

const shop = useShop(); 
const singleShopProduct = useProduct();
const relatedShopProducts = useProduct();
const { products, sideBar, loading } = storeToRefs(shop);

const singleProductData = ref("");
const relatedShopProductsData = ref("");
const searchBrandQuery = ref("");
const searchCategoryQuery = ref("");

const previewData = ref('')
const productType = ref("");
const selectedBrandIds = ref([]);
const selectedCategoryIds = ref([]);
const selectedAttributeIds = ref([]);
const selectedSubCategoryIds = ref("");
const sortingPrice = ref([]);
const searchQuery = ref("");
const paginateSize = ref("");
const productVariationPrice = ref("");

const isloading = ref(loading);
const color = "white";
const size = "8px";


const bannerImage = new URL("@/assets/images/single-banner.jpg", import.meta.url).href;

// tab section
const currentTab = ref("three");

const price = ref();

// banner part start
const banners = ref(''); 
// banner part end

// API Calling Code Is Here.....................................................................................................

const getSingleProduct = async () =>  {
    const res = await singleShopProduct.getSingleProductData(route.params.slug);
    if(res?.success){
      console.log(res);
      
      singleProductData.value = res?.result;
      getRelatedProducts(res?.result?.category?.id);
    }
}

const getRelatedProducts = async (id) =>  {
    const res = await singleShopProduct.getCategoryData(id);
    relatedShopProductsData.value = res;
    
}


const previewModal = async(productSlug) =>{
const res = await singleShopProduct.getSingleProductData(productSlug);
  if(res?.success){
    previewData.value = res?.result;
    
  }
$("#product-view").modal("show");
}

function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    height: "1.6em",
    delay: el.dataset.index * 0.15,
    onComplete: done,
  });
}

watch(
  () => [...searchQuery.value],
  async (newValue, oldValue) => {
    if (newValue.length >= 3 || oldValue.length >= 3) {
      getProducts();
    }
  }
);

const searchCategories = computed(() => {
  return shop?.sideBar?.result?.categories?.filter((category) => {
    return category.name
      .toLowerCase()
      .match(searchCategoryQuery.value.toLocaleLowerCase());
  });
});

const searchBrands = computed(() => {
  return shop?.sideBar?.result?.brands?.filter((brand) => {
  return brand.name.toLowerCase().match(searchBrandQuery.value.toLowerCase());
  });
});

const getProducts = () => {
  products.value = [];
  shop.getData(
    productType.value,
    selectedBrandIds.value,
    selectedCategoryIds.value,
    selectedSubCategoryIds.value,
    selectedAttributeIds.value,
    sortingPrice.value,
    searchQuery.value,
    paginateSize.value,
  );
};

function clearFilter(data) {
  if (data == "brand") {
    selectedBrandIds.value = [];
  }else if(data == "category") {
    selectedCategoryIds.value = [];
  } else {
    selectedAttributeIds.value = [];
  }

  getProducts();
}

// Category wise product showing

const queryProducts = () => {
  selectedCategoryIds.value = [];
  selectedBrandIds.value = [];
  selectedAttributeIds.value = [];
  if (route.query.attribute) {
    selectedAttributeIds.value.push(route.query.attribute);
  }
  if (route.query.category) {
    selectedCategoryIds.value.push(route.query.category);
  }
  if (route.query.subCategory) {
    selectedSubCategoryIds.value = route.query.subCategory;
  }
  if (route.query.brand) {
    selectedBrandIds.value.push(route.query.brand);
  }
  if (route.query.recent) {
    productType.value = route.query.recent;
  }
  if (route.query.top) {
    productType.value = route.query.top;
  }
  if (route.query.feature) {
    productType.value = route.query.feature;
  }
};


watch(
  () => route.query.category || route.query.brand || route.query.subCategory,
  async (newValue, oldValue) => {
    console.log(newValue, oldValue);
    queryProducts();
    getProducts();
  }
);

function closeCategorySideBar() {
        $('.category-sidebar').removeClass('active');
        $('.backdrop').fadeOut();

}

const handleProductVariationPrice = (data) => {
   if (data?.length){
    productVariationPrice.value = data[0];
    console.log("ProductVariationPrice", productVariationPrice.value);
    
   }
    
};


// attribute data 

const getAttributeData = async() => {
  getAttributeDatas.value = await shop.sideBarAttributeData();
}

onMounted(() => {
  getRelatedProducts();
  closeCategorySideBar();
  getAttributeData();
  queryProducts();
  shop.getData();
  shop.sideBarData();
  handleProductVariationPrice();
  getProducts();
  $(document).ready(function () {
    $(".venobox").venobox();
  });
});

</script>

<template>
  <div>
    <section class="inner-section single-banner" :style="{ background: 'url(' + bannerImage + ') center center no-repeat', }">
      <div class="container">
        <h2>Shop Page</h2>
      </div>
    </section>
    <section class="inner-section shop-part" >
      <div class="container">
        <div class="row content-reverse">

          <div class="col-lg-3">
            Hello Sidebar
            <ShopSidebar/>
          </div>

          <!-- <div class="col-lg-3" >
            <div class="shop-widget">
              <h6 class="shop-widget-title">Filter by Price</h6>
              <form>
                <div class="shop-widget-group" v-if="shop?.sideBar">
                  <input type="text" v-model="sortingPrice[0]" :placeholder="`Min - ${shop?.sideBar?.min_sell_price}`">
                  <input type="text" v-model="sortingPrice[1]" :placeholder="`Max - ${shop?.sideBar?.max_sell_price }`"/>
                </div>

                <button class="shop-widget-btn" @click.prevent="getProducts">
                  <i class="fas fa-search"></i><span>search</span>
                </button>
              </form>
            </div>

            <div class="shop-widget" >
              <h6 class="shop-widget-title">Filter by Brand</h6>
              <form>
                <input class="shop-widget-search" type="text" placeholder="Search..."/>

                  <ul class="shop-widget-list shop-widget-scroll" >
                    <li v-for=" (brand, brandIndex) in searchBrands" :key="brandIndex">
                      <div class="shop-widget-content">
                        <input type="checkbox" id="brand1"/><label for="brand1">{{brand?.name}}</label>
                      </div>
                      <span class="shop-widget-number">({{brand?.products_count}})</span>
                    </li>
                  </ul>

                <button class="shop-widget-btn">
                  <i class="far fa-trash-alt"></i><span>clear filter</span>
                </button>
              </form>
            </div>


            <div class="shop-widget">
              <h6 class="shop-widget-title">Filter by Category</h6>
              <form>
                <input class="shop-widget-search" type="text" placeholder="Search..."/>
                <ul class="shop-widget-list shop-widget-scroll">
                  <li v-for="(category, index) in searchCategories" :key="index" >
                    <div class="shop-widget-content">
                      <input type="checkbox" :id="`cate${index}`" :value="category.id" @change="getProducts"
                      v-model="selectedCategoryIds"/><label :for="`cate${index}`">{{category?.name}}</label>
                    </div>
                    <span class="shop-widget-number">({{category?.products_count}})</span>
                  </li>
                </ul>

                <button class="shop-widget-btn">
                  <i class="far fa-trash-alt"></i><span>clear filter</span>
                </button>
              </form>
            </div>
          </div> -->

          <div class="col-lg-9">
            <div class="row">
              <div class="col-lg-12" >
                <div class="top-filter">
                  <div class="filter-show">
                    <label class="filter-label">Show :</label>
                    <select class="form-select filter-select" @change="getProducts" v-model="paginateSize">
                      <option value="6">6</option>
                      <option value="12">12</option>
                      <option value="24">24</option>
                      <option value="36">36</option>
                    </select>
                  </div>

                  <div class="filter-short">
                    <label class="filter-label">Short by :</label>
                    <select class="form-select filter-select" @change="getProducts" v-model="productType">
                      <option value="" selected>default</option>
                      <option value="top-product">Top Product</option>
                      <option value="feature-product">Feature Product</option>
                      <option value="recent-product">Recent Product</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <!-- {{ relatedShopProductsData }} -->
            <div class="row row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4" >
              <div class="col"  v-for="(product, id) in products?.data" :key="id">
                <div class="product-card">
                  <div class="product-media">

                    <div class="product-label">
                      <label class="label-text rate">Popular</label>
                      
                      <label class="view-label off">-2%</label>
                    </div>

                    <button class="product-wish wish">
                      <i class="fas fa-heart"></i>
                    </button>

                    
                    <router-link :to="{ name: 'productDetailsPage', params: { slug:product.slug } }">
                      <a  class="product-image">
                        <img :src="product?.image" alt="products.image"/>
                      </a>
                    </router-link>
                    <div class="product-widget">
                      <a title="Product Compare" href="compare.html" class="fas fa-random"></a>
                      <a title="Product Video" v-show="product?.video_url" :href="product?.video_url" class="venobox fas fa-play" data-vbtype="video" data-autoplay="true"></a>
                      <a title="Product View" href="#" class="fas fa-eye" data-bs-target="#product-view"  @click.prevent="previewModal(product?.slug)"></a>
                    </div>
                  </div>
                
                  <div class="product-content">
                    <h6 class="product-name">
                      <router-link :to="{name: 'productDetailsPage'}">{{product?.name}}</router-link>
                    </h6>
                    <h6 class="product-category">
                      <a href="">{{ product?.category?.name }}</a>
                    </h6>
                    <h6 class="product-brand">
                      <a href="">{{ product?.brand?.name }}</a>
                    </h6>

                        <span class="product-price" v-if="product?.variations?.data?.length"> 
                            <h6 class="details-price" v-if="productVariationPrice == '' || productVariationPrice == undefined">
                                <span v-if="product?.variation_price_range?.min_price == product?.variation_price_range?.max_price ">{{ $filters?.currencySymbol(product?.variation_price_range?.min_price || product?.variation_price_range?.max_price) }}</span>
                            </h6>
                           </span>
                           
                           <!-- <span v-else>
                              <h6 :class="`${type}-price details-price`">
                                <del>{{ $filters.currencySymbol(product.mrp) }}</del>
                                <span>{{ $filters.currencySymbol( mrpOrOfferPrice( product?.mrp, product?.offer_price ))}}</span>
                              </h6>
                              <h6 :class="`${type}-price details-price` " >
                                <span v-if="product?.mrp === product?.offer_price">{{ product?.mrp}}</span>
                              </h6>
                            </span> -->

                            <!-- <span v-else>
                              <h6 :class="`${type}-price details-price`">
                               
                                <template v-if="product.mrp == product.offer_price">
                                  {{ $filters.currencySymbol(mrpOrOfferPrice(product.mrp)) }}
                                </template>
                                <template v-else>
                                  {{ product?.mrp }}
                                  {{ product?.offer_price }}
                                  <del>{{ $filters.currencySymbol(product.mrp) }}</del>
                                  <span>{{ $filters.currencySymbol(mrpOrOfferPrice(product.mrp, product.offer_price)) }}</span>
                                </template>
                              </h6>
                            </span> -->
                            <span v-else>
                              <h6 :class="`${type}-price details-price`">
                               
                                <template v-if="product.mrp == product.offer_price">
                                  {{ $filters.currencySymbol(mrpOrOfferPrice(product.mrp)) }}
                                </template>
                                <template v-else>
                                  <del>{{ $filters.currencySymbol(product.mrp) }}</del>
                                  <span>{{ $filters.currencySymbol(mrpOrOfferPrice(product.mrp, product.offer_price)) }}</span>
                                </template>
                              </h6>
                            </span>
                   

                    <button class="product-add" title="View Details">
                      <span><router-link :to="{name: 'productDetailsPage', params:{ slug:product.slug } }" ><i class="fa-solid fa-shopping-basket icon-style"></i>Product Preview</router-link></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-12">
                <div class="bottom-paginate">
                  <p class="page-info">Showing 12 of 60 Results</p>
                  <ul class="pagination">
                    <li class="page-product">
                      <a class="page-link" href="#"
                        ><i class="fas fa-long-arrow-alt-left"></i
                      ></a>
                    </li>
                    <li class="page-product">
                      <a class="page-link active" href="#">1</a>
                    </li>
                    <li class="page-product">
                      <a class="page-link" href="#">2</a>
                    </li>
                    <li class="page-product">
                      <a class="page-link" href="#">3</a>
                    </li>
                    <li class="page-product">...</li>
                    <li class="page-product">
                      <a class="page-link" href="#">60</a>
                    </li>
                    <li class="page-product">
                      <a class="page-link" href="#"
                        ><i class="fas fa-long-arrow-alt-right"></i
                      ></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <ModalFade :preview-data="previewData"/>
  </div>
</template>

<style scoped>

.product-widget a[title="Product View"], .product-widget a[title="Product Video"] {
  background-color: var(--primary);
  color: var(--white);
}
.product-widget a[title="Product View"]:hover, .product-widget a[title="Product Video"]:hover {
  background-color: var(--secondary-color);
  color: var(--white);
}

.product-add span a {
  font-family: initial;
}

.product-add .icon-style {
  font-family: "Font Awesome 6 Free";
  font-weight: 900;
}

</style>
