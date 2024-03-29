<script setup lang="ts">
import { shallowRef, ref, watch, computed } from 'vue';
import type { Component, Ref, ShallowRef } from 'vue';
import PageBox from './PageBox.vue';
import AddCompany from '@/AddCompany.vue';
import ReportGeneration from '@/ReportGeneration/ReportGeneration.vue';
import CompanyList from '@/CompanyList/CompanyList.vue';
import Settings from '../Settings/Settings.vue';
import { vHelpText } from '@/Help/help';

const emit = defineEmits<{
  (e: 'page-change', page: Component): void
  (e: 'toggle-filters', show: boolean): void
  (e: 'toggle-selector', show: boolean): void
  (e: 'toggle-help-menu', show: boolean): void
}>();

// This has all the pages being shown in the sidebar in the format of
// [page component, google icons name]
const pages: [Component, string][] = [
  [CompanyList, 'flare'],
  [ReportGeneration, 'summarize'],
  [AddCompany, 'add'],
  [Settings, 'settings']
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
const show_help_menu = ref(false);

watch(current_page, async function (new_val: Component) {
  emit('page-change', new_val);
});

watch(show_filter_window, async function (new_val: boolean) {
  emit('toggle-filters', new_val);
});

watch(show_selector_window, async function (new_val: boolean) {
  emit('toggle-selector', new_val);
})

watch(show_help_menu, async function (new_val: boolean) {
  emit('toggle-help-menu', new_val);
})
</script>

<template>
  <div id="sidebar">
    <div id="active-page-indicator" :style="{ top: `calc(${indicator_top} - 1 * var(--inner-gutter))` }">
    </div>
    <PageBox v-for="[name, icon] in pages" :icon="icon" @click="current_page = name" ref="page_boxs" />
    <hr id="button-section-division">
    <div id="bottom-buttons">
      <div></div><!--placeholder because PageBox strips margin-top for nth(2)-->
      <PageBox id="filters-toggle" :class="{ 'bottom-active': show_filter_window, 'hide': current_page != CompanyList }"
        icon="filter_alt" @click="show_filter_window = !show_filter_window"
        v-help-text="{ id: 'filter-toggle-button', text: 'This button toggles the menu that allows you to add filters to the data.' }" />
      <PageBox id="selector-toggle"
        :class="{ 'bottom-active': show_selector_window, 'hide': current_page != CompanyList }" icon="sort"
        @click="show_selector_window = !show_selector_window"
        v-help-text="{ id: 'column-toggle-button', text: 'This button toggles the menu that allows you to customize which columns are displayed on the company list.' }" />
      <PageBox id="help-toggle" :class="{ 'bottom-active': show_help_menu }" icon="question_mark"
        @click="show_help_menu = !show_help_menu" />
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

#button-section-division {
  background-color: rgb(30, 30, 30);
  opacity: 30%;
  height: 2px;
  border-radius: 10px;
  margin-top: 50%;
  margin-bottom: 50%;
  width: 70%;
}

#active-page-indicator {
  position: absolute;
  width: calc(var(--icon-box-size) + 2 * var(--inner-gutter));
  left: 0px;
  height: calc(var(--icon-box-size) + 2 * var(--inner-gutter));
  background-color: var(--palette-highlight);
  // box-shadow: var(--selector-shadow);
  transition: top 0.25s;
}

#bottom-buttons {
  position: absolute;
  bottom: var(--inner-gutter);
  width: inherit;

  * {
    border-radius: 100%;
    background-color: var(--palette-highlight);
  }
}

.bottom-active {
  background-color: var(--palette-highlight-2) !important;
  * {
    background-color: var(--palette-highlight-2) !important;
  }
  box-shadow: var(--selector-shadow);
}

.hide {
  opacity: 0%;
}
</style>
