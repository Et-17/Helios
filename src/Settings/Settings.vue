<script setup lang="ts">
import { use_human_readable_column_names, use_human_readable_data } from './settingsManagement';
import { vHelpText } from '../Help/help';
</script>

<template>
  <div id="setting-container">
    <h1 id="settings-label">
      Settings
    </h1><br>
    <input type="checkbox" name="column-names" v-model="use_human_readable_column_names">
    <label class="option-label"
      v-help-text="{ id: 'human-readable-columns', text: 'This control whether or not it uses the more human readable colun names or the actual names in the database.' }"
      for="column-names">Use human readable column names</label>
    <br>
    <input type="checkbox" name="data-formatting" v-model="use_human_readable_data">
    <label class="option-label"
      v-help-text="{ id: 'human-readable-data', text: 'This controls whether or not formatting is applied to the data displayed on the company list.' }"
      for="data-formatting">Use human readable data</label>
    <br>
    <input type="checkbox" name="high-contrast-mode">
    <label class="option-label" for="high-contrast-mode">High contrast mode</label>
    <br>
  </div>
</template>

<style lang="scss">
#settings-container {
  width: 45vw;
  line-height: 150%;
}

#settings-label {
  font-family: 'Young Serif', serif;
  font-style: bold;
  font-size: 1.5rem;
}

.option-label {
  font-family: 'Montserrat', sans-serif;
  line-height: 250%;
}
</style>
