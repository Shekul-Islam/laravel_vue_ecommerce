<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, computed, watch  } from "vue";
import { storeToRefs } from "pinia";
import { useShop, useProduct, useCart, useAuth, useCommonIsToggleFunctionality } from "@/stores";
import { mrpOrOfferPrice } from "@/composables";

// All Variable  Code Is Here.....................................................................................................
const route = useRoute();
const router= useRouter();
const auth = useAuth();
const commonIsToggleFunctionality = useCommonIsToggleFunctionality();
const {  shopSideBar } = storeToRefs(commonIsToggleFunctionality);
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
console.log(sideBar);
const searchCategories = computed(() => {
  return (sideBar?.value?.result?.categories || []).filter((category) => {
    
    
    return category.name
      .toLowerCase()
      .match(searchCategoryQuery.value.toLocaleLowerCase());
  });
  
});

const searchBrands = computed(() => {
  return (sideBar?.value?.result?.brands || []).filter((brand) => {
    return brand.name.toLowerCase().match(searchBrandQuery.value.toLowerCase());
  });
});
 
// attribute data 

const getAttributeData = async() => {
  getAttributeDatas.value = await shop.sideBarAttributeData();
  console.log(getAttributeDatas.value);
  
}

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
  console.log(sortingPrice.value);
  
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
    <div
      class="backdrop"
      :style="{ display: shopSideBar ? 'block' : 'none' }"
      @click="commonIsToggleFunctionality.isShopSideBarOpenOrClose"
    ></div>

    <aside >
        <div class="shop-widget">
            <div class="shop-widget-title" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="true" aria-controls="collapseExample">
                <h6>Filter by Price</h6>
                <a><i class="fa-solid fa-plus"></i></a>
            </div>
            <form class="collapse show" id="collapseExample">
                <div class="shop-widget-group">
                <input type="text" v-model="sortingPrice[0]" :placeholder="`Min - ${$filters.currencySymbol(sideBar?.result?.min_sell_price)}`" />
                <input type="text" v-model="sortingPrice[1]" :placeholder="`Max - ${$filters.currencySymbol(sideBar?.result?.max_sell_price)}`" />
                </div>
                <button class="shop-widget-btn" @click.prevent="getProducts">
                    <i class="fas fa-search"></i>
                    <span>search</span>
                </button>
            </form>
        </div>
        
        <div class="shop-widget" v-for="(getAttributeData, index) in getAttributeDatas" :key="index">
            <div class="shop-widget-header" data-bs-toggle="collapse" :href="`#${getAttributeData.id}`" role="button" aria-expanded="false" aria-controls="collapseExample">
              <h6>Filter by {{ getAttributeData.name }}</h6>
              <a><i class="fa-solid fa-plus"></i></a>
            </div>
            <form class="collapse show" :id="`${getAttributeData.id}`">
              <ul class="shop-widget-list shop-widget-scroll">
                <li v-for="(attributeValue, attributeValueIndex) in getAttributeData.attribute_values" :key="attributeValueIndex">
                  <div class="shop-widget-content">
                    <input type="checkbox" :id="`cate-${index}-${attributeValueIndex}`" :value="attributeValue.id" @change="getProducts()"
                      v-model="selectedAttributeIds" />
                    <label :for="`cate-${index}-${attributeValueIndex}`">{{ attributeValue.value }}</label>
                  </div>
                  <span class="shop-widget-number">({{ attributeValue.products_count }})</span>
                </li>
                
                <!-- <li v-show="searchCategories.length === 0">
                  <img src="@/assets/images/nodatafound.png" class="image-fluid mt-5" alt="" />
                </li> -->
              </ul>
              <button class="shop-widget-btn" @click.prevent="clearFilter('attributeValue')">
                <i class="far fa-trash-alt"></i>
                <span>clear filter</span>
              </button>
            </form>
          </div>

        <div class="shop-widget">
            <div class="shop-widget-header" data-bs-toggle="collapse" href="#category" role="button" aria-expanded="false" aria-controls="collapseExample">
              <h6>Filter by Category</h6>
              <a><i class="fa-solid fa-plus"></i></a>
            </div>
            <form class="collapse show" id="category">
              <input class="shop-widget-search" type="text" placeholder="Search..." v-model="searchCategoryQuery" />
              <ul class="shop-widget-list shop-widget-scroll">
                <li v-for="(category, index) in searchCategories" :key="index">
                  <div class="shop-widget-content">
                    <input type="checkbox" :id="`cate${index}`" :value="category.id" @change="getProducts"
                      v-model="selectedCategoryIds" />
                    <label :for="`cate${index}`">{{ category.name }}</label>
                  </div>
                  <span class="shop-widget-number">({{ category.products_count }})</span>
                </li>
                <!-- <li v-show="searchCategories?.length === 0">
                  <img src="@/assets/images/nodatafound.png" class="image-fluid mt-5" alt="" />
                </li> -->
              </ul>
              <button class="shop-widget-btn" @click.prevent="clearFilter('category')">
                <i class="far fa-trash-alt"></i>
                <span>clear filter</span>
              </button>
            </form>
          </div>

          <div class="shop-widget mb-4">
            <div class="shop-widget-header" data-bs-toggle="collapse" href="#brand" role="button" aria-expanded="false" aria-controls="collapseExample">
              <h6>Filter by Brand</h6>
              <a><i class="fa-solid fa-plus"></i></a>
            </div>
            <form class="collapse show" id="brand">
              <input class="shop-widget-search" type="text" placeholder="Search..." v-model="searchBrandQuery" />
              <TransitionGroup tag="ul" class="shop-widget-list shop-widget-scroll">
                <li v-for="(brand, index) in searchBrands" :key="brand.id">
                  <div class="shop-widget-content">
                    <input type="checkbox" :id="`brand${index}`" :value="brand.id" v-model="selectedBrandIds"
                      @change="getProducts" />
                    <label :for="`brand${index}`">{{ brand.name }}</label>
                  </div>
                  <span class="shop-widget-number">({{ brand.products_count }})</span>
                </li>
                <!-- <li v-show="searchBrands?.length === 0">
                  <img src="@/assets/images/nodatafound.png" class="image-fluid mt-5" alt="" />
                </li> -->
              </TransitionGroup>
              <button class="shop-widget-btn" @click.prevent="clearFilter('brand')">
                <i class="far fa-trash-alt"></i>
                <span>clear filter</span>
              </button>
            </form>
          </div>

       

      <div class="category-footer">
        <p class="text-danger fw-bold">&copy; 2024 Anon Leather</p>
      </div>
    </aside>
  </div>
</template>

<style scoped>


.filter-icon{
  padding: 10px;
  background-color: var(--primary);
  color: white;
  border-radius: 10%;
}

.shop-widget-title{
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}
.shop-widget-header{
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

.shop-widget {
  padding: 20px 20px;
  border-radius: 8px;
  margin-bottom: 25px;
  background: var(--secondary-color);
  border: 1px solid var(--white);
  border-top: 1px solid var(--black) !important;
  border-left: 1px solid var(--black) !important;
  border-bottom: 4px solid var(--black) !important;
  border-right: 2px solid var(--black) !important;
  padding: 5px 10px 5px 10px !important;
  transition: .5s;
}

.shop-widget:hover {
  border-top: 1px solid var(--primary) !important;
  border-left: 1px solid var(--primary) !important;
  border-bottom: 4px solid var(--primary) !important;
  border-right: 2px solid var(--primary) !important;
  transition: .5s;
}

.shop-widget-list li{
  color: var(--black);
}

.shop-widget-list li:hover{
  color: var(--black);
}


.formControl {
  border-top: 4px solid var(--primary) !important;
  border-left: 4px solid var(--primary) !important;
  border-bottom: 1px solid var(--primary) !important;
  border-right: 1px solid var(--primary) !important;
  border-top-left-radius: 20px !important;
  border-bottom-right-radius: 20px !important;;
  padding: 5px 10px 5px 10px !important;
}

.filterSelectBorderPadding {
  border-top: 4px solid var(--primary) !important;
  border-left: 4px solid var(--primary) !important;
  border-bottom: 1px solid var(--primary) !important;
  border-right: 1px solid var(--primary) !important;
  border-top-left-radius: 20px !important;
  border-bottom-right-radius: 20px !important;;
  padding: 5px 10px 5px 10px !important;
}

.filter-icon{
  display: none;
}

@media (max-width: 991px) {
  .filter-icon{
    display: block;
    padding: 6px;
  }

  .shop-widget{
    display: none;
  }

  .filter-short .form-select {
    width: 111px;
  }

  .filter-select {
    height: 35px !important;
  }

  .filterSelectBorderPadding {
    border-top: 2px solid var(--primary) !important;
    border-left: 2px solid var(--primary) !important;
    border-bottom: 1px solid var(--primary) !important;
    border-right: 1px solid var(--primary) !important;
    border-top-left-radius: 20px !important;
    border-bottom-right-radius: 20px !important;
    padding: 5px 10px 5px 12px !important;
  }

  .filter-show {
    width: 360px !important;
  }

  .formControl{
    height: 35px !important;
  }

  .filter-action{
    display: none !important;
  }

}

@media (max-width: 768px) {
  .filter-short {
    width: 87px !important;
  }

  .filter-short {
    width: 168px !important;
  }

}

@media (max-width: 767px) {
  .filter-label{
    display: none
  }

  .filter-short {
    width: 106px !important;
  }

  .filter-show {
    width: 295px !important;
  }

}

@media (max-width: 576px) {
  .formControl {
    width: 88% !important;
    height: 36px !important;
  }

  .filter-show {
    width: 385px !important;
  }

  .filter-short {
    width: 150px;
  }

}

@media (max-width: 425px) {
  .filter-short {
    width: 75px !important;
  }

}
@media (max-width: 320px) {
  .formControl {
    width: 80% !important;
    height: 33px !important;
  }

  .filter-select {
    height: 33px !important;
  }

  .filter-icon {
    padding: 4px;
  }

}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}

.category-sidebar{
  overflow-y: scroll;
}


@media (max-width: 991px) {
    .shop-widget{
      display: block;
    }
  }

</style>
