<script setup>
import { onMounted } from 'vue';
import { useSettingStore } from '@/stores';

const footer = useSettingStore();


onMounted(()=> {
  footer?.getData();
})

</script>

<template>
  <div>
    
    <footer class="footer-part" >
      <div class="container">
        <div class="row">
          <div class="col-sm-6 col-xl-3">
            <div class="footer-widget">
            <div>
              <a class="footer-logo">
                <img :src="footer.findSetting('footer_logo')" alt="">
                <!-- {{ footer?.settings?.data?.find((img)=> img.key == "footer_logo")?.value }} -->
              </a>
            </div>
              
              <p class="footer-desc">
               {{ footer.findSetting("footer_address") }}
               
              </p>

              <ul class="footer-social">
                <li><a class="icofont-facebook" :href="footer?.settings"></a></li>
                <li><a class="icofont-twitter" href="#"></a></li>
                <li><a class="icofont-linkedin" href="#"></a></li>
                <li><a class="icofont-instagram" href="#"></a></li>
                <li><a class="icofont-pinterest" href="#"></a></li>
              </ul>
            </div>
          </div>

          <div class="col-sm-6 col-xl-3">
            <div class="footer-widget contact">
              <h3 class="footer-title">contact us</h3>
              <ul class="footer-contact">
                <li>
                  <i class="icofont-ui-email"></i>
                  <p>
                    <span>{{footer?.settings?.data?.find((email)=> email.key == "footer_email")?.value}}</span>
                  </p>
                </li>

                <li>
                  <i class="icofont-ui-touch-phone"></i>
                  <p><span>{{footer?.settings?.data?.find((phone)=> phone.key == "phone_number")?.value}}</span><span>{{footer?.settings?.data?.find((whatsapp)=> whatsapp.key == "whatsapp_number")?.value}}</span></p>
                </li>

                <li>
                  <i class="icofont-location-pin"></i>
                  <p> {{ footer?.settings?.data?.find(( local) => local.key == "footer_address")?.value }}</p>
                </li>

              </ul>
            </div>
          </div>

          <div class="col-sm-6 col-xl-3">
            <div class="footer-widget">
              <h3 class="footer-title">quick Links</h3>
              <div class="footer-links">
                <ul>
                  <li><a href="#">My Account</a></li>
                  <li><a href="#">Order History</a></li>
                  <li><a href="#">Order Tracking</a></li>
                  <li><a href="#">Best Seller</a></li>
                  <li><a href="#">New Arrivals</a></li>
                </ul>
                <ul>
                  <li><a href="#">Location</a></li>
                  <li><a href="#">Affiliates</a></li>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">Carrer</a></li>
                  <li><a href="#">Faq</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="col-sm-6 col-xl-3">
            <div class="footer-widget">
              <h3 class="footer-title">Download App</h3>

              <p class="footer-desc">
                Lorem ipsum dolor sit amet tenetur dignissimos ipsum eligendi
                autem obcaecati minus ducimus totam reprehenderit
                exercitationem!
              </p>

              <div class="footer-app">
                <a href="#"
                  ><img
                    src="@/assets/images/google-store.png"
                    alt="google" /></a
                ><a href="#"
                  ><img src="@/assets/images/app-store.png" alt="app"
                /></a>
              </div>
              
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="footer-bottom">
              <p class="footer-copytext">
                &copy; {{ footer?.settings?.data?.find((i)=> i.key == "footer_description").value }}
                <a target="_blank" href="https://w3coders.net"></a>
              </p>
              <div class="footer-card">
                <a href="#"
                  ><img
                    src="@/assets/images/payment/jpg/01.jpg"
                    alt="payment" /></a
                ><a href="#"
                  ><img
                    src="@/assets/images/payment/jpg/02.jpg"
                    alt="payment" /></a
                ><a href="#"
                  ><img
                    src="@/assets/images/payment/jpg/03.jpg"
                    alt="payment" /></a>
                    <a href="#">
                      <img src="@/assets/images/payment/jpg/04.jpg" alt="payment"/>
                    </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>


<style scoped>

</style>