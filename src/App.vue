<script setup lang="ts">
import { shallowRef, onMounted, type ShallowRef, type Component, ref, type Ref } from 'vue';
import { update_companies } from './companyManagement';
import Sidebar from './Sidebar/Sidebar.vue';
import CompanyList from './CompanyList/CompanyList.vue';
import MainView from './MainView.vue';
import Help from './Help/Help.vue';

const current_page: ShallowRef<Component> = shallowRef(CompanyList);

const show_filter_window: Ref<boolean> = ref(false);
const show_selector_window: Ref<boolean> = ref(false);
const show_help_menu: Ref<boolean> = ref(false);

onMounted(update_companies)
</script>

<template>
  <Sidebar @page-change="p => current_page = p" @toggle-filters="p => show_filter_window = p"
    @toggle-selector="p => show_selector_window = p" @toggle-help-menu="p => show_help_menu = p" />
  <MainView :page="current_page" :filter_window_open="show_filter_window" :selector_window_open="show_selector_window" />
  <Help v-if="show_help_menu" @exit="() => { show_help_menu = false; show_filter_window = false }" />
</template>

<style lang="scss">
// Young Serif font used in the table headers
@use "./Fonts/young-serif.css";
// Montserrat font used in the table headers
@use './Fonts/montserrat.css';
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

:root {
  // --palette-background: #FFFFB3;
  // --palette-background: #FFECB3;
  --palette-background: #FFD9B3;
  // --palette-card: #B3B3FF;
  --palette-card: #FFECB3;
  // --palette-highlight: #FFB3D9;
  --palette-highlight: #FFFFB3;
  // --palette-help: #B3FFD9;
  --palette-help: #C6FFB3;
  --outer-gutter: 40px;
  --inner-gutter: 20px;
  --icon-box-size: 72px;
  --icon-size: 48px;
  --card-shadow: 15px 15px 20px rgba(0, 0, 0, 0.25);
  --selector-shadow: 4px 4px 6px rgba(0, 0, 0, 0.25);
  color: rgb(30, 30, 30);
}
</style>
