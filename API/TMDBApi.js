//API/TMDBApi.js 

const API_TOKEN = "4c243f3444172258d67731fad2bde016";

export function getFilmsFromApiWithSearchedText(text){

    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text

    //on récupere les eléments en provenance de l'API
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error))

}

//Doesn't work yet.
export function getImageFromApi(name) {
    return 'https://image.tmdb.org/t/p/w300' + name
}