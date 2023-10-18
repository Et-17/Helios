use serde_yaml;
use std::fs;

#[derive(serde::Serialize)]
struct City {
    city: String,
    state: String,
}

#[derive(serde::Serialize, serde::Deserialize)]
pub struct Company {
    pub name: String,
    pub genre: String,
    pub description: String,
    pub address: String,
    pub phone: String,
    pub revenue: i64,
    pub ticker: String,
    pub established: i16,
}

#[tauri::command]
pub fn get_companies() -> Vec<Company> {
    let companies_yaml = fs::read_to_string("../companies.yml").unwrap();
    serde_yaml::from_str::<Vec<Company>>(&companies_yaml).unwrap()
}
