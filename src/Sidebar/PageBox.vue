<script setup lang="ts">
import { computed, type Ref, ref } from 'vue';

const props = defineProps<{
  icon: string,
}>();

const container: Ref<HTMLInputElement | null> = ref(null);

defineExpose({
  top: computed(() => container.value?.offsetTop)
});
</script>

<template>
  <box class="page-box" ref="container">
    <span class="material-icons"> {{ icon }} </span>
  </box>
</template>

<style>
.page-box:nth-of-type(1) {
  margin-top: 0px;
}

.page-box {
  display: block;
  position: relative;
  text-align: center;
  margin-top: var(--inner-gutter);
  transition: all 0.25s;
  cursor: pointer;
}

.page-box .material-icons {
  line-height: var(--icon-box-size);
  font-size: var(--icon-size);
  user-select: none;
  transition: transform 0.25s;
}

.page-box .material-icons:hover {
  transform: rotate(10deg);
}
</style>
