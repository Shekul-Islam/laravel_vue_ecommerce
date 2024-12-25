<script setup>
import { ref, watch } from 'vue';
import { defineEmits } from 'vue';


// Props ডিফাইন
const props = defineProps({
  visible: Boolean, // মডাল ভিজিবিলিটি
  editMode: Boolean, // অ্যাড/এডিট মোড
  initialAddress: {
    type: Object,
    default: () => ({ location: '', address: '' }),
  },
});


// ইভেন্ট ইমিট
const emit = defineEmits(['add-address', 'update-address', 'close']);

// লোকাল কন্টাক্ট ডেটা
const addressData = ref({ location: '', address: '' });

// Props থেকে ডেটা লোড
watch(
  () => props.initialAddress,
  (newAddress) => {
    if (newAddress) {
      addressData.value = { ...newAddress }; // কন্টাক্ট ডেটা লোড করা
    } else {
      addressData.value = { location: '', address: '' }; // ফর্ম খালি করা
    }
  },
  { immediate: true }
);


// ফর্ম সাবমিট হ্যান্ডলার
function handleFormSubmit() {
  if (props.editMode) {
    emit('update-address', { ...addressData.value }); // আপডেট ইভেন্ট
  } else {
    emit('add-address', { ...addressData.value }); // অ্যাড ইভেন্ট
  }
  emit('close'); // মডাল বন্ধ
}



</script>

<template>
  <div>
     <!--=====================================
                    MODAL ADD FORM START
        =======================================-->
        <!-- address add form -->
        <div class="modal fade" id="address-add" tabindex="-1" data-bs-keyboard="false" aria-labelledby="contact-add-label" >
            <div class="modal-dialog modal-dialog-centered"> 
                <div class="modal-content">
                    <button class="modal-close" data-bs-dismiss="modal"><i class="icofont-close"></i></button>
                    <form class="modal-form" @submit.prevent="handleFormSubmit">
                        <div class="form-title">
                            <h3>add new address</h3>
                        </div>
                        <div class="form-group">
                          <label class="form-label">Location</label>
                          <select class="form-select" v-model="addressData.location">
                            <option value="" disabled>Select Location</option>
                            <option value="Inside Dhaka">Inside Dhaka</option>
                            <option value="Outside Dhaka">Outside Dhaka</option>
                          </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">address</label>
                            <textarea v-model="addressData.address" class="form-control" placeholder="Enter your address"></textarea>
                        </div>
                        <button class="form-btn" type="submit">save address info</button>
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
        <!-- address edit form -->
        <div class="modal fade" id="address-edit">
            <div class="modal-dialog modal-dialog-centered"> 
                <div class="modal-content" v-if="visible">
                    <button class="modal-close" data-bs-dismiss="modal"><i class="icofont-close"></i></button>
                    <form class="modal-form" @submit.prevent="handleFormSubmit">
                        <div class="form-title">
                            <h3>{{ editMode ? 'Edit Address' : 'Add Address' }}</h3>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Location</label>
                            <select v-model="addressData.location" class="form-select" >
                                <option selected>Select Location</option>
                                <option value="inside dhaka">Inside Dhaka</option>
                                <option value="outside dhaka">Outside Dhaka</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">address</label>
                            <textarea v-model="addressData.address" class="form-control" placeholder="jalkuri, fatullah, narayanganj-1420. word no-09, road no-17/A"></textarea>
                        </div>
                        <button class="form-btn" type="submit">{{ editMode ? 'Update' : 'Add' }}</button>
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