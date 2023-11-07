<script setup lang="ts">
import { companies, filters, type Filter, type Company, columnkeys, columns, update_companies } from './companyManagement';
import { onMounted, ref, type Ref } from 'vue';

const filterSelectionRef: Ref<HTMLSelectElement | null> = ref(null);
const operationSelectionRef: Ref<HTMLSelectElement | null> = ref(null);
const valueSelectionRef: Ref<HTMLInputElement | null> = ref(null);

async function addFilter() {
  const column = filterSelectionRef.value?.value as keyof Company;
  var value: string | number = valueSelectionRef.value?.value as string;
  if (columns[column] == "number") {
    value = Number(value as string);
  }

  // I could probably get this type stuff working properly but I know it won't
  // exceed the values of company and stuff so I'm just forcing the type
  filters.value.push({
    column,
    name: operationSelectionRef.value?.value as string,
    value
  })

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
        <tr v-for="filter in filters">
          <td>{{ filter.column }}</td>
          <td>{{ filter.name }}</td>
          <td>{{ filter.value }}</td>
        </tr>
        <tr>
          <td>
            <select name="newfiltercolumn" id="newfiltercolumn" ref="filterSelectionRef">
              <option :value="column" v-for="column in columnkeys">{{ column }}</option>
            </select>
          </td>
          <td>
            <select name="newfilteroperation" id="newfilteroperation" ref="operationSelectionRef">
              <option :value="operation" v-for="operation in ['=', '<', '>']">{{ operation }}</option>
            </select>
          </td>
          <td>
            <input type="text" name="newfiltervalue" id="newfiltervalue" ref="valueSelectionRef">
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>
            <button id="addfilter" class="material-icons" @click="addFilter">add</button>
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
}
</style>
