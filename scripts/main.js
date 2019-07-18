// Set event Listener on Search Button
const searchButton = document.querySelector("#user-search-button");

//Search field
const lyricsSearch = document.querySelector("#query");

const apiKey = "e422a6beda4a794b4e5e2a03ad47ae5c";
const apiURL = "https://api.musixmatch.com/ws/1.1/";


searchButton.addEventListener("click", (event) => {

    //id of the search button in index.html
    const musicSearch = document.querySelector("#query");
    getData(lyricsSearch);
});

// Print lyrics on the page in the output div
function getData(lyricsSearch) {
    const outputSection = document.getElementById("#output");
    console.log(lyricsSearch);

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