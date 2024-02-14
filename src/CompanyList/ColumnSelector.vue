<script setup lang="ts">
import { frontend_column_names, columnkeys, type Company, shown_columns } from '@/companyManagement';
import { use_human_readable_column_names } from '@/Settings/settingsManagement';
</script>

<template>
  <div>
    <div id="column-select-inner">
      <template v-for="column in columnkeys">
        <input type="checkbox" :id="`filter-menu-line-${column}`" :value="column" v-model="shown_columns">
        <label :for="`filter-menu-line-${column}`" class="column-selector-label">
          {{ use_human_readable_column_names ? frontend_column_names[column as keyof Company] : column }}
        </label>
        <br>
      </template>
    </div>
  </div>
</template>

<style scoped>
div {
  box-sizing: border-box;
}

#column-select-inner {
  margin: var(--inner-gutter);
  white-space: nowrap;
}

.column-selector-label {
  line-height: 150%;
  font-family: 'Montserrat', sans-serif;
}
</style>
