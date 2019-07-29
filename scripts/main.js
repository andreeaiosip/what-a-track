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

function getLyrics(query, selected) {

    // If artist radio button option is selected
    let data;
    if (selected == 'artist') {
        data = {
            apikey: apiKey,
            q_artist: query,
            f_has_lyrics: true,
            s_artist_rating: true,
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
            <td class="getLyricsNow" data-trackid="${item.track.track_id}"></td>
            <td><a href="${item.track.track_share_url}" target="_blank">Lyrics<a/></td>
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
                <td "getAlbums()" data-trackid="${item.artist.artist_id}">Songs</td>
            </tr>`;
    });
}

// Add event listener to the artists displayed to search for albums
appendToPageArtistResults.value.addEventListener('click', () => {
    getAlbums(artistID)
})

// Find albums for the artist
function getAlbums(artistID) {
    // let artistID = appendToPageArtistResults.value;

    urlExt = `artist.albums.get`;

    $.ajax({
        type: "GET",
        data: {
            apikey: apiKey,
            artist_id: artistID,
            format: "jsonp",
            callback: "jsonp_callback",
            g_album_name: 1

        },
        url: apiURL + urlExt,
        dataType: "jsonp",
        jsonpCallback: 'jsonp_callback',
        contentType: 'application/json',
        success: function(results) {
            results = results.message.body.album_list;
            appendToPageAlbumsResults(results);
        }
    })

    // Display albums on the page
    function appendToPageAlbumsResults(results) {

        const tbody = document.querySelector("#tbody");
        tbody.innerHTML = "";
        console.log(results);

        // Print results on the page as a table layout
        results.forEach(item => {
            tbody.innerHTML +=
                `<tr>
                        <td>${item.album.album_name}</td>
                        <td>${item.album.album_id})</td>
                        <td "getAlbumSongs()" data-albumID="${item.album.album_id}">Songs</td>
                    </tr>`;
        });

    }


    // Add event listener to the album displayed to search for albums
    appendToPageAlbumsResults.value.addEventListener('click', () => {
        getAlbumSongs(artistID)
    })

    // Find songs
    function getAlbumSongs(artistID) {
        let albumID = appendToPageAlbumsResults.value;

        urlExt = `album.tracks.get`;

        $.ajax({
            type: "GET",
            data: {
                apikey: apiKey,
                album_id: albumID,
                format: "jsonp",
                callback: "jsonp_callback",
                page_size: 20,

            },
            url: apiURL + urlExt,
            dataType: "jsonp",
            jsonpCallback: 'jsonp_callback',
            contentType: 'application/json',
            success: function(data) {
                let albumTracks = data.message.body.track_list;
            }
        })
    }
}