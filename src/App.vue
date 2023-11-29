<script setup lang="ts">
import { shallowRef, onMounted, type ShallowRef, type Component, ref, type Ref } from 'vue';
import { update_companies } from './companyManagement';
import Sidebar from './Sidebar/Sidebar.vue';
import CompanyList from './CompanyList/CompanyList.vue';
import MainView from './MainView.vue';

const current_page: ShallowRef<Component> = shallowRef(CompanyList);

const show_filter_window: Ref<boolean> = ref(false);
const show_selector_window: Ref<boolean> = ref(false);

onMounted(update_companies)
</script>

<template>
  <Sidebar @page-change="p => current_page = p" @toggle-filters="p => show_filter_window = p"
    @toggle-selector="p => show_selector_window = p" />
  <MainView :page="current_page" :filter_window_open="show_filter_window" :selector_window_open="show_selector_window" />
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
