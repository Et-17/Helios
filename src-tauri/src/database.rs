use mongodb::{bson, bson::Document, options::FindOptions, Client};

#[tauri::command]
pub async fn get_companies(
    client: tauri::State<'_, Client>,
    filter: bson::Document,
) -> Result<Vec<Document>, ()> {
    let db = client.database("helios");
    let companies_collection = db.collection::<Document>("companies");
    let mut cursor = companies_collection
        .find(filter, FindOptions::default())
        .await
        .unwrap();

    let mut result = Vec::new();
    while cursor.advance().await.unwrap() {
        result.push(cursor.deserialize_current().unwrap());
    }

    Ok(result)
}
