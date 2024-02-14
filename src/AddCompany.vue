<script setup lang="ts">
import { ref } from 'vue';
import { add_company, update_companies } from './companyManagement';
import { message } from '@tauri-apps/api/dialog';

const name = ref("");
const genre = ref("");
const description = ref("");
const address = ref("");
const phone = ref("");
const revenue = ref(0);
const ticker = ref("");
const established = ref(0);

async function submit() {
  await add_company({
    name: name.value,
    genre: genre.value,
    description: description.value,
    address: address.value,
    phone: phone.value,
    revenue: revenue.value,
    ticker: ticker.value.length == 0 ? "N/A" : ticker.value,
    established: established.value
  });

  await message(`Successfully submitted company ${name.value} to the database`, { title: 'Added Company', type: 'info' });

  await update_companies();
}
</script>

<template>
  <div id="add-container">
    <h1 id="add-company-header">Add Company</h1><br>
    <form @submit.prevent="submit" id="add-form">
      <label>Name</label><br />
      <input type="text" v-model="name" name="name" placeholder="Example, LLC."><br /><br />

      <label>Industry</label><br />
      <input type="text" v-model="genre" name="genre" placeholder="manufacturing"><br /><br />

      <label>Description</label><br />
      <textarea v-model="description" name="description" placeholder="This is an example company"></textarea><br /><br />

      <label>Address</label><br />
      <textarea v-model="address" name="address" placeholder="1234 Example St. N&NewLine;St. Petersburg, Florida 33711"></textarea><br /><br />

      <label>Phone</label><br />
      <input type="text" v-model="phone" name="phone" placeholder="(123) 456-789"><br><br>

      <label>Revenue</label><br>
      <input type="number" v-model="revenue" name="revenue" placeholder="45000000"><br><br>

      <label>Ticker (leave blank if none)</label><br>
      <input type="text" v-model="ticker" name="ticker" placeholder="EXA"><br><br>

      <label>Established</label><br>
      <input type="number" v-model="established" name="established" placeholder="1976"><br><br>

      <button type="submit">Add Company</button>
    </form>
  </div>
</template>

<style lang="scss">
#add-form {
  font-family: 'Montserrat', sans-serif;
  width: 45vw;

  input, textarea {
    width: 100%;
  }
}

#add-company-header {
  font-family: 'Young Serif', serif;
  font-style: bold;
  font-size: 1.5rem;
}
</style>
