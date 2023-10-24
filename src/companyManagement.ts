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

export const companies: Ref<Company[]> = ref([]);

export async function get_companies() {
    await invoke<Company[]>('get_companies', { filter: {} })
        .then((c: Company[]) => companies.value = c);
}
