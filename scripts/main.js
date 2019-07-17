// Set event Listener on Search Button
const searchButton = document.querySelector('#user-search-button');
const lyricsSearch = document.querySelector('#query-lyrics');


searchButton.addEventListener('click', (event) => {
    const lyricsSearch = lyricsSearch.value;
    getData(lyricsSearch);
})


const apiKey = "e422a6beda4a794b4e5e2a03ad47ae5c";
const apiURL = "https://api.musixmatch.com/ws/1.1/";

function getData(lyricsSearch) {
    let results = document.getElementById("output").textContent;
    console.log(results)
    $.ajax({
        type: "GET",
        data: {
            apikey: apiKey,
            track_id: lyricsSearch,
            format: "jsonp",
            callback: "jsonp_callback"
        },
        url: "https://api.musixmatch.com/ws/1.1/track.search",
        dataType: "jsonp",
        jsonpCallback: 'jsonp_callback',
        contentType: 'application/json',
        success: function(data) {
            console.log(data)

        }
    });
}