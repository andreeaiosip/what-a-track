const apiKey = "e422a6beda4a794b4e5e2a03ad47ae5c";

// Musixmatch APIurl
const apiURL = "https://api.musixmatch.com/ws/1.1/";

// Terms the user is inserting the search box
let userSearched = $('#q').val();

// Results printed in the HTML div section "output"

function getData(userSearched) {
    fetch(apiURL + "track.search?q=" + userSearched + "&apikey=" + apiKey, {
            mode: 'no-cors'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const results = data.message.body.track_list;
            let idOfArtist = results[0].track.artist_id;
            getArtist(idOfArtist)
        });
}

function getArtist(artistID) {
    console.log(artistID)

    fetch(apiURL + "artist.get?artist_id=" + artistID + "&apikey=" + apiKey)
        .then(res => res.json())
        .then(data => console.log(data));
}