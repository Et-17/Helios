<script setup lang="ts">
import { use_human_readable_column_names, use_human_readable_data } from './settingsManagement';
</script>

<template>
  <div id="setting-container">
    <h1 id="settings-label">
      Settings
    </h1><br>
    <input type="checkbox" name="column-names" v-model="use_human_readable_column_names">
    <label class="option-label" for="column-names">Use human readable column names</label>
    <br>
    <input type="checkbox" name="data-formatting" v-model="use_human_readable_data">
    <label class="option-label" for="data-formatting">Use human readable data</label>
    <br>
  </div>
</template>

<style lang="scss">
#settings-container {
  width: 45vw;
}

#settings-label {
  font-family: 'Young Serif', serif;
  font-style: bold;
  font-size: 1.5rem;
}

.option-label {
  font-family: 'Montserrat', sans-serif;
}
</style>
