

<script setup>
import { ref } from "vue";
import { Modal } from "@/components";
import axiosInstance from "@/services/axiosService.js";
import { useAuth, useModal } from "@/stores";
import { useRoute } from 'vue-router';

const loginOpened = ref(false);
const modal =  useModal()
const auth = useAuth();
const name = ref('');
const phoneNumber = ref('');

const loginOrRegisterUser = async() => {
	const res = await auth.login({phone_number: phoneNumber.value, name: name.value});
	if (res?.status == 200) {
      modal.toggleModal()
    }
}


const loginOpen = () => {
    loginOpened.value =! loginOpened.value
}

</script>

<template>
<Modal @orderSubmitted="handleOrderSubmitted"/>

    <div class="login-form-container">
        <h4>
            Returning customer?
            <button data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" class="btn btn-link btn-toggle" @click.prevent="loginOpen()">Login</button>
        </h4>
        <transition name="slide-fade">
        <div v-if="loginOpened" id="collapseOne" class="collapse show">
            <div class="login-section feature-box">
            <div class="feature-box-content">
                <form action="#" id="login-form">
                <p>If you have shopped with us before, please enter your details below. If you are a new customer, please proceed to the Billing & Shipping section.</p>
                <div class="row">
                    <div class="col-md-6">
                    <div class="form-group">
                        <label class="mb-0 pb-1">Name<span class="required">*</span></label>
                        <input type="text" class="form-control" required v-model="name"/>
                    </div>
                    </div>
                    <div class="col-md-6">
                    <div class="form-group">
                        <label class="mb-0 pb-1">Phone Number <span class="required">*</span></label>
                        <input type="text" class="form-control" required v-model="phoneNumber"/>
                    </div>
                    </div>
                </div>
                <button type="submit" class="btn" @click.prevent="loginOrRegisterUser">LOGIN</button>
                </form>
            </div>
            </div>
        </div>
        </transition>
  </div>
</template>


<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.5s ease-in-out; /* Adjust the duration and timing function */
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>