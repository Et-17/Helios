import { ref, type Ref } from 'vue';
import { invoke } from '@tauri-apps/api/tauri';

export type Company = {
    name: string;
    genre: string;
    description: string;
    address: string;
    phone: string;
    revenue: number;
    ticker: string;
    established: number;
}
export const columnkeys: string[] = ["name", "genre", "description", "address", "phone", "revenue", "ticker", "established"]
// I'm just using this for the dynamic filter input type so I'm using "text"
// instead of "string" because that's what html uses.
export const columns: Record<string, string> = {
    name: "text",
    genre: "text",
    description: "text",
    address: "text",
    phone: "text",
    revenue: "number",
    ticker: "text",
    established: "number"
}

export const shown_columns: Ref<(keyof Company)[]> = ref([
    "name",
    "genre",
    "revenue",
    "established"
])

export const frontend_column_names: Record<keyof Company, string> = {
    "name": "Company Name",
    "genre": "Industry",
    "description": "Description",
    "address": "Address",
    "phone": "Phone",
    "revenue": "Revenue",
    "ticker": "Ticker",
    "established": "Est."
}

// This just covers the filters being sent by the components. I've decided to
// just use Object for the converted filters we're sending to mongo. If we typed
// those the type gymnastics and DX would be hell. It's just not worth it.
export type Filter = {
    column: keyof Company,
    name: string,
    value: string | number,
}

export const companies: Ref<Company[]> = ref([]);
export const filters: Ref<Filter[]> = ref([]);

// This populates the companies state with all the companies in the database
export async function get_companies(filters: { $and?: Object[] }) {
    await invoke<Company[]>('get_companies', { filter: filters })
        .then((c: Company[]) => companies.value = c);
}

export async function convert_single_filter(filter: Filter): Promise<Object> {
    var mongodb_operation_code = "";
    switch (filter.name) {
        case "=":
            mongodb_operation_code = "$eq";
            break;
        case "<":
            mongodb_operation_code = "$lt";
            break;
        case ">":
            mongodb_operation_code = "$gt";
            break;
        default:
            // NE is the best way to bail out
            mongodb_operation_code = "$ne";
            break;
    }

    var mongodb_value = typeof filter.value == "string" ? filter.value : {
        $numberLong: `${filter.value.valueOf()}`
    }

    var mongodb_filter_object: Record<string, Object> = {};
    var mongodb_operation_object: Record<string, Object> = {};
    mongodb_operation_object[mongodb_operation_code] = mongodb_value;
    mongodb_filter_object[filter.column] = mongodb_operation_object;

    return mongodb_filter_object as Object;
}

export async function update_companies() {
    console.log(filters.value);
    if (filters.value.length == 0) {
        get_companies({});
    } else {
        // while functional is awesom i can't figure out the promise stuff so
        // iterative it is ig
        const mongoed_filters: Object[] = []
        for (var i = 0; i < filters.value.length; i++) {
            mongoed_filters.push(await convert_single_filter(filters.value[i]));
            console.log(mongoed_filters[i]);
        }
        get_companies({
            $and: mongoed_filters
        })
        // get_companies({
        //     $and: filters.value.map(convert_single_filter)
        // });
    }
}
