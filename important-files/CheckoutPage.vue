<script setup>
import CheckoutModal from '../../components/modal/CheckoutModal.vue';
import { ref } from 'vue';
import { useRouter } from "vue-router";
// validation error
import { Form, Field } from "vee-validate";

// Array to hold the contacts
const contacts = ref([]);

// কন্টাক্ট আপডেট করার জন্য ফাংশন
const updateContact = (updatedContact) => {
  const index = contacts.value.findIndex(contact => contact.name === updatedContact.name);
  if (index !== -1) {
    contacts.value[index] = updatedContact; // কন্টাক্ট আপডেট করা
  } else {
    contacts.value.push(updatedContact); // নতুন কন্টাক্ট অ্যাড করা
  }
};


// মডাল বন্ধ করার জন্য ইভেন্ট
const closeModal = () => {
  // কোনো অতিরিক্ত লজিক যদি থাকে
};

// কন্টাক্ট এডিট করার জন্য ফাংশন
const editContact = (contact) => {
  // মডাল খুললে কন্টাক্ট ডেটা প্রেরণ
  currentContact.value = { ...contact };
  modalVisible.value = true;
};

const deleteContact = (contact) => {
  const index = contacts.value.findIndex(c => c.name === contact.name);
  if (index !== -1) {
    contacts.value.splice(index, 1); // কন্টাক্ট রিমুভ করুন
  }
};



const currentContact = ref({});
const modalVisible = ref(false);


const isLoading = ref(false);
const placeOrder = async() => {
      isLoading.value = true;
      try {
        await orderSubmited();
        // Handle successful order submission
      } catch (error) {
        // Handle error
        console.error("Order submission failed:", error);
      } finally {
        isLoading.value = false; // Hide the preloader
      }

    };

 

    const handleOrderSubmitted = () => {
      orderSubmited(); 
    }





</script>

<template>
  <div class="testing">
             <!-- pre loader -->
        <div v-if="isLoading" class="preloader">
          <div class="loader"></div>
        </div>
            <!-- pre loader -->
      
            <!--=====================================
                    BANNER PART START
        =======================================-->
        <section class="inner-section single-banner" style="background: url(images/single-banner.jpg) no-repeat center;">
            <div class="container">
                <h2>checkout</h2>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li class="breadcrumb-item"><a href="shop-4column.html">shop grid</a></li>
                    <li class="breadcrumb-item active" aria-current="page">checkout</li>
                </ol>
            </div>
        </section>
        <!--=====================================
                    BANNER PART END
        =======================================-->


        <!--=====================================
                    CHECKOUT PART START
        =======================================-->
        <section class="inner-section checkout-part">
            <div class="container">
               
               <!-- checkoutfirstpart  -->
               
               <!-- checkoutfirstpart  -->

               
                  <div class="col-12">
                   <Form
                   @submit.prevent="placeOrder"
                   :validation-schema="schema"
                   v-slot="{ errors, isSubmitting }"
                   >
                    <div class="row">
                      <div class="col-md-6 col-lg-4">
                      <div class="account-card">
                        <div class="account-title">
                          <h4>Customer Contact</h4>
                          <button data-bs-toggle="modal" data-bs-target="#contact-add">Add Contact</button>
                        </div>
                      
                        <div class="account-content">
                          <div class="alert fade show">
                            <div class="profile-card">
                              <div class="contact-option">
                                <div v-for="(contact, index) in contacts" :key="index">
                                  <div>
                                    <h6>Name: <span>{{ contact.name }}</span></h6>
                                  </div>
                                  <div>
                                    <h6>Phone: <span>{{ contact.phone }}</span></h6>
                                  </div>
                                  <div>
                                    <h6>{{ contact.location }}  <span></span></h6>
                                  </div>
                                  <ul>
                                    <li>
                                      <button @click="editContact(contact)" class="edit icofont-edit" title="Edit This" data-bs-toggle="modal" data-bs-target="#contact-edit"></button>
                                    </li>
                                    <li>
                                      <button
                                        @click="deleteContact(contact)"
                                        class="trash icofont-ui-delete"
                                        title="Remove This"
                                      ></button>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 col-lg-4">
                        <div class="account-card">
                            <div class="account-title">
                                <h4>delivery address</h4>
                                <button data-bs-toggle="modal" data-bs-target="#address-add">add address</button>
                            </div>
                            <div class="account-content">
                                    <div class=" alert fade show">
                                        <div class="profile-card address active">
                                            <div class="address-option">
                                                <div>
                                                  <h6>Home : </h6>
                                                  <span>jalkuri, fatullah, narayanganj-1420. word no-09, road no-17/A</span>
                                                </div>
                                              <ul class="user-action">
                                                  <li><button class="edit icofont-edit" title="Edit This" data-bs-toggle="modal" data-bs-target="#address-edit"></button></li>
                                                  <li><button class="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert"></button></li>
                                              </ul>
                                            </div>
                                        </div>
                                    </div>
                              </div>
                          </div>
                      </div>

                      <div class="col-md-6 col-lg-4">
                        <div class="account-card mb-0">
                            <div class="account-title">
                                <h4>payment option</h4>
                                <button data-bs-toggle="modal" data-bs-target="#payment-add">add card</button>
                            </div>
                            <div class="account-content">
                                    <div class=" alert fade show">
                                        <div class="payment-card payment active">
                                            <img src="@/assets/images/payment/png/01.png" alt="payment">
                                            <h4>card number</h4>
                                            <p>
                                                <span>****</span>
                                                <span>****</span>
                                                <span>****</span>
                                                <sup>1876</sup>
                                            </p>
                                            <h5>miron mahmud</h5>
                                            <button class="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert"></button>
                                        </div>
                                    </div>
                              </div>
                          </div>
                        </div>
                    </div>
                    <div v-if="isLoading" class="preloader"></div>
                    <button type="submit"  class="text-center orderBTN mt-3 w-100" @click="placeOrder()">
                      <span v-if="isLoading" class="spinner-border spinner-border-sm mr-1"></span>
                      <span v-else>Place Order</span>
                    </button>
                    <!-- <span class="text-danger" v-if="blockSmsErrorMessage">{{ blockSmsErrorMessage }}</span> -->
                   </Form>
                  </div>
                
                
                <div>
                  <div class="checkout-check">
                                <input type="checkbox" id="checkout-check">
                                <label for="checkout-check">By making this purchase you agree to our <a href="#">Terms and Conditions</a>.</label>
                            </div>
                            <div class="checkout-proced">
                                <router-link :to="{name: 'user.invoice'}" class="btn btn-inline">proced to checkout</router-link>
                            </div>
                </div>
            </div>
        </section>
        <!--=====================================
                    CHECKOUT PART END
        =======================================-->


        <!--=====================================
                    MODAL ADD FORM START
        =======================================-->
                    <CheckoutModal  
                    :visible="true" 
                    :editMode="true" 
                    :initialContact="contacts[0]" 
                    @update-contact="updateContact"
                    @close="closeModal" 
                    />
        <!--=====================================
                    MODAL EDIT FORM END
        =======================================-->
  </div>
</template>


<style scoped>

.checkout-page-action{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}

</style>