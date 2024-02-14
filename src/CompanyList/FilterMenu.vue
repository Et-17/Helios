<script setup lang="ts">
import { filters, type Company, columnkeys, columns, update_companies } from './../companyManagement';
import { ref, type Ref } from 'vue';
import { vHelpText } from '../Help/help';

const operations = ["=", "<", ">"];

const selected_column: Ref<string> = ref("name");
const selected_operation: Ref<string> = ref("=");
const selected_argument: Ref<string> = ref("");

async function addFilter() {
  // if the column the filter is being applied to is a number, then convert the
  // argument to a number
  var actual_argument = columns[selected_column.value] == "number" ?
    Number(selected_argument.value) :
    selected_argument.value;

  filters.value.push({
    column: selected_column.value as keyof Company,
    name: selected_operation.value,
    value: actual_argument
  });

  update_companies();
}

async function removeFilter(index: number) {
  filters.value = filters.value.filter((_, i) => i != index);

  update_companies();
}
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Column</th>
          <th>Function</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(filter, index) in filters">
          <td>{{ filter.column }}</td>
          <td>{{ filter.name }}</td>
          <td>{{ filter.value }}</td>
          <td>
            <button class="material-icons" @click="() => removeFilter(index)">delete</button>
          </td>
        </tr>
        <tr>
          <td>
            <select id="newfiltercolumn" v-model="selected_column"
              v-help-text="{ id: 'filter-column-select', text: 'The column that the filter is testing. These are the raw column names used in the database. The correspondences should be pretty clear, but if you need you can disable the column formatting in settings.' }">
              <option :value="column" v-for="column in columnkeys">{{ column }}</option>
            </select>
          </td>
          <td>
            <select id="newfilteroperation" v-model="selected_operation"
              v-help-text="{ id: 'filter-operation-select', text: 'The actual test being done by the filter. For example, if you select \'>\' then it only show data that is greater than the filter value.' }">
              <option :value="operation" v-for="operation in operations">{{ operation }}</option>
            </select>
          </td>
          <td>
            <input id="newfiltervalue" v-model="selected_argument"
              v-help-text="{ id: 'filter-value-input', text: 'The argument to the filter. For example, if you selected greater than, then this will be the number the data has to be greater than. It uses the raw database values and not the formatted ones, and you can disable data formatting in settings to see those if you need.' }">
          </td>
          <td>
            <button class="material-icons" @click="addFilter">add</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
table {
  width: 100%;
  text-align: center;
  padding: var(--inner-gutter);
}
</style>
