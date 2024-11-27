<script setup>
import { onMounted, watch } from "vue";
import { soldItemStore } from "@/stores";

const soldStore = soldItemStore();

watch(
  () => soldStore?.soldItemData,
  () => {
    console.log(soldStore?.soldItemData);
  }
);

onMounted(() => {
  soldStore.soldData();
});
</script>

<template>
  <div>
    <section class="section recent-sold-items">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h2>recently sold items</h2>
            </div>
          </div>
        </div>
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">

          <div class="col">
            <div class="product-card">
              <div class="product-media">
                <div class="product-label">
                  <label class="label-text sale">sale</label>
                </div>
                <button class="product-wish wish">
                  <i class="fas fa-heart"></i></button
                ><router-link
                  :to="{ name: 'single-product' }"
                  class="product-image"
                  ><img
                    :src="
                      soldStore?.soldItemData?.data?.find(
                        (i) => i.name == 'Dr. Comfort Belt Sandal BS101'
                      ).image
                    "
                    alt="Dr. Comfort Belt Sandal BS101"
                /></router-link>
              </div>
              <div class="product-content">
                <h6 class="product-name">
                  <a href="product-video.html">{{
                    soldStore?.soldItemData?.data?.find(
                      (i) => i.name == "Dr. Comfort Belt Sandal BS101"
                    ).name
                  }}</a>
                </h6>
                <h6 class="product-price">
                  <del>$34</del><span>$28<small></small></span>
                </h6>
                <button class="product-add" title="Add to Cart">
                  <i class="fas fa-shopping-basket"></i><span>Add</span>
                </button>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="product-card">
              <div class="product-media">
                <div class="product-label">
                  <label class="label-text rate">Popular</label>
                  <label class="view-label off">-2%</label>
                </div>
                <button class="product-wish wish">
                  <i class="fas fa-heart"></i></button
                ><a class="product-image" href="product-video.html"
                  ><img
                    :src="
                      soldStore?.soldItemData?.data?.find(
                        (i) => i.name == 'ANON Leather Belt Sandal BS102 Master'
                      ).image
                    "
                    alt="ANON Leather Belt Sandal BS102 Master"
                /></a>
              </div>
              <div class="product-content">
                <h6 class="product-name">
                  <a href="product-video.html">{{
                    soldStore?.soldItemData?.data?.find(
                      (i) => i.name == "Dr. Comfort Belt Sandal BS101"
                    ).name
                  }}</a>
                </h6>
                <h6 class="product-price">
                  <del>$34</del><span>$28<small></small></span>
                </h6>
                <button class="product-add" title="Add to Cart">
                  <i class="fas fa-shopping-basket"></i><span>Add</span>
                </button>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="product-card">
              <div class="product-media">
                <div class="product-label">
                  <label class="label-text sale">sale</label>
                </div>
                <button class="product-wish wish">
                  <i class="fas fa-heart"></i></button
                ><router-link
                  :to="{ name: 'single-product' }"
                  class="product-image"
                  ><img
                    :src="
                      soldStore?.soldItemData?.data?.find(
                        (i) => i.name == 'Dr. Comfort Belt Sandal BS101'
                      ).image
                    "
                    alt="Dr. Comfort Belt Sandal BS101"
                /></router-link>
              </div>
              <div class="product-content">
                <h6 class="product-name">
                  <a href="product-video.html">{{
                    soldStore?.soldItemData?.data?.find(
                      (i) => i.name == "Dr. Comfort Belt Sandal BS101"
                    ).name
                  }}</a>
                </h6>
                <h6 class="product-price">
                  <del>$34</del><span>$28<small></small></span>
                </h6>
                <button class="product-add" title="Add to Cart">
                  <i class="fas fa-shopping-basket"></i><span>Add</span>
                </button>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="product-card">
              <div class="product-media">
                <div class="product-label">
                  <label class="label-text sale">sale</label>
                </div>
                <button class="product-wish wish">
                  <i class="fas fa-heart"></i></button
                ><router-link
                  :to="{ name: 'single-product' }"
                  class="product-image"
                  ><img
                    :src="
                      soldStore?.soldItemData?.data?.find(
                        (i) => i.name == 'Dr. Comfort Belt Sandal BS101'
                      ).image
                    "
                    alt="Dr. Comfort Belt Sandal BS101"
                /></router-link>
              </div>
              <div class="product-content">
                <h6 class="product-name">
                  <a href="product-video.html">{{
                    soldStore?.soldItemData?.data?.find(
                      (i) => i.name == "Dr. Comfort Belt Sandal BS101"
                    ).name
                  }}</a>
                </h6>
                <h6 class="product-price">
                  <del>$34</del><span>$28<small></small></span>
                </h6>
                <button class="product-add" title="Add to Cart">
                  <i class="fas fa-shopping-basket"></i><span>Add</span>
                </button>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="product-card">
              <div class="product-media">
                <div class="product-label">
                  <label class="label-text sale">sale</label>
                </div>
                <button class="product-wish wish">
                  <i class="fas fa-heart"></i></button
                ><router-link
                  :to="{ name: 'single-product' }"
                  class="product-image"
                  ><img
                    :src="
                      soldStore?.soldItemData?.data?.find(
                        (i) => i.name == 'Dr. Comfort Belt Sandal BS101'
                      ).image
                    "
                    alt="Dr. Comfort Belt Sandal BS101"
                /></router-link>
              </div>
              <div class="product-content">
                <h6 class="product-name">
                  <a href="product-video.html">{{
                    soldStore?.soldItemData?.data?.find(
                      (i) => i.name == "Dr. Comfort Belt Sandal BS101"
                    ).name
                  }}</a>
                </h6>
                <h6 class="product-price">
                  <del>$34</del><span>$28<small></small></span>
                </h6>
                <button class="product-add" title="Add to Cart">
                  <i class="fas fa-shopping-basket"></i><span>Add</span>
                </button>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="product-card">
              <div class="product-media">
                <div class="product-label">
                  <label class="label-text sale">sale</label>
                </div>
                <button class="product-wish wish">
                  <i class="fas fa-heart"></i></button
                ><router-link
                  :to="{ name: 'single-product' }"
                  class="product-image"
                  ><img
                    :src="
                      soldStore?.soldItemData?.data?.find(
                        (i) => i.name == 'Dr. Comfort Belt Sandal BS101'
                      ).image
                    "
                    alt="Dr. Comfort Belt Sandal BS101"
                /></router-link>
              </div>
              <div class="product-content">
                <h6 class="product-name">
                  <a href="product-video.html">{{
                    soldStore?.soldItemData?.data?.find(
                      (i) => i.name == "Dr. Comfort Belt Sandal BS101"
                    ).name
                  }}</a>
                </h6>
                <h6 class="product-price">
                  <del>$34</del><span>$28<small></small></span>
                </h6>
                <button class="product-add" title="Add to Cart">
                  <i class="fas fa-shopping-basket"></i><span>Add</span>
                </button>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="product-card">
              <div class="product-media">
                <div class="product-label">
                  <label class="label-text sale">sale</label>
                </div>
                <button class="product-wish wish">
                  <i class="fas fa-heart"></i></button
                ><router-link
                  :to="{ name: 'single-product' }"
                  class="product-image"
                  ><img
                    :src="
                      soldStore?.soldItemData?.data?.find(
                        (i) => i.name == 'Dr. Comfort Belt Sandal BS101'
                      ).image
                    "
                    alt="Dr. Comfort Belt Sandal BS101"
                /></router-link>
              </div>
              <div class="product-content">
                <h6 class="product-name">
                  <a href="product-video.html">{{
                    soldStore?.soldItemData?.data?.find(
                      (i) => i.name == "Dr. Comfort Belt Sandal BS101"
                    ).name
                  }}</a>
                </h6>
                <h6 class="product-price">
                  <del>$34</del><span>$28<small></small></span>
                </h6>
                <button class="product-add" title="Add to Cart">
                  <i class="fas fa-shopping-basket"></i><span>Add</span>
                </button>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="product-card">
              <div class="product-media">
                <div class="product-label">
                  <label class="label-text rate">Popular</label>
                  <label class="view-label off">-2%</label>
                </div>
                <button class="product-wish wish">
                  <i class="fas fa-heart"></i></button
                ><a class="product-image" href="product-video.html"
                  ><img
                    :src="
                      soldStore?.soldItemData?.data?.find(
                        (i) => i.name == 'ANON Leather Belt Sandal BS102 Master'
                      ).image
                    "
                    alt="ANON Leather Belt Sandal BS102 Master"
                /></a>
              </div>
              <div class="product-content">
                <h6 class="product-name">
                  <a href="product-video.html">{{
                    soldStore?.soldItemData?.data?.find(
                      (i) => i.name == "Dr. Comfort Belt Sandal BS101"
                    ).name
                  }}</a>
                </h6>
                <h6 class="product-price">
                  <del>$34</del><span>$28<small></small></span>
                </h6>
                <button class="product-add" title="Add to Cart">
                  <i class="fas fa-shopping-basket"></i><span>Add</span>
                </button>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="product-card">
              <div class="product-media">
                <div class="product-label">
                  <label class="label-text sale">sale</label>
                </div>
                <button class="product-wish wish">
                  <i class="fas fa-heart"></i></button
                ><router-link
                  :to="{ name: 'single-product' }"
                  class="product-image"
                  ><img
                    :src="
                      soldStore?.soldItemData?.data?.find(
                        (i) => i.name == 'Dr. Comfort Belt Sandal BS101'
                      ).image
                    "
                    alt="Dr. Comfort Belt Sandal BS101"
                /></router-link>
              </div>
              <div class="product-content">
                <h6 class="product-name">
                  <a href="product-video.html">{{
                    soldStore?.soldItemData?.data?.find(
                      (i) => i.name == "Dr. Comfort Belt Sandal BS101"
                    ).name
                  }}</a>
                </h6>
                <h6 class="product-price">
                  <del>$34</del><span>$28<small></small></span>
                </h6>
                <button class="product-add" title="Add to Cart">
                  <i class="fas fa-shopping-basket"></i><span>Add</span>
                </button>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="product-card">
              <div class="product-media">
                <div class="product-label">
                  <label class="label-text sale">sale</label>
                </div>
                <button class="product-wish wish">
                  <i class="fas fa-heart"></i></button
                ><router-link
                  :to="{ name: 'single-product' }"
                  class="product-image"
                  ><img
                    :src="
                      soldStore?.soldItemData?.data?.find(
                        (i) => i.name == 'Dr. Comfort Belt Sandal BS101'
                      ).image
                    "
                    alt="Dr. Comfort Belt Sandal BS101"
                /></router-link>
              </div>
              <div class="product-content">
                <h6 class="product-name">
                  <a href="product-video.html">{{
                    soldStore?.soldItemData?.data?.find(
                      (i) => i.name == "Dr. Comfort Belt Sandal BS101"
                    ).name
                  }}</a>
                </h6>
                <h6 class="product-price">
                  <del>$34</del><span>$28<small></small></span>
                </h6>
                <button class="product-add" title="Add to Cart">
                  <i class="fas fa-shopping-basket"></i><span>Add</span>
                </button>
              </div>
            </div>
          </div>


        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="section-btn-25">
              <a href="shop-4column.html" class="btn btn-outline"
                ><i class="fas fa-eye"></i><span>show more</span></a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
