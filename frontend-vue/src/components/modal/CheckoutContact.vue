<script setup>
import { ref, watch } from 'vue';
import { defineEmits } from 'vue';


// Props ডিফাইন
const props = defineProps({
  visible: Boolean, // মডাল ভিজিবিলিটি
  editMode: Boolean, // অ্যাড/এডিট মোড
  initialContact: {
    type: Object,
    default: () => ({ name: '', phone: '', location: '' }),
  },
});


// ইভেন্ট ইমিট
const emit = defineEmits(['add-contact', 'update-contact', 'close']);

// লোকাল কন্টাক্ট ডেটা
const contact = ref({ name: '', phone: '', location: '' });

// Props থেকে ডেটা লোড
watch(
  () => props.initialContact,
  (newContact) => {
    if (newContact) {
      contact.value = { ...newContact }; // কন্টাক্ট ডেটা লোড করা
    } else {
      contact.value = { name: '', phone: '', location: '' }; // ফর্ম খালি করা
    }
  },
  { immediate: true }
);


// ফর্ম সাবমিট হ্যান্ডলার
function handleSubmit() {
  if (props.editMode) {
    emit('update-contact', { ...contact.value }); // আপডেট ইভেন্ট
  } else {
    emit('add-contact', { ...contact.value }); // অ্যাড ইভেন্ট
  }
  emit('close'); // মডাল বন্ধ
}



</script>

<template>
  <div>
     <!--=====================================
                    MODAL ADD FORM START
        =======================================-->
        <!-- contact add form -->
        <div class="modal fade"  id="contact-add" tabindex="-1" data-bs-keyboard="false" aria-labelledby="contact-add-label" >
    <div class="modal-dialog modal-dialog-centered"> 

      <div class="modal-content">
        <button class="modal-close" data-bs-dismiss="modal"><i class="icofont-close"></i></button>
        <form class="modal-form" @submit.prevent="handleSubmit">
          <div class="form-title">
            <h3>Add New Contact</h3>
          </div>
          <div class="form-group">
            <label class="form-label">Name</label>
            <input class="form-control" type="text" v-model="contact.name" placeholder="Enter your Name" />
          </div>
          <div class="form-group">
            <label class="form-label">Contact Number</label>
            <input class="form-control" type="text" v-model="contact.phone" placeholder="Enter your number" />
          </div>
          <div class="form-group">
            <label class="form-label">Location</label>
            <select class="form-select" v-model="contact.location">
              <option value="" disabled>Select Location</option>
              <option value="Inside Dhaka">Inside Dhaka</option>
              <option value="Outside Dhaka">Outside Dhaka</option>
            </select>
          </div>
          <button class="form-btn" type="submit">Save Contact Info</button>
        </form>
      </div>
    </div>
  </div>

        <!-- payment add form -->
        <div class="modal fade" id="payment-add">
            <div class="modal-dialog modal-dialog-centered"> 
                <div class="modal-content">
                    <button class="modal-close" data-bs-dismiss="modal"><i class="icofont-close"></i></button>
                    <form class="modal-form">
                        <div class="form-title">
                            <h3>add new payment</h3>
                        </div>
                        <div class="form-group">
                            <label class="form-label">card number</label>
                            <input class="form-control" type="text" placeholder="Enter your card number">
                        </div>
                        <button class="form-btn" type="submit">save card info</button>
                    </form>
                </div> 
            </div> 
        </div>
        <!--=====================================
                    MODAL ADD FORM END
        =======================================-->

        
        <!--=====================================
                    MODAL EDIT FORM START
        =======================================-->
        <!-- contact edit form -->
        <div class="modal fade" id="contact-edit" >
            <div class="modal-dialog modal-dialog-centered"> 
                <div class="modal-content" v-if="visible">
                    <button class="modal-close" data-bs-dismiss="modal"><i class="icofont-close"></i></button>
                    <form class="modal-form" @submit.prevent="handleSubmit">
                        <div class="form-title">
                            <h3>{{ editMode ? 'Edit Contact' : 'Add Contact' }}</h3>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Name</label>
                            <input  v-model="contact.name" class="form-control" type="text" placeholder="Enter your Name" value="">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Contact Number</label>
                            <input v-model="contact.phone" class="form-control" type="text" placeholder="Enter your number" value="">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Location</label>
                            <select v-model="contact.location" class="form-select" >
                                <option selected>Select Location</option>
                                <option value="inside dhaka">Inside Dhaka</option>
                                <option value="outside dhaka">Outside Dhaka</option>
                            </select>
                        </div>
                        <button class="form-btn" type="submit">{{ editMode ? 'Update' : 'Add' }}</button>
                    </form>
                </div> 
            </div> 
        </div>

        <!-- address edit form -->
        <div class="modal fade" id="address-edit">
            <div class="modal-dialog modal-dialog-centered"> 
                <div class="modal-content">
                    <button class="modal-close" data-bs-dismiss="modal"><i class="icofont-close"></i></button>
                    <form class="modal-form">
                        <div class="form-title">
                            <h3>edit address info</h3>
                        </div>
                        <div class="form-group">
                            <label class="form-label">title</label>
                            <select class="form-select">
                                <option value="home" selected>home</option>
                                <option value="office">office</option>
                                <option value="Bussiness">Bussiness</option>
                                <option value="academy">academy</option>
                                <option value="others">others</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">address</label>
                            <textarea class="form-control" placeholder="jalkuri, fatullah, narayanganj-1420. word no-09, road no-17/A"></textarea>
                        </div>
                        <button class="form-btn" type="submit">save address info</button>
                    </form>
                </div> 
            </div> 
        </div>
        <!--=====================================
                    MODAL EDIT FORM END
        =======================================-->
  </div>
</template>


<style scoped>

</style>