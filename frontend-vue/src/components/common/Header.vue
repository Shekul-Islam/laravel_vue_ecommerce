<script setup>
import { useAuth } from '@/stores';
import { storeToRefs } from 'pinia';
import { ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';


import { onMounted } from 'vue';
import { useSettingStore } from '@/stores';

const auth = useAuth();
const {user, loading} = storeToRefs(auth);
const router = useRouter();
const userLogout = async () => {
const res = await auth.logout();
console.log(res);
};


const setting = useSettingStore();

onMounted (()=> {
  setting.getData();
})



function search() {
  $(".header-form").toggleClass("active"),
    $(this).children(".fa-search").toggleClass("fa-times");
}

function menu() {
  $("body").css("overflow", "hidden"), $(".nav-sidebar").addClass("active");
}

function cartShow() {
  $("body").css("overflow", "hidden"), $(".cart-sidebar").addClass("active");
}
</script>

<template>

  <div>
    <header class="header-part">
      <div class="container">
        <div class="header-content" v-if="setting?.settings?.data">
          <div class="header-media-group">
            <button class="header-user" @click="menu">
              <img src="@/assets/images/menu.png" alt="user" />
            </button>

              <router-link :to="{ name: 'index' }">
                <img :src="setting?.settings?.data" alt="logo"/>
              </router-link>
              
              <button class="header-src" @click="search">
              <i class="fas fa-search"></i>
            </button>
          </div>

          <router-link :to="{ name: 'index' }" class="header-logo">
            <img src="@/assets/images/logo.png" alt="logo"/>
          </router-link>

          <form class="header-form">
            <input type="text" placeholder="Search anything..." /><button>
              <i class="fas fa-search"></i>
            </button>
          </form>
          <div class="header-widget-group hover-nav">
            <li class="nav-item dropdown">
              <a
                class="nav-link header-widget"
                href="#"
                data-bs-toggle="dropdown"
                ><i class="fas fa-user"></i
              ></a>
              <ul class="dropdown-menu dropdown-menu-end" v-if="!user.data">
                <li>
                  <router-link :to="{ name: 'login' }" class="dropdown-item">
                    Login</router-link
                  >
                </li>
                <li>
                  <router-link :to="{ name: 'register' }" class="dropdown-item">
                    Register</router-link
                  >
                </li>
             
              </ul>
              <ul class="dropdown-menu dropdown-menu-end" v-else>
                <li>
                  <router-link :to="{ name: 'user.profile' }" class="dropdown-item">
                    My Profile</router-link
                  >
                </li>
               
                <li>
                  <router-link :to="{ name: 'user.orderlist' }" class="dropdown-item">
                    My Order List</router-link
                  > 
                </li>
                <li>
                  <router-link :to="{ name: 'user.wishlist' }" class="dropdown-item">
                    My Wish List</router-link>
                </li>

                <li>
                  <button 
                  :disabled="loading"
                  class="dropdown-item" 
                  @click="userLogout"
                  >
                    Logout
                  
                    <span v-show="loading"
                      class="spinner-border spinner-border-sm mr-1">
                    </span>

                  </button>
                </li>
              </ul>
            </li>

            <router-link
              :to="{ name: 'wishlist' }"
              class="header-widget"
              title="Wishlist">
              <i class="fas fa-heart"></i><sup>0</sup>
            </router-link>

            <button
              class="header-widget header-cart"
              @click="cartShow"
              title="Cartlist">
              <i class="fas fa-shopping-basket"></i><sup>9+</sup>
              <span>total price<small>$345.00</small></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<style scoped>
.hover-nav .nav-item .dropdown-menu {
  display: none;
  margin-top: 0;
}
.hover-nav .nav-item:hover .dropdown-menu {
  display: block;
}
</style>
