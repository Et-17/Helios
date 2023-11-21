<script setup lang="ts">
import { shallowRef, ref, watch, computed } from 'vue';
import type { Component, Ref, ShallowRef } from 'vue';
import PageBox from './PageBox.vue';
import ComponentTest from '@/ComponentTest.vue';
import ReportGeneration from '@/ReportGeneration/ReportGeneration.vue';
import CompanyList from '@/CompanyList.vue';

const emit = defineEmits<{
  (e: 'page-change', page: Component): void
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

const indicator_height = computed(() => page_boxs.value[page_nums.get(current_page.value) ?? 0]?.top + 'px');

watch(current_page, async function (new_val: Component) {
  emit('page-change', new_val);
});
</script>

<template>
  <div id="sidebar">
    <div id="active-page-indicator" :style="{ top: indicator_height }">
    </div>
    <PageBox v-for="[name, icon] in pages" :icon="icon" @click="current_page = name" ref="page_boxs" />
  </div>
</template>

<style>
#sidebar {
  padding: var(--inner-gutter);
  position: absolute;
  left: var(--outer-gutter);
  top: var(--outer-gutter);
  bottom: var(--outer-gutter);
  background-color: var(--palette-card);
  width: var(--icon-box-size);
  box-shadow: 15px 15px 0px rgb(0, 0, 0, 0.25);
}

#active-page-indicator {
  position: absolute;
  width: var(--icon-box-size);
  height: var(--icon-box-size);
  background-color: var(--palette-highlight);
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.25);
  transition: top 0.25s;
}

#push {
  position: absolute;
  width: var(--icon-box-size);
  height: var(--icon-box-size);
  bottom: var(--inner-gutter);
}
</style>
