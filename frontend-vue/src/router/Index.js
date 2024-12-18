import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "@/stores";
// import Index from "@/views/pages/home/Index.vue";
// import HomeLanding from "@/views/pages/home/HomeLanding.vue";
import Shop from "@/views/pages/shop/Shop.vue";
import Blog from "@/views/pages/blog/Blog.vue";
import { SellerPage, SellerList, SellerApply } from "@/views/pages/seller";
import WishList from "@/views/pages/wishlist/WishList.vue";
import { Login, Register } from "@/views/auth";
import { MyProfile, MyOrderList, MyWishList, Checkout } from "@/views/user";
import HomePage from "../views/pages/home/HomePage.vue";
import Invoice from "../views/user/Invoice.vue";
import ProductDetailsPage from "@/views/pages/product/ProductDetailsPage.vue";
import CheckoutPage from '@/views/user/CheckoutPage.vue'


const routes = [
  { path: "/", 
    name: "index",
    component: HomePage,
    meta: { title: "Home" },
  },
  { path: "/shop",
    name: "shop",
    component: Shop,
    meta: { title: "Shop" },
  },
  { path: "/blog",
    name: "blog", 
    component: Blog, 
    meta: { title: "blog" },
  },
  // {
  //   path: "/single-product",
  //   name: "single-product",
  //   component: SingleProduct,
  //   meta: { title: "Single Product" },
  // },
  {
    path: "/user/profile",
    name: "user.profile",
    component: MyProfile,
    meta: { title: "My Profile", requiresAuth: true },
  },
  {
    path: "/user/orderlist",
    name: "user.orderlist",
    component: MyOrderList,
    meta: { title: "My Order List", requiresAuth: true },
  },
  {
    path: "/user/wishlist",
    name: "user.wishlist",
    component: MyWishList,
    meta: { title: "My Wish List", requiresAuth: true },
  },
  {
    path: "/user/checkout",
    name: "user.checkout",
    component: Checkout,
    meta: { title: " Checkout" },
  },
  {
    path: "/user/invoice",
    name: "user.invoice",
    component: Invoice,
    meta: { title: " Checkout" },
  },
  {
    path: "/seller-page",
    name: "seller-page",
    component: SellerPage,
    meta: { title: "Seller-Page" },
  },
  {
    path: "/seller-list",
    name: "seller-list",
    component: SellerList,
    meta: { title: "Seller-List" },
  },
  {
    path: "/seller/apply",
    name: "seller.apply",
    component: SellerApply,
    meta: { title: "Seller Apply" },
  },
  {
    path: "/wishlist",
    name: "wishlist",
    component: WishList,
    meta: { title: "Wish-List" },
  },
  { path: "/login", 
    name: "login", 
    component: Login,
    meta: { title: "Login", guest: true },
  },

  {
    path: "/register",
    name: "register",
    component: Register,
    meta: { title: "Register", guest: true },
  },

  {
    path: "/product-details/:slug?",
    name: "productDetailsPage",
    component: () => import('@/views/pages/product/ProductDetailsPage.vue'),
    meta: { title: " Product Details" },
  },
  {
    path: "/checkout-page",
    name: "checkoutPage",
    component: CheckoutPage,
    meta: { title: " Checkout Page" },
  },

  // {
  //   path: "/shekul",
  //   name: "homeLandingPage",
  //   component: HomeLanding,
  //   meta: { title: "Global Bazar | Landing Page" },
  // },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const defaul_title = "404";

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || defaul_title;

  const loggedIn = useAuth();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!loggedIn.user.meta) {
      next({ name: "login" });
    } else {
      next();
    }
  } else  if (to.matched.some((record) => record.meta.guest)) {
    if (loggedIn.user.meta) {
      next({ name: "user.profile" });
    } else {
      next();
    }
    
  }else {
    next();
  }

});

export default router;
