#[derive(serde::Serialize)]
pub struct Company {
    pub name: String,
}

#[tauri::command]
pub fn get_company() -> Company {
    Company {
        name: "Hello".into(),
    }
}

#[tauri::command]
pub fn get_companies() -> Vec<Company> {
    vec![
        Company {
            name: "Disney".into(),
        },
        Company {
            name: "Pixar".into(),
        },
    ]
}
