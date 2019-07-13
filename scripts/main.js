const apiKey = "e422a6beda4a794b4e5e2a03ad47ae5c";
const apiURL = "https://api.musixmatch.com/ws/1.1/";
let userSearched = $("#q").val();

function getData(userSearched) {
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