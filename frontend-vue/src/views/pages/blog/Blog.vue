<script setup>
import { ref, onMounted, computed } from "vue";
import { useBlog, useCategory } from '@/stores'
import { storeToRefs } from 'pinia';

const blog = useBlog();
const category = useCategory();
const {categories} = storeToRefs(category);
// getBlogPost data start
const blogPostData = ref()
// getBlogPost data end
// tag data start
const tagData = ref()
const tagId = ref()
// tag data end

//searchingn in blog post start
const searchBlogPost = ref()
//searchingn in blog post end

// getBlogPost data start
const getBlogPost = async (tagID = '', BlogPost) => {
    const res = await blog.getBlogPost(tagID, BlogPost); 
    if (res.success) {
        blogPostData.value = res.result.data
        tagId.value = tagID
    }
    
}



const searchQuery = async() => {
    getBlogPost('', searchBlogPost.value)
}



// Define a computed property to format the date
const formattedDate = (createdAtString) => {
  const createdAtDate = new Date(createdAtString);
  return createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit"
  });
};
// getBlogPost data end


// tag data start
const getTags = async () => {
    const res = await blog.getTag(); 
    if (res.success) {
        tagData.value = res
    }
}
// tag data end


// watch(
//   () => {searchBlogPost.value},
//   async (newValue, oldValue) => {
//     if (newValue.length >= 3 || oldValue.length >= 3) {
//         console.log("sdfsdaf");
//       getProducts();
//     }
//   }
// );

const bannerImage = new URL("@/assets/images/single-banner.jpg", import.meta.url).href;

onMounted(() => {
  getTags();
  getBlogPost();
  category.getCategories()
});
</script>

<template>
    
  <div>
        <!--=====================================
                    BANNER PART START
        =======================================-->
        <section class="inner-section single-banner" :style=" {background: 'url(' + bannerImage +') center center no-repeat'}">
            <div class="container">
                <h2>blog Standard</h2>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Blog Standard</li>
                </ol>
            </div>
        </section>
        <!--=====================================
                    BANNER PART END
        =======================================-->


        <!--=====================================
                  BLOG STANDARD PART START
        =======================================-->
        <section class="inner-section blog-standard" >
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8" >
                        <div class="row">
                            <div>
                              <div class="col-lg-12">
                                <div class="top-filter">
                                    <div class="filter-show">
                                        <label class="filter-label">Show :</label>
                                        <select class="form-select filter-select">
                                            <option value="12">12</option>
                                            <option value="24">24</option>
                                            <option value="36">36</option>
                                        </select>
                                    </div>
                                    <div class="filter-short">
                                        <label class="filter-label">Short by :</label>
                                        <select class="form-select filter-select">
                                            <option selected>default</option>
                                            <option value="3">recent</option>
                                            <option value="1">featured</option>
                                            <option value="2">recommend</option>
                                        </select>
                                    </div>
                                    <div class="filter-action">
                                        <a href="blog-grid.html" title="Two Column"><i class="fas fa-th-large"></i></a>
                                        <a href="blog-standard.html" class="active" title="One Column"><i class="fas fa-th-list"></i></a>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-12" v-for="(blogPost, index) in blogPostData" :key="index">
                                <div>
                                </div>
                                <div class="blog-card">
                                    <div class="blog-media">
                                        <a class="blog-img" href="#">
                                            <img :src="blogPost.image" alt="blog">
                                        </a>
                                    </div>
                                    <div class="blog-content">
                                        <ul class="blog-meta">
                                            <li>
                                                <i class="icofont-ui-calendar"></i>
                                                <span>{{blogPost?.tags[1]?.pivot?.created_at}}</span>
                                            </li>
                                            <li>
                                                <i class="icofont-user-alt-3"></i>
                                                <span>{{ blogPost?.created_by?.username }}</span>
                                            </li>
                                            <li>
                                                <i class="icofont-speech-comments"></i>
                                                <span> 25 comments</span>
                                            </li>
                                        </ul>
                                        <h4 class="blog-title">
                                            <a href="blog-details.html">Practical Suggestions To Improve Usability Landing Sages With Animation Slides.</a>
                                        </h4>
                                        <p class="blog-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci laborum labore quaerat omnis vero ducimus molestiae amet eum repellendus, ab sapiente assumenda. Et sapiente cum obcaecati quia veritatis hic explicabo.</p>
                                        <a class="blog-btn" href="blog-details.html">
                                            <span>read more</span>
                                            <i class="icofont-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-12">
                                <div class="bottom-paginate">
                                    <p class="page-info">Showing 12 of 60 Results</p>
                                    <ul class="pagination">
                                        <li class="page-item">
                                            <a class="page-link" href="#">
                                                <i class="fas fa-long-arrow-alt-left"></i>
                                            </a>
                                        </li>
                                        <li class="page-item"><a class="page-link active" href="#">1</a></li>
                                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                                        <li class="page-item">...</li>
                                        <li class="page-item"><a class="page-link" href="#">60</a></li>
                                        <li class="page-item">
                                            <a class="page-link" href="#">
                                                <i class="fas fa-long-arrow-alt-right"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-10 col-md-7 col-lg-4">
                        <div class="blog-widget">
                            <h3 class="blog-widget-title">Find blogs</h3>
                            <form class="blog-widget-form">
                                <input type="text"  v-model="searchBlogPost" @input="searchQuery" placeholder="Search blogs">
                                <button class="icofont-search-1"></button>
                            </form>
                        </div>

                        <div class="blog-widget">
                            <h3 class="blog-widget-title">popular feeds</h3>
                            <ul class="blog-widget-feed">
                                <li>
                                    <a class="blog-widget-media" href="#">
                                        <img src="" alt="blog-widget">
                                    </a>
                                    <h6 class="blog-widget-text">
                                        <a href="#">Lorem ipsum dolor sit amet consectetur</a>
                                        <span>february 02, 2021</span>
                                    </h6>
                                </li>
                                <li>
                                    <a class="blog-widget-media" href="#">
                                        <img src="" alt="blog-widget">
                                    </a>
                                    <h6 class="blog-widget-text">
                                        <a href="#">Lorem ipsum dolor sit amet consectetur</a>
                                        <span>february 02, 2021</span>
                                    </h6>
                                </li>
                                <li>
                                    <a class="blog-widget-media" href="#">
                                        <img src="" alt="blog-widget">
                                    </a>
                                    <h6 class="blog-widget-text">
                                        <a href="#">Lorem ipsum dolor sit amet consectetur</a>
                                        <span>february 02, 2021</span>
                                    </h6>
                                </li>
                            </ul>
                        </div>
                        
                        <div class="blog-widget">
                            <h3 class="blog-widget-title">top categories</h3>

                            <ul class="blog-widget-category" v-for="(cate, cateIndex) in category?.categoryPageData?.data" :key="cateIndex">
                                <li><a href="#">{{cate.name}}<span>({{cate.products_count}})</span></a></li>
                            </ul>

                        </div>

                        <div class="blog-widget">
                            <h3 class="blog-widget-title">popular tags</h3>
                            <ul class="blog-widget-tag" v-for="(tag, tagIndex) in tagData?.result?.data" :key="tagIndex" >
                                <li ><a href="#" @click.prevent="getBlogPost(tag.id)" :class="{ 'selectedSizeColor' : tagId === tag.id }" >
                                    {{ tag.name }}</a>
                                </li> 
                            </ul>
                        </div>

                        <div class="blog-widget">
                            <h3 class="blog-widget-title">follow us</h3>
                            <ul class="blog-widget-social">
                                <li><a href="#" class="icofont-facebook"></a></li>
                                <li><a href="#" class="icofont-twitter"></a></li>
                                <li><a href="#" class="icofont-linkedin"></a></li>
                                <li><a href="#" class="icofont-pinterest"></a></li>
                                <li><a href="#" class="icofont-instagram"></a></li>
                            </ul>
                        </div>
                        <div class="blog-widget">
                            <a href="#"><img class="img-fluid" :src="tag?.image" alt="tag?.image"></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--=====================================
                  BLOG STANDARD PART END
        =======================================-->

  </div>
</template>


<style scoped>

</style>