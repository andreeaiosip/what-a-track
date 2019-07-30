const apiKey = "e422a6beda4a794b4e5e2a03ad47ae5c";
const apiURL = "https://api.musixmatch.com/ws/1.1/";

// Add event listener to the search button to trigger the search for the value typed in the search box
searchButton.addEventListener('click', () => {
    const form = document.querySelector('#form');
    const query = document.querySelector('#query-lyrics').value;
    const radio = document.querySelectorAll('[type="radio"]');

    let selected;
    radio.forEach(item => {
        if (item.checked) selected = item.id;
    })

    getLyrics(query, selected);
})


$('#query-lyrics').keypress(function(e) {
    if (e.which == 13) { //Enter key pressed
        $('#searchButton').click(); //Trigger search button click event
    }
});

function getLyrics(query, selected) {

    // If artist radio button option is selected
    let data;
    if (selected == 'artist') {
        data = {
            apikey: apiKey,
            q_artist: query,
            f_has_lyrics: true,
            format: "jsonp",
            callback: "jsonp_callback"
        }

        // API method for the artist lookup
        urlExt = 'artist.search'


        // If song radio button option is selected
    } else if (selected == 'song') {
        data = {
            apikey: apiKey,
            q_track: query,
            f_has_lyrics: true,
            s_track_rating: true,
            format: "jsonp",
            callback: "jsonp_callback"
        }

        // API method for the song lookup
        urlExt = 'track.search'
    }

    $.ajax({
        type: "GET",
        data: data,
        url: apiURL + urlExt,
        dataType: "jsonp",
        jsonpCallback: "jsonp_callback",
        contentType: "application/json",
        success: function(results) {

            if (selected == 'artist') {
                results = results.message.body.artist_list;
                appendToPageArtistResults(results);
            } else {
                results = results.message.body.track_list;
                appendToPageSongResults(results);
            }
        }
    })

}

function appendToPageSongResults(results) {

    const tbody = document.querySelector("#tbody");
    tbody.innerHTML = "";
    console.log(results);

    // Print results on the page as a table layout
    results.forEach(item => {
        tbody.innerHTML +=
            `<tr>
            <td>${item.track.artist_name}</td>
            <td>${item.track.track_name}</td>
            <td class="getLyricsNow" data-trackid="${item.track.track_id}">Get Lyrics</td>
        </tr>`;
    });


    let getLyricsNow = document.querySelectorAll('.getLyricsNow');
    getLyricsNow.forEach(item => item.addEventListener('click', (event) => {
        const trackID = event.currentTarget.dataset.trackid;
        console.log(trackID);
        getLyrics(trackID)
    }))
}

function appendToPageArtistResults(results) {
    const tbody = document.querySelector("#tbody");
    tbody.innerHTML = "";
    console.log(results);

    // Print results on the page as a table layout
    results.forEach(item => {
        tbody.innerHTML +=
            `<tr>
                <td>${item.artist.artist_name}</td>
                <td>${item.artist.artist_country}</td>
                <td class="getLyricsNow" data-trackid="${item.artist.artist_id}">Find Lyrics</td>
            </tr>`;
    });
}