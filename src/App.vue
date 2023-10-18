<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from './Sidebar/Sidebar.vue';
import CompanyList from './CompanyList.vue';
import MainView from './MainView.vue';

const current_page = ref('main');
</script>

<template>
  <Sidebar @page-change="p => current_page = p" />
  <!-- <MainView :page="current_page" /> -->
  <CompanyList />
</template>

<style>
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
