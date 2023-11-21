<script setup lang="ts">
import CompanyList from './CompanyList.vue'
import FilterMenu from './FilterMenu.vue'
import { ref, type Component, computed } from 'vue';

const props = defineProps<{
  page: Component,
  filter_window_open: boolean
}>();

const show_filter = computed(() => props.filter_window_open && props.page == CompanyList);
</script>

<template>
  <div id="main-block" :class="{ show_filters: show_filter }">
    <Transition name="pages" mode="out-in">
      <KeepAlive>
        <component :is="page" class="page" />
      </KeepAlive>
    </Transition>
  </div>
  <FilterMenu id="filter-block" :class="{ show: show_filter }" />
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
