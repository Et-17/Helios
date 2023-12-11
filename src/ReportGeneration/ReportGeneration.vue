<script setup lang="ts">
import { companies, shown_columns } from './../companyManagement';
import { save, message } from '@tauri-apps/api/dialog';
import { BaseDirectory, writeTextFile } from '@tauri-apps/api/fs';

// stores a csv report to a file
async function storeReport() {
  const suggestedFilename = "report.csv";

  const filePath = await save({
    defaultPath: BaseDirectory.Download + "/" + suggestedFilename,
    filters: [{
      name: 'Comma Separated Values',
      extensions: ['csv']
    }]
  });

  if (filePath == null) {
    await message("A file path must be selected", { title: 'File Path Error', type: 'error' }); // remember to use passive for errors
    return;
  }

  // we can force path to string because of the bail-out on null
  await writeTextFile(filePath as string, await genReport());

  await message(`Successfully wrote report to ${filePath}`, { title: 'Wrote Report', type: 'info' });

  console.log("Done");
}

// returns the report as a csv string
async function genReport() {
  return shown_columns.value.join(",") + "\n" + (await genReportBody());
}

// return the body of a csv report as a string
async function genReportBody() {
  return companies.value
    .map(company => shown_columns.value.map(column => company[column]).join(","))
    .join("\n");
}
</script>

<template>
  <div id="report-gen-container">
    <button @click="storeReport">Generate Report</button>
  </div>
</template>

<style>
#report-gen-container {
  padding: var(--inner-gutter);
}
</style>