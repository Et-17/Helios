# Helios
A great way to organize local businesses. Run it by double clicking `helios.exe`. No install is needed, it will just run. Windows might say that it is an untrusted or unsafe file because it hasn't seen it before, so just click "Run Anyway".

## Architecture

Helios was built using Tauri with a Vue frontend. By using Tauri, I am able to employ web design techniques to create a beautiful app, as it essential runs your application in a mini browser. Further, in the future I am able to very easily port it to the browser. All I would need to do is change how it interacts with MongoDB's API. Unlike its competitor Electron, however, it uses Rust for the backend, making it much faster, safer, and smaller. You can find the Rust code in `src-tauri`.

For the frontend I used the web framework Vue. Vue enforces Single File Components, which keeps everything nice and readable. Using a web framework much simplifies web app design, strips out almost all of the normally overwhelming redundant code when using raw HTML/CSS and allows you to create an incredibly fluid and reactive app. I then paired it with Typescript, which is a super set of Javascript that adds strong typing to drastically reduce bugs and allow much more IDE integration for more efficient development. You can find the Vue code in `src`.

I use the cloud service MongoDB Atlas to store the companies, ensuring that you can access your data from wherever you are and that costs will stay low as I don't have to maintain my own server. Filtering is done by the MongoDB database, taking advantage of the years of intense optimizations they have done.

## Interface

The interface was designed specifically to stay out of the way of your work and ensure efficiency. The bar to the left is used to change between the three main tabs: the list of the companies, report generation, and adding companies. When you're on the company list, you will see two more buttons on the bottom: the filter menu and the column toggler.

### Company List

While on first boot, the company list only shows the name, founding year, industry, and revenue, that it isn't all the data it can store. By clicking on the three lines at the bottom of the sidebar you can open a panel allowing you to turn on or off the rest of the columns. The columns that are shown are always sorted alphabetically, but it keeps the company name at the furthest left and the description at the furthest right if you have enabled them.

If you click the button right above it with the funnel, you will open the filter menu. This menu allows you to apply as many filters as you want, which will help you narrow down the list of companies. If you click the trash can next to a filter it will be removed. Whenever you add or remove a filter the company list will automatically update; no more having to refresh after every little change.

### Report Generation

Clicking on the piece of paper on the sidebar will switch to the report generation page. This page will export all of the companies being shown on the company list, including all of the filters and column toggling you have applied, to a CSV file that can be used in all sorts of spreadsheet applications such as Excel.

The names that are shown on the company list are not the names that the database uses but rather much nicer looking names. Database names can't easily have things such as punctuation and spaces, so its much easier to have different names for the database. However, the same rules that make it easier to use names in databases also make those names much easier for analyzing a CSV file, so I use the actual database names when exporting.

### Adding a Company

Of course no data store is complete without the ability to add data. If you click on the plus Helios will switch to the company adding page. This just requires you to put in some data about the company, and then press either the Add Company button or press enter. If everything was successful, Helios will display a message to that effect. The company list will automatically refresh to show you the new company that you have added. All of the text fields are fully Unicode compatible so people of all languages can use Helios.