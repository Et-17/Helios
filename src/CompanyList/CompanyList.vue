<script setup lang="ts">
import { companies, shown_columns, frontend_column_names } from '../companyManagement';
</script>

<template>
  <table class="company-list">
    <thead>
      <tr>
        <th v-for="column in shown_columns">{{ frontend_column_names[column] }}</th>
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
