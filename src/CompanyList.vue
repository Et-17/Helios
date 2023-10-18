<script setup lang="ts">
import { readDir, writeTextFile, createDir, BaseDirectory } from '@tauri-apps/api/fs';
import type { FileEntry } from '@tauri-apps/api/fs';
import { ref } from 'vue';

// const read_dir_stuff = await readDir('users', { dir: BaseDirectory.AppData, recursive: true })

function processEntries(entries: FileEntry[]) {
  for (const entry of entries) {
    console.log(`Entry: ${entry.path}`);
    if (entry.children) {
      processEntries(entry.children);
    }
  }
}

writeTextFile('users/test.txt', 'this is a test', { dir: BaseDirectory.AppConfig })
  .then(_ => readDir('users', { dir: BaseDirectory.AppData, recursive: true }))
  .then(processEntries);
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Company</th>
          <th>Genre</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Jabil</th>
          <th>Manufacturing</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped="true">
div {
  position: absolute;
  top: var(--outer-gutter);
  right: var(--outer-gutter);
  bottom: var(--outer-gutter);
  left: calc(var(--icon-box-size) + var(--inner-gutter) * 2 + var(--outer-gutter) * 2);
  overflow: hidden;
}

table {
  width: 100%;
}

tr {
  width: 100%;
  background-color: var(--palette-card);
  margin: var(--outer-gutter);
}
</style>
