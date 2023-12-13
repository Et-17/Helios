<script setup lang="ts">
import { frontend_column_names, columnkeys, type Company, shown_columns } from '@/companyManagement';
</script>

<template>
  <div id="column-inner">
    <template v-for="column in columnkeys">
      <input type="checkbox" :id="`filter-menu-line-${column}`" :value="column" v-model="shown_columns">
      <label :for="`filter-menu-line-${column}`">
        {{ frontend_column_names[column as keyof Company] }}
      </label>
      <br>
    </template>
  </div>
</template>

<style scoped>
#column-inner {
  padding: var(--inner-gutter);
}
</style>
