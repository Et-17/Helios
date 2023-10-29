<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { get_companies, convert_single_filter } from './companyManagement';
import Sidebar from './Sidebar/Sidebar.vue';
import CompanyList from './CompanyList.vue';
import MainView from './MainView.vue';

const current_page = ref('main');

// onMounted(() => get_companies({
//   $and: [
//     async convert_single_filter({
//       column: "name",
//       name: "=",
//       value: "HSN"
//     })
//   ]
// }));

onMounted(() => convert_single_filter({
  column: "name",
  name: "=",
  value: "HSN"
}).then(f => get_companies({ $and: [f] })))
</script>

<template>
  <Sidebar @page-change="p => current_page = p" />
  <MainView :page="current_page" />
</template>

<style lang="scss">
// Young Serif font used in the table headers
@use "./Fonts/young-serif.css";
// Montserrat font used in the table headers
@use './Fonts/montserrat.css';
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

:root {
  --palette-background: #FFFFB3;
  --palette-card: #B3B3FF;
  --palette-highlight: #FFB3D9;
  --outer-gutter: 40px;
  --inner-gutter: 20px;
  --icon-box-size: 72px;
  --icon-size: 48px;
  color: rgb(30, 30, 30);
}
</style>
