import { createApp } from 'vue'
import { createPinia } from 'pinia';
import './style.css'
import './template.js'

import router from './router';
import App from './App.vue';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(ElementPlus);


app.config.globalProperties.$filters = {
  currencySymbol(value) {
    // return "৳" + value.toLocaleString();
    return Math.round(value) ? "৳ " + value.toLocaleString() : "৳";
  },
  makeImagePath(img) {
    return import.meta.env.VITE_API_URL + "/" + img;
},
  textShort(text, size) {
  if (!text) return "";
  text = text.toString();

  if (text.length <= size) {
    return text;
  }
  return text.substr(0, size) + "...";
},

productPrice(product){
  if (product?.offer_price == 0) {
    return `<span>${this.currencySymbol(Math.round(product?.mrp))}</span>`;
  }else {
    return `<del>${this.currencySymbol(Math.round(product?.mrp))}</del> <span>${this.currencySymbol(Math.round(product?.offer_price))}</span>`;
  }
},
}


app.mount('#app');
 