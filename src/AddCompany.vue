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
    <h1 id="add-company-header">Add Company</h1>
    <form @submit.prevent="submit" id="add-form">
      <label>Name</label><br />
      <input type="text" v-model="name" name="name"><br /><br />

      <label>Industry</label><br />
      <input type="text" v-model="genre" name="genre"><br /><br />

      <label>Description</label><br />
      <textarea v-model="description" name="description"></textarea><br /><br />

      <label>Address (please split lines)</label><br />
      <textarea v-model="address" name="address"></textarea><br /><br />

      <label>Phone</label><br />
      <input type="text" v-model="phone" name="phone"><br><br>

      <label>Revenue</label><br>
      <input type="number" v-model="revenue" name="revenue"><br><br>

      <label>Ticker (leave blank if none)</label><br>
      <input type="text" v-model="ticker" name="ticker"><br><br>

      <label>Established</label><br>
      <input type="number" v-model="established" name="established"><br><br>

      <button type="submit">Add Company</button>
    </form>
  </div>
</template>

<style lang="scss">
#add-form {
  font-family: 'Montserrat', sans-serif;
}

#add-company-header {
  font-family: 'Young Serif', serif;
  font-style: bold;
  font-size: 1.5rem;
}
</style>
