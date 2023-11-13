<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Ref } from 'vue';
import PageBox from './PageBox.vue';

const emit = defineEmits<{
  (e: 'page-change', page: string): void
}>();

// This has all the pages being shown in the sidebar in the format of
// [page code, google icons name]
const pages: [string, string][] = [
  ['main', 'flare'],
  ['add', 'add'],
  ['report', 'summarize'],
  ['settings', 'settings']
];

// Using refs in v-for isn't guarenteed to give you the correct ordering so I
// use this to apply the ordering. It creates a dictionary from the page code to
// the index of that page in the sidebar. 
var page_nums = new Map<string, number>(pages.map((val, index) => [val[0], index]));

// This stores the vue refs to the sidebar boxes
const page_boxs: Ref<InstanceType<typeof PageBox>[]> = ref([]);

const current_page = ref('main');

watch(current_page, async function (new_val: string) {
  emit('page-change', new_val);
});
</script>

<template>
  <div id="sidebar">
    <div id="active-page-indicator" :style="{ top: page_boxs[page_nums.get(current_page) ?? 0]?.top + 'px' }">
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
