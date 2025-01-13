<script setup>
import { ref, defineEmits } from 'vue';
import { storeToRefs } from 'pinia';
import {useModal, useAuth, useNotification} from '@/stores'
import { useRouter, useRoute } from "vue-router";
const {backendErrors, user, isOrder} = storeToRefs(useAuth())

const modal       = useModal();
const { isLogin } = storeToRefs(modal);
const router      = useRouter();
const route       = useRoute();
const auth        = useAuth();
const notify      = useNotification();
const emit        = defineEmits(['orderSubmitted']);
const name        = ref('');
const phoneNumber = ref('');

const modalOC = () => {
    isLogin.value = !isLogin.value;
}

const loginOrRegisterUser = async() => {
  const res = await auth.login({phone_number: phoneNumber.value, name: name.value});
	if (res?.status == 200) {
      modal.toggleLoginModal() 
      modal.toggleModal() 
      name.value = ''
      phoneNumber.value = ''
    }
}


</script>


<template>
    <div>
      <div class="main-modal" :style="{ display: isLogin ? 'flex' : 'none' }">
          <div class="opacity-blockshadow" @click="modalOC"></div>
          <div class="main-body">
          <i class="fas fa-times close-btn" @click="modalOC"></i>
              <div class="d-flex flex-column">
                <router-link :to="{name: 'HomePage'}" class="logo mb-2 m-auto" @click="modal.toggleLoginModal()">
                    <img src="@/assets/images/logo-black.png" class="w-100" width="111" height="44" alt="POSNPACK">
                </router-link>
                <div class="">
                    <label for="exampleFormControlInput1" class="form-label fw-bold my-2">Name <span class="text-danger">*</span></label>
                    <input type="email" class="form-control" id="Enter Your Name" placeholder="Enter Your Name" v-model="name"
                </div>
                <div class="">
                    <label for="exampleFormControlInput1" class="form-label fw-bold my-2">Phone Number <span class="text-danger">*</span></label>
                    <input type="email" class="form-control" id="Enter Your Phone Number" placeholder="Enter Your Phone Number" v-model="phoneNumber"
                </div>
                <button class="btn btn-sm btn-primary" @click.prevent="loginOrRegisterUser">LOGIN</button> 
              </div>
             </div>
          </div>
    </div>
</template>


<style>

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

  .main-modal{
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
}


.opacity-blockshadow{
    background-color: #00000080;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    
  }

  .close-btn{
    background-color: white;
    color: black;
    padding: 5px;
    border-radius: 5px;
    position: absolute;
    right: -20px;
    top: -20px;
  }

  .main-body{
    position: relative;
    background-color: rgb(255, 255, 255);
    width: 400px;
    padding: 15px 20px;
    border-radius: 5px ;
  }


@media (max-width: 425px) {
    .main-body {
        width: 330px;
    }
}



</style>