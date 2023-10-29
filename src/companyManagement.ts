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

// This just covers the filters being sent by the components. I've decided to
// just use Object for the converted filters we're sending to mongo. If we typed
// those the type gymnastics and DX would be hell. It's just not worth it.
export type Filter = {
    column: keyof Company,
    name: string,
    value: string | number,
}

export const companies: Ref<Company[]> = ref([]);

// This populates the companies state with all the companies in the database
export async function get_companies(filters: { $and: Object[] }) {
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
        $number: `${filter.value.valueOf()}`
    }

    var mongodb_filter_object: Record<string, Object> = {};
    var mongodb_operation_object: Record<string, Object> = {};
    mongodb_operation_object[mongodb_operation_code] = mongodb_value;
    mongodb_filter_object[filter.column] = mongodb_operation_object;

    return mongodb_filter_object as Object;
}
