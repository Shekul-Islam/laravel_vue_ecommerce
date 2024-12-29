<template>
  <div class="thank-you-page">
    <div class="container-fluid p-0">
      <!-- Main Content Section -->
      <div class="thank-you-container d-flex justify-content-center align-items-center min-vh-100">
        <div class="thank-you-card p-5 text-center shadow-lg">
          <h1 class="display-3 text-secondary">THANK YOU</h1>
          <p class="lead mb-4">Thanks for choosing us, enjoy your products!</p>
          <p class="mb-5">We hope to see you soon here :)</p>
          
          <div class="button-group">
            <button class="btn btn-secondary">MY ORDERS</button>
            <button class="btn btn-primary">HOME</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Any additional logic goes here
</script>

<style scoped>
.thank-you-page {
  background-color: #f8f9fa; /* Light background color */
}

.thank-you-container {
  background-color: #ffffff;
  height: 100%;
}

.thank-you-card {
  background-color: #ffffff;
  border-radius: 12px;
  width: 70%; /* Increased width */
  height: 500px; /* Increased height */
  max-width: 800px; /* Larger card width */
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

h1 {
  font-weight: bold;
}

button {
  border-radius: 8px;
  font-size: 1rem; /* Smaller button font */
  padding: 10px 20px; /* Adjust button padding */
}

.btn-secondary {
  background-color: #6c757d; /* Secondary color */
  border: none;
}

.btn-primary {
  background-color: #007bff; /* Primary color */
  border: none;
}

.button-group button {
  width: 40%; /* Smaller buttons */
  margin: 10px;
}

@media (max-width: 768px) {
  .thank-you-card {
    width: 80%; /* More responsive on medium screens */
    height: 400px; /* Adjust card height */
  }
  
  .button-group button {
    width: 45%;
    margin: 5px;
  }
}

@media (max-width: 576px) {
  .thank-you-card {
    width: 90%; /* Smaller width on mobile */
    height: 350px; /* Reduce height for mobile */
    padding: 3rem;
  }

  h1 {
    font-size: 2.5rem; /* Adjust font size on smaller screens */
  }

  .button-group button {
    width: 100%; /* Full width buttons on small screens */
    margin: 5px 0;
  }
}
</style>
