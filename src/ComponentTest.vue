<script setup lang="ts">
import { ref } from 'vue';

const name = ref("");
const genre = ref("");
const description = ref("");
const address = ref("");
const phone = ref("");
const revenue = ref(0);
const ticker = ref("");
const established = ref(0);
</script>

<template>
  <div id="add-container">
    <h1>Add</h1>
    <form>
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
    </form>
  </div>
</template>

<style lang="scss">
</style>
