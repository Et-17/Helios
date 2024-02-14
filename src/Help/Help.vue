<script setup lang="ts">
import { ref, computed, type Ref, onMounted, onUnmounted } from 'vue';
import { elements_with_help_text } from './help';

const emit = defineEmits<{
  (e: 'exit'): void
}>();

const current_texts: Ref<[string, HTMLElement][]> = ref([]);
const current_page_num: Ref<number> = ref(0);

async function refresh_help() {
  current_texts.value = []
  current_page_num.value = 0
  for (let key in elements_with_help_text) {
    let style = window.getComputedStyle(elements_with_help_text[key][1]);
    let opacity = style.getPropertyValue('opacity');
    if (Number(opacity) > 0) {
      current_texts.value.push(elements_with_help_text[key]);
    }
  }
  if (current_texts.value.length > 0) {
    focus_elem(current_texts.value[current_page_num.value][1]);
  }
}

async function move_cursor_up() {
  let old_elem = current_texts.value[current_page_num.value][1];
  current_page_num.value = (current_page_num.value + 1) % current_texts.value.length;
  let new_elem = current_texts.value[current_page_num.value][1];
  update_cursor(old_elem, new_elem);
}

async function move_cursor_down() {
  let old_elem = current_texts.value[current_page_num.value][1];
  current_page_num.value = (current_page_num.value - 1) % current_texts.value.length;
  let new_elem = current_texts.value[current_page_num.value][1];
  update_cursor(old_elem, new_elem);
}

async function update_cursor(old_elem: HTMLElement, new_elem: HTMLElement) {
  clear_elem(old_elem);
  focus_elem(new_elem);
}

let current_element_border = "";
let current_element_borderRadius = "";
let current_element_borderStyle = "";

async function clear_elem(elem: HTMLElement) {
  elem.style.border = current_element_border;
  elem.style.borderRadius = current_element_borderRadius;
  elem.style.borderStyle = current_element_borderStyle;
}

async function focus_elem(elem: HTMLElement) {
  let styles = window.getComputedStyle(elem);
  current_element_border = styles.getPropertyValue('border');
  elem.style.border = "10px var(--palette-help)";
  current_element_borderRadius = styles.getPropertyValue('border-radius');
  elem.style.borderRadius = "5px";
  current_element_borderStyle = styles.getPropertyPriority('border-style');
  elem.style.borderStyle = "solid";
}

onMounted(refresh_help);
onUnmounted(async function () {
  if (current_texts.value.length > 0) {
    await clear_elem(current_texts.value[current_page_num.value][1]);
  }
});
</script>

<template>
  <div id="help-display">
    <p>
      {{ (current_texts[current_page_num] ?? [""])[0] }}
    </p>
    <button class="help-menu-button" @click="$emit('exit')">
      Exit
    </button>
    <button class="help-menu-button" @click="move_cursor_up">
      &gt;
    </button>
    <button class="help-menu-button" @click="move_cursor_down">
      &lt;
    </button>
  </div>
</template>

<style lang="scss">
#help-display {
  position: absolute;
  padding: var(--inner-gutter);
  bottom: calc(1.5 * var(--outer-gutter));
  left: 35vw;
  right: 35vw;
  background-color: var(--palette-help);
  box-shadow: var(--card-shadow);
  top: calc((100vh - 2 * var(--outer-gutter)) * 0.7 + var(--outer-gutter));
  font-family: 'Montserrat', sans-serif;
}

.help-menu-button {
  float: right;
}
</style>
