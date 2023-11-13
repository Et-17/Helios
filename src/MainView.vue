<script setup lang="ts">
import CompanyList from './CompanyList.vue'
import FilterMenu from './FilterMenu.vue'
import ReportGeneration from './ReportGeneration/ReportGeneration.vue'
import { invoke } from '@tauri-apps/api/tauri';
import { convert_single_filter } from './companyManagement';
import { ref } from 'vue';

const props = defineProps<{
  page: string,
}>();

const show_filter = ref(true);
</script>

<template>
  <div id="main-block" :class="{ show_filters: show_filter && page == 'main' }">
    <Transition name="pages" mode="out-in">
      <CompanyList class="page" id="main" v-if="page == 'main'" />
      <ReportGeneration class="page" id="report" v-else-if="page == 'report'" />
      <div class="page" id="add" v-else-if="page == 'add'">Add business page</div>
      <div class="page" id="settings" v-else-if="page == 'settings'">Settings page</div>
    </Transition>
  </div>
  <FilterMenu id="filter-block" :class="{ show: show_filter && page == 'main' }" />
</template>

<style lang="scss">
#main-block {
  position: absolute;
  top: var(--outer-gutter);
  right: var(--outer-gutter);
  bottom: calc(var(--outer-gutter));
  left: calc(var(--icon-box-size) + var(--inner-gutter) * 2 + var(--outer-gutter) * 2);
  background-color: var(--palette-card);
  box-shadow: 15px 15px 0px rgba(0, 0, 0, 0.25);
  overflow-x: hidden;
  overflow-y: scroll;
  transition: bottom 1s;

  &.show_filters {
    // bottom: calc(var(--outer-gutter) * 2 + 100px);
    bottom: calc(var(--outer-gutter) * 1.236 + 38.2vh)
  }
}

#filter-block {
  position: absolute;
  right: var(--outer-gutter);
  bottom: var(--outer-gutter);
  left: calc(var(--icon-box-size) + var(--inner-gutter) * 2 + var(--outer-gutter) * 2);
  background-color: var(--palette-card);
  box-shadow: 15px 15px 0px rgba(0, 0, 0, 0.25);
  overflow-x: hidden;
  overflow-y: scroll;
  transition: height 1s;

  * {
    transition: opacity 1s;
  }

  &.show {
    opacity: 100;
    height: calc((100vh - var(--outer-gutter) * 2) * 0.382);
  }

  &:not(.show) {
    height: 0px;
  }

  &:not(.show) * {
    opacity: 0;
  }
}

.page {
  position: absolute;
  width: 100%;
  top: 0%;
  text-align: center;

  :not(#main),
  :not(#report) {
    height: 100%;
  }
}

.pages-enter-active,
.pages-leave-active {
  transition: all 0.25s;
}

.pages-enter-from,
.pages-leave-to {
  opacity: 0;
}
</style>
