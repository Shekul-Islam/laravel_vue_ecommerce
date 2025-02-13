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

    {{ getAttributeDatas }}

    <aside :class="['category-sidebar p-2', { active: shopSideBar }]">
        <div class="shop-widget">
            <div class="shop-widget-title" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="true" aria-controls="collapseExample">
                <h6>Filter by Price</h6>
                <a><i class="fa-solid fa-plus"></i></a>
            </div>
            <form class="collapse show" id="collapseExample">
                <div class="shop-widget-group">
                <input type="text" v-model="sortingPrice[0]" :placeholder="`Min - ${$filters.currencySymbol(sideBar?.result?.min_price)}`" />
                <input type="text" v-model="sortingPrice[1]" :placeholder="`Max - ${$filters.currencySymbol(sideBar?.result?.max_price)}`" />
                </div>
                <button class="shop-widget-btn" @click.prevent="getProducts">
                    <i class="fas fa-search"></i>
                    <span>search</span>
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
.category-sidebar{
  overflow-y: scroll;
}


@media (max-width: 991px) {
    .shop-widget{
      display: block;
    }
  }

</style>
