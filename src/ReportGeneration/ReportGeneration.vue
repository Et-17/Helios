<script setup lang="ts">
import { show } from '@tauri-apps/api/app';
import { companies, shown_columns, frontend_column_names } from './../companyManagement';
import { save, message } from '@tauri-apps/api/dialog';
import { BaseDirectory, writeTextFile } from '@tauri-apps/api/fs';
import { ref } from 'vue';

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

const human_readable_headers = ref(false);

// returns the report as a csv string
async function genReport() {
  return (await genReportHeader()) + "\n" + (await genReportBody());
}

async function genReportHeader() {
  if (human_readable_headers.value) {
    return shown_columns.value.map(column => "\"" + frontend_column_names[column] + "\"").join(",");
  } else {
    return shown_columns.value.map(column => "\"" + column + "\"").join(",");
  }
}

// return the body of a csv report as a string
async function genReportBody() {
  return companies.value
    .map(company => shown_columns.value.map(column => "\"" + company[column] + "\"").join(","))
    .join("\n");
}
</script>

<template>
  <div id="report-gen-container">
    <h1 id="reports-label">
      Generate Report
    </h1><br>
    <p id="reports-body">
      This will produce a CSV of all the company data being shown on the company list. If you would like the report to
      have different data, please change the filters or column settings.
    </p>
    <br>
    <input type="checkbox" name="header-type" v-model="human_readable_headers"><label id="header-type-label"
      for="header-type">Use human readable names</label>
    <br>
    <br>
    <button @click="storeReport">Generate Report</button>
  </div>
</template>

<style lang="scss">
#report-gen-container {
  width: 45vw;
}

#reports-label {
  font-family: 'Young Serif', serif;
  font-style: bold;
  font-size: 1.5rem;
}

#reports-body {
  font-family: 'Montserrat', sans-serif;
}

#header-type-label {
  font-family: 'Montserrat', sans-serif;
}
</style>
