<script setup lang="ts">
import { invoke } from '@tauri-apps/api/tauri';
import { ref, onMounted, type Ref } from 'vue';
import { companies, type Company } from './companyManagement';

const column_names: Record<keyof Company, string> = {
  "name": "Company Name",
  "genre": "Industry",
  "description": "Description",
  "address": "Address",
  "phone": "Phone",
  "revenue": "Revenue",
  "ticker": "Ticker",
  "established": "Est."
}

const shown_columns: Ref<(keyof Company)[]> = ref([
  "name",
  "genre",
  "established"
])
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="column in shown_columns">{{ column_names[column] }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="company in companies">
        <td v-for="column in shown_columns">{{ company[column] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped="true">
div {
  position: absolute;
  top: var(--outer-gutter);
  right: var(--outer-gutter);
  bottom: var(--outer-gutter);
  left: calc(var(--icon-box-size) + var(--inner-gutter) * 2 + var(--outer-gutter) * 2);
  overflow: hidden;
}

table {
  width: 100%;
}

tr {
  width: 100%;
  background-color: var(--palette-card);
  margin: var(--outer-gutter);
}
</style>
