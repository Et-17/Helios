<script setup lang="ts">
import { invoke } from '@tauri-apps/api/tauri';
import { ref, onMounted, type Ref } from 'vue';
import { companies, type Company } from './companyManagement';

// The names I am using in the database aren't exactly client-ready names so
// this will translate them
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
  "revenue",
  "established"
])
</script>

<template>
  <table class="company-list">
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

<style lang="scss">
.company-list {
  width: 100%;
}

.company-list tr {
  width: 100%;
  margin: var(--outer-gutter);

  th {
    font-family: 'Young Serif', serif;
    font-style: bold;
    font-size: 1.1rem;
    line-height: 2;
  }

  td {
    font-family: 'Montserrat', sans-serif;
    line-height: 2;
  }

  th,
  td {
    text-align: left;
  }
}

.company-list tbody tr:hover * {
  background-color: var(--palette-highlight);
  cursor: pointer;
}
</style>
