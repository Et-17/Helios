<script setup lang="ts">
import ColumnSelector from './CompanyList/ColumnSelector.vue';
import CompanyList from './CompanyList/CompanyList.vue'
import FilterMenu from './CompanyList/FilterMenu.vue'
import { ref, type Component, computed } from 'vue';
import { vHelpText } from './Help/help';
import { high_contrast_mode } from './Settings/settingsManagement';

const props = defineProps<{
  page: Component,
  filter_window_open: boolean,
  selector_window_open: boolean,
}>();

const show_filter = computed(() => props.filter_window_open && props.page == CompanyList);
const show_selector = computed(() => props.selector_window_open && props.page == CompanyList);
</script>

<template>
  <div id="main-block" :class="{ show_filters: show_filter, show_selector: show_selector, 'high-contrast-enable': high_contrast_mode }">
    <Transition name="pages" mode="out-in">
      <!-- <KeepAlive> -->
      <component :is="page" />
      <!-- </KeepAlive> -->
    </Transition>
  </div>
  <FilterMenu id="filter-block" :class="{ show_filters: show_filter, show_selector: show_selector, 'high-contrast-enable': high_contrast_mode }" />
  <ColumnSelector id="column-selector" :class="{ show_selector: show_selector, 'high-contrast-enable': high_contrast_mode }" />
</template>

<style lang="scss">
#main-block {
  position: absolute;
  padding: var(--inner-gutter);
  top: var(--outer-gutter);
  right: var(--outer-gutter);
  bottom: calc(var(--outer-gutter));
  left: calc(var(--icon-box-size) + var(--inner-gutter) * 2 + var(--outer-gutter) * 2);
  background-color: var(--palette-card);
  box-shadow: var(--card-shadow);
  overflow-x: hidden;
  transition: bottom 1s, right 1s;

  &.show_filters {
    bottom: calc(var(--outer-gutter) * 1.236 + 38.2vh)
  }

  &.show_selector {
    right: calc(var(--outer-gutter) * 2 + 250px)
  }
}

#filter-block {
  position: absolute;
  right: var(--outer-gutter);
  bottom: var(--outer-gutter);
  left: calc(var(--icon-box-size) + var(--inner-gutter) * 2 + var(--outer-gutter) * 2);
  background-color: var(--palette-card);
  box-shadow: var(--card-shadow);
  overflow-x: hidden;
  transition: height 1s, right 1s;

  * {
    transition: opacity 1s;
  }

  &.show_filters {
    opacity: 100;
    height: calc((100vh - var(--outer-gutter) * 2) * 0.382);
  }

  &.show_selector {
    right: calc(var(--outer-gutter) * 2 + 250px)
  }

  &:not(.show_filters) {
    height: 0px;
  }

  &:not(.show_filters) * {
    opacity: 0;
  }
}

#column-selector {
  position: absolute;
  right: var(--outer-gutter);
  bottom: var(--outer-gutter);
  top: var(--outer-gutter);
  background-color: var(--palette-card);
  box-shadow: var(--card-shadow);
  overflow-x: hidden;
  transition: width 1s;

  * {
    transition: opacity 1s;
  }

  &.show_selector {
    opacity: 100;
    width: 250px;
  }

  &:not(.show_selector) {
    width: 0px;
  }

  &:not(.show_selector) * {
    opacity: 0;
  }
}

.pages-enter-active,
.pages-leave-active {
  transition: opacity 0.25s;
}

.pages-enter-from,
.pages-leave-to {
  opacity: 0;
}
</style>
