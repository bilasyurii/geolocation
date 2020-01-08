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

# Required technical stack:
.Net Core 3, WEB API, Angular 8+, SQL Server

# Recommended libraries:
EntityFramework Core

# Advance level requirements:
- By clicking on each marker show an additional popup and display value from Description property there
