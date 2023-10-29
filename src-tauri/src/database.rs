use mongodb::{bson, bson::Document, options::FindOptions, Client};

// What is says on the tin. The client connection is managed by Tauri (I know
// globals are a sin to the functional style I'm trying to maintain here but I
// can't find a way around them (pain)). The frontend directly passes the filter
// because it's easier and more flexible to just do the conversion there.
#[tauri::command]
pub async fn get_companies(
    client: tauri::State<'_, Client>,
    filter: bson::Document,
) -> Result<Vec<Document>, ()> {
    println!("{}", filter);
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
