<script setup lang="ts">
import CompanyList from './CompanyList.vue'
import { invoke } from '@tauri-apps/api/tauri';

invoke('greet', { name: 'World!' })
  .then(console.log)

const props = defineProps<{
  page: string,
}>();
</script>

<template>
  <div id="main-block">
    <Transition name="pages" mode="out-in">
      <CompanyList class="page" id="main" v-if="page == 'main'" />
      <div class="page" id="add" v-else-if="page == 'add'">Add business page</div>
      <div class="page" id="settings" v-else-if="page == 'settings'">Settings page</div>
    </Transition>
  </div>
</template>

<style>
#main-block {
  position: absolute;
  top: var(--outer-gutter);
  right: var(--outer-gutter);
  bottom: var(--outer-gutter);
  left: calc(var(--icon-box-size) + var(--inner-gutter) * 2 + var(--outer-gutter) * 2);
  background-color: var(--palette-card);
  box-shadow: 15px 15px 0px rgba(0, 0, 0, 0.25);
  /* font-size: 5rem; */
  overflow: hidden;
}

.page {
  position: absolute;
  width: 100%;
  top: 0%;
  text-align: center;

  :not(#main) {
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
