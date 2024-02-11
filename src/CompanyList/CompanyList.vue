<script setup lang="ts">
import { computed } from 'vue';
import { companies, shown_columns, frontend_column_names } from '../companyManagement';
import { use_human_readable_column_names, use_human_readable_data } from '../Settings/settingsManagement';

// const sorted_shown_columns = computed(shown_columns.value.sort);

function sort<T>(to_sort: T[]) {
  return [...to_sort].sort(fancy_sort);
}

// It's really weird for the company name not to be first and the description
// not to be last, so this handles that.
function fancy_sort<T>(a: T, b: T): number {
  if (a == "name" && b != "name") {
    return -1;
  } else if (a != "name" && b == "name") {
    return 1;
  } /*nothing is name*/ else if (a == "description" && b != "description") {
    return 1;
  } else if (a != "description" && b == "description") {
    return -1;
  } /*nothing is desc*/ else if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
}

// Some of the columns need to be localized
function localize_data(data: string | number, column: string): string {
  switch (column) {
    case "genre":
      let lowercase_genre = data.toString();
      return lowercase_genre[0].toLocaleUpperCase() + lowercase_genre.slice(1);
    case "revenue":
      let formatter = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' });
      return formatter.format(data as number);
    case "ticker":
      return data == "N/A" ? "" : data as string;
    default:
      return data.toString();
  }
}
</script>

<template>
  <div>
    <h1 id="company-list-header">Companies</h1><br>
    <table class="company-list">
      <thead>
        <tr>
          <th v-for="column in sort(shown_columns)">{{ use_human_readable_column_names ?
            frontend_column_names[column] :
            column }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="company in companies">
          <td v-for="column in sort(shown_columns)">{{ use_human_readable_data ? localize_data(company[column],
            column) :
            company[column] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
#company-list-header {
  font-family: 'Young Serif', serif;
  font-style: bold;
  font-size: 1.5rem;
}

.company-list {
  width: 100%;
  border-collapse: collapse;
}

.company-list tr {
  width: 100%;
  margin: var(--outer-gutter);

  th {
    font-family: 'Young Serif', serif;
    font-style: normal;
    font-size: 1.1rem;
    line-height: 2;
  }

  td {
    font-family: 'Montserrat', sans-serif;
    line-height: 2;
  }

  th,
  td {
    text-align: left;
  }
}

.company-list tbody tr:hover * {
  background-color: var(--palette-highlight);
}
</style>
