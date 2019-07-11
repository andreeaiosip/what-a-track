// // // Musixmatch API details
const apiKey = "e422a6beda4a794b4e5e2a03ad47ae5c";
const apiURL = "http://api.musixmatch.com/ws/1.1/";
let userSearched = $("#q").val();


fetch(apiURL + "track.search?q" + userSearched + "&apikey=" + apiKey)
