# coex-buster

Main repo

npm install 

npm run dev 

## COMMANDS

`npm run test` : execute the file without checking for errors

## ROUTES

GET: / -> (redirect) -> /movies?page=1

GET: /movies -> (redirect) -> /movies?page=1

GET: /movies?page=number -> list of movies by pagination

GET: /movies?page=number&category=string -> list of films by category and pagination

GET: /movies?page=number&search=string -> list of movies by search and pagination

GET: /movies/:id -> detail of a movie by id

GET: /history -> order history

GET: /history/order/:id -> detail of an order

GET: /login -> user authentication

GET: /register -> create new account

## API

* Search. GET: https://api.themoviedb.org/3/search/movie?api_key=dde722cb807472090076a60be85c0010&language=en-US&query=avengers&page=1&include_adult=false
* Genres. GET: https://api.themoviedb.org/3/genre/movie/list?api_key=dde722cb807472090076a60be85c0010
