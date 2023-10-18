<script setup lang="ts">
import { invoke } from '@tauri-apps/api/tauri'
import { ref, onMounted } from 'vue';

const companies = ref({});

onMounted(() => invoke('get_companies').then((c: any) => companies.value = c));
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Company</th>
          <th>Genre</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Jabil</th>
          <th>Manufacturing</th>
        </tr>
        <tr v-for="company in companies">
          <th>{{ company["name"] }}</th>
          <th>{{ company["genre"] }}</th>
        </tr>
      </tbody>
    </table>
  </div>
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
