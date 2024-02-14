<script setup lang="ts">
import { use_human_readable_column_names, use_human_readable_data, high_contrast_mode } from './settingsManagement';
import { vHelpText } from '../Help/help';
</script>

<template>
  <div id="setting-container">
    <h1 id="settings-label">
      Settings
    </h1><br>
    <input type="checkbox" name="column-names" v-model="use_human_readable_column_names">
    <label class="option-label"
      v-help-text="{ id: 'human-readable-columns', text: 'This controls whether it uses the more human readable column names or the raw names from database.' }"
      for="column-names">Use human readable column names</label>
    <br>
    <input type="checkbox" name="data-formatting" v-model="use_human_readable_data">
    <label class="option-label"
      v-help-text="{ id: 'human-readable-data', text: 'This controls whether formatting is applied to the data displayed on the company list.' }"
      for="data-formatting">Use human readable data</label>
    <br>
    <input type="checkbox" name="high-contrast-mode" v-model="high_contrast_mode">
    <label class="option-label" for="high-contrast-mode" v-help-text="{id:'high-contrast-mode', text: 'This will enable a high contrast mode, which makes adjacent colors stand out more, to make Helios easier to use for some people.'}">High contrast mode</label>
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
