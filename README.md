# 7. Geolocation App
As a User I want to have an application where I can save a collection of preferred geolocation points and see them on a map later.

# Flows described:
- Frontend side should consist of two pages with a proper routes: {host}/places and {host}/map
- On a places page I expect to have a form where I can enter Latitude and Longitude of a place I want to add as a favourite one
- I can also add a Description to a Plae
- Instead of manual entering of coordinates I can use autocomplete control connected to Google Places API where I can type in a name of city and select it from suggestions given by Google. Latitude and Longitude will be taken from Google Places API response
- I also have a submit button
- I also have a text input where I can enter name of place if Lat/Lng entered manually
- Somewhere near I have a table with a list of my places where I can see: Name, Lat, Lng
- I can also delete favourite place by clicking on a button near each record in a table
- All places should be strored in a database so I don't loose them between sessions
- On a map page I can see a Google Map with a markers set for each of my favourite place

# Acceptance criteria:
- Data validation should be applied:
  - Latitude and longitude should have valid values and cannot be empty
  - If Lat/Lng are entered manually - name should not be empty
- Each of the markers saved to a DB should be displayed on a map

# Technologies:
**Required technical stack:**
.Net Core 3, WEB API, Angular 8+, SQL Server

**Recommended libraries:**
EntityFramework Core

# Advance level requirements:
- By clicking on each marker show an additional popup and display value from Description property there

# Steps to make it run on your PC
**Backend**
 - Navigate to the place on your PC where you want to have that project
 - Run following command:
 `git clone https://github.com/bilasyurii/geolocation.git`
 - In the newly created folder navigate to *api* folder
 - Open *Geolocation.sln* file  in Visual Studio
 - In *Geolocation* project open *appsettings.json* file
 - In the 11th line replace the value of *MainSqlServer* with your own connection string
 - Build solution (probably F6)
 - Open Tools → NuGet Package Manager → Package Manager Console
 - Run `update-database`
 - Run solution (F5)

**Frontend**
 - In your IDE open *web* folder
 - Open a terminal
 - Try to run: `ng serve`
 - If you get an error *Could not find module "@angular-devkit/build-angular"*, run: `npm update`
- After running `ng serve` you should be able to use an app on:
`fwefef`
 - If it doesn't work:
	 - Find *src/environments* folder
	 - Open *environment.ts* file
	 - Make sure that *geolocationAPI*'s urlis the same as the url of one which will be opened after you run backend part (discarding *swagger* part)
	 - Repeat actions above with *environment.prod.ts* file

# Notes
 - I have left my Google API key in the *environment.ts* file so you could easily check work of my app with comfort and without any black overlays (don't worry, I understand that I shouldn't leave it available to publicity in real projects)
 

> Somewhere near I have a table with a list of my places where I can see: Name, Lat, Lng

 - I thought that *list of cards* will look much better than table and asked Taras if it's okay to use them instead of tables. He said that I'm allowed to do it :)

> On a places page I expect to have a form where I can enter Latitude and Longitude of a place I want to add as a favourite one

 - Form from second flow description (quoted above) was split in two: *By coordinates* and *By city* (you will see it in the app) on the basis of comfort and with an intent to not make interface overcomplicated

> Instead of manual entering of coordinates I can use autocomplete control connected to Google Places API where I can type in a name of city and select it from suggestions given by Google. Latitude and Longitude will be taken from Google Places API response

 - Task which is quoted above is implemented, of course. But I also want to make clear something. Google Places API is good, but it gives you predefined view of autocomplete and it also shows *Powered by Google* sign. I managed to do my autocomplete in such an easy way - you can see proof of it in commits (if you like), but I decided to make my life more complicated and make my own look of that autocomplete. I used Angular materials for it. So to get info from Google withour having their annoying autocomplete visible I now send requests using Google Autocomplete Service. But it had some problems - it only autocompletes but doesn't give you coordinates, so because of that I also use Google Places Service :)

# Dependencies

If it will be needed for any reason - my application uses following external libraries: 

 - @agm/core
 -  @agm/snazzy-info-window
 - @angular/material
 - @angular/cdk
 - hammerjs
