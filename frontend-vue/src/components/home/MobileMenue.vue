<script setup>

// function closeMenu() {
//   $("body").css("overflow", "inherit");
//   $(".nav-sidebar").removeClass("active");
//   $(".backdrop").fadeOut();
// }

 
function cartBtn() {
  $("body").css("overflow", "hidden"),
      $(".cart-sidebar").addClass("active");
     
     
}

function cateBtn() {
  $("body").css("overflow", "hidden"),
      $(".category-sidebar").addClass("active");
    

}

</script>

<template>
  <div>
    <div class="mobile-menu">
      <a
        href="/"
        class="active router-link-exact-active"
        title="Home Page"
        aria-current="page"
        ><i class="fas fa-home"></i><span>Home</span></a
      >
      <button class="cate-btn" @click="cateBtn" title="Category List">
        <i class="fas fa-list"></i><span>category</span>
      </button>
      <button class="cart-btn" @click="cartBtn" title="Cartlist">
        <i class="fas fa-shopping-basket"></i><span>Cart</span><sup>2</sup>
      </button>
      <a href="/my-wishist" class="" title="Wishlist"
        ><i class="fas fa-bell"></i><span>Notifications</span><sup>0</sup></a
      >
      <a href="/user/profile" class="" title="My Account"
        ><i class="fas fa-user"></i><span>My Account</span></a
      >
    </div>
  </div>
</template>


<style scoped>

</style>