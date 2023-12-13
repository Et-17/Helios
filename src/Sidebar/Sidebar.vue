<script setup lang="ts">
import { shallowRef, ref, watch, computed } from 'vue';
import type { Component, Ref, ShallowRef } from 'vue';
import PageBox from './PageBox.vue';
import ComponentTest from '@/ComponentTest.vue';
import ReportGeneration from '@/ReportGeneration/ReportGeneration.vue';
import CompanyList from '@/CompanyList/CompanyList.vue';

const emit = defineEmits<{
  (e: 'page-change', page: Component): void
  (e: 'toggle-filters', show: boolean): void
  (e: 'toggle-selector', show: boolean): void
}>();

// This has all the pages being shown in the sidebar in the format of
// [page component, google icons name]
const pages: [Component, string][] = [
  [CompanyList, 'flare'],
  [ReportGeneration, 'summarize'],
  [ComponentTest, 'add']
]

// Using refs in v-for isn't guarenteed to give you the correct ordering so I
// use this to apply the ordering. It creates a dictionary from the page code to
// the index of that page in the sidebar. 
var page_nums = new Map<Component, number>(pages.map((val, index) => [val[0], index]));

// This stores the vue refs to the sidebar boxes
const page_boxs: Ref<InstanceType<typeof PageBox>[]> = ref([]);

// This the page thats current selected. Because it's a component we have to use
// a shallow ref to prevent unneeded deep reactivity.
const current_page: ShallowRef<Component> = shallowRef(CompanyList);

const indicator_top = computed(() => page_boxs.value[page_nums.get(current_page.value) ?? 0]?.top + 'px');

const show_filter_window = ref(false);
const show_selector_window = ref(false);

watch(current_page, async function (new_val: Component) {
  emit('page-change', new_val);
});

watch(show_filter_window, async function (new_val: boolean) {
  emit('toggle-filters', new_val);
});

watch(show_selector_window, async function (new_val: boolean) {
  emit('toggle-selector', new_val);
})
</script>

<template>
  <div id="sidebar">
    <div id="active-page-indicator" :style="{ top: indicator_top }">
    </div>
    <PageBox v-for="[name, icon] in pages" :icon="icon" @click="current_page = name" ref="page_boxs" />
    <div id="bottom-buttons">
      <div></div><!--placeholder because PageBox strips margin-top for nth(2)-->
      <PageBox id="filters-toggle" :class="{ 'bottom-active': show_filter_window, 'hide': current_page != CompanyList }"
        icon="filter_alt" @click="show_filter_window = !show_filter_window" />
      <PageBox id="selector-toggle"
        :class="{ 'bottom-active': show_selector_window, 'hide': current_page != CompanyList }" icon="sort"
        @click="show_selector_window = !show_selector_window" />
    </div>
  </div>
</template>

<style lang="scss">
#sidebar {
  padding: var(--inner-gutter);
  position: absolute;
  left: var(--outer-gutter);
  top: var(--outer-gutter);
  bottom: var(--outer-gutter);
  background-color: var(--palette-card);
  width: var(--icon-box-size);
  box-shadow: var(--card-shadow);
}

#active-page-indicator {
  position: absolute;
  width: var(--icon-box-size);
  height: var(--icon-box-size);
  background-color: var(--palette-highlight);
  box-shadow: var(--selector-shadow);
  transition: top 0.25s;
}

#bottom-buttons {
  position: absolute;
  bottom: var(--inner-gutter);
  width: inherit;

  * {
    border-radius: 100%;
  }
}

.bottom-active {
  background-color: var(--palette-highlight);
  box-shadow: var(--selector-shadow);
}

.hide {
  opacity: 0%;
}
</style>
