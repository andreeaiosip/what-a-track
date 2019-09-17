const apiKey = "e422a6beda4a794b4e5e2a03ad47ae5c";
const apiURL = "https://api.musixmatch.com/ws/1.1/";


// This code prevents automatic search when the button is pressed without any query typed in the search box
// Code source https://stackoverflow.com/questions/7067005/disable-button-whenever-a-text-field-is-empty-dynamically
function success() {
    var i = document.getElementById("query-music");
    if (i.value == "") {
        document.getElementById("searchButton").disabled = true;
    } else
        document.getElementById("searchButton").disabled = false;
}

// When page loads, print CHART top 10 tracks from Ireland
$(window).bind("load", function() {

    urlExt = "chart.tracks.get";

    $.ajax({
        type: "GET",
        data: {
            apikey: apiKey,
            page: 1, // results only on homepage
            page_size: 10, // 10 songs returned
            chart_name: "top", // top tracks in Ireland
            country: "IE",
            f_has_lyrics: 1,
            format: "jsonp",
            callback: "jsonp_callback"
        },
        url: apiURL + urlExt,
        dataType: "jsonp",
        jsonpCallback: "jsonp_callback",
        contentType: "application/json",
        success: function(d) {
            let results = d.message.body.track_list;
            appendToPageChartResults(results);
        },
    });

    // Top 10 tracks in Ireland are printed on the page
    function appendToPageChartResults(d) {
        const container = document.querySelector("#container");
        container.innerHTML = "";
        d.forEach(item => {
            container.innerHTML += `
            <div class="container mx-auto">
            <div class="row mx-auto music-container">
                <div class="col-2 music-img-container">
                    <img class="music-img">
                </div>
                <div class="col-9 offset-1">
                    <p class="song-name">${item.track.track_name}</p>
                    <p class="artist-name">${item.track.artist_name}</p>
                    <div>
                        <p class="getLyrics" data-trackID="${item.track.track_id}">Lyrics
                            <img src="assets/images/expand.png" class="expand-arrow" onclick="getLyrics()">
                        </p>
                    </div>
                </div>
            </div>
        </div>         
                  `;
        });
    }

    appendToPageChartResults();
});


// Show loader while searching content
// Code from https://makitweb.com/display-loading-image-when-ajax-call-is-in-progress/
$(document).ajaxStart(function() {
    // Show image container
    $("#loader").show();
});
$(document).ajaxComplete(function() {
    // Hide image container
    $("#loader").hide();
});

// Add event listener to the search button to trigger the search for the value typed in the search box
searchButton.addEventListener('click', () => {
    const form = document.querySelector('#form');
    const query = document.querySelector('#query-music').value;
    const radio = document.querySelectorAll('[type="radio"]');

    let selected;
    radio.forEach(item => {
        if (item.checked) selected = item.id;
    })

    getMusic(query, selected);
})

// Enter key pressed, triggers search button click event
$('#query-music').keypress(function(e) {
    if (e.which == 13) {
        $('#searchButton').click();
    }
});

function getMusic(query, selected) {

    // If ARTIST radio button option is selected
    let data;
    if (selected == 'artist') {
        data = {
            apikey: apiKey,
            q_artist: query,
            f_has_lyrics: 1,
            page: 1, // results only on homepage
            page_size: 100, // 100 artists returned
            s_artist_rating: "desc",
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
            f_has_lyrics: 1,
            page: 1, // results only on homepage
            page_size: 100, // 100 artists returned
            s_track_rating: "desc",
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

// Print results for the SONG results
function appendToPageSongResults(results) {

    const container = document.querySelector("#container");
    container.innerHTML = "";
    console.log(results);
    results.forEach(item => {
        container.innerHTML +=
            `<div class="container mx-auto">
            <div class="row mx-auto music-container">
                <div class="col-2 music-img-container">
                    <img class="music-img song-img">
                </div>
                <div class="col-9 offset-1">
                    <p class="song-name">${item.track.track_name}</p>
                    <p class="artist-name">${item.track.artist_name}</p>
                    <p class="getLyrics" data-trackID="${item.track.track_id}">Lyrics
                        <img src="assets/images/expand.png" class="expand-arrow">
                    </p>
                </div>
            </div>
        </div>
        `;
    });


    let getLyrics = document.querySelectorAll('.getLyrics');
    getLyrics.forEach(item => item.addEventListener('click', (event) => {
        const trackID = event.currentTarget.dataset.trackID;
        console.log(trackID);
        getMusic(trackID)
    }))
}


// Print results for the ARTIST search

function appendToPageArtistResults(results) {
    const container = document.querySelector("#container");
    container.innerHTML = "";
    console.log(results);
    results.forEach(item => {
        container.innerHTML +=
            `<div class="container mx-auto">
            <div class="row mx-auto music-container">
                <div class="col-2 music-img-container">
                    <img class="music-img">
                </div>
                <div class="col-9 offset-1">
                    <p class="artist-title">${item.artist.artist_name}</p>
                    <p class="country">${item.artist.artist_country}</p>
                    <p class="getAlbums" data-artistId="${item.artist.album_list}">Show Albums
                        <img src="assets/images/expand.png" class="expand-arrow">
                    </p>
                </div>
            </div>
        </div> `
    });
}

/*
// Search for lyrics when clicked on a song
function getLyrics(trackId, appendToPageLyrics) {
    urlExt = 'track.lyrics.get';

    $.ajax({
        type: "GET",
        data: {
            apikey: apiKey,
            track_id: trackId,
            format: "jsonp",
            callback: "jsonp_callback"

        },
        url: apiURL + urlExt,
        dataType: "jsonp",
        jsonpCallback: "jsonp_callback",
        contentType: "application/json",
        success: function(results) {
            let results = results.message.body.lyrics;
            appendToPageLyrics(results);
            console.log(results);
        }
    })
}

// Print lyrics results on the page
function appendToPageLyrics(results) {

    const container = document.querySelector("#container");
    container.innerHTML = "";
    console.log(results);
    results.forEach(item => {
        container.innerHTML +=
            `<div class="lyrics-container">
            <h6>${item.lyrics.lyrics_body}</h6>  
            </div>`
    })
}

/*
// API method for the ALBUMS lookup when clicked on ARTIST results

function getAlbums(artistId) {
    urlExt = 'artist.albums.get';

    $.ajax({
        type: "GET",
        data: {
            apikey: apiKey,
            page: 1, // results only on homepage
            page_size: 100,
            artist_id: artistId,
            g_album_name: "",
            s_release_date: desc,
            page_size: 100,
            page: 1,
            format: "jsonp",
            callback: "jsonp_callback"

        },
        url: apiURL + urlExt,
        dataType: "jsonp",
        jsonpCallback: "jsonp_callback",
        contentType: "application/json",
        success: function(results) {
            let results = results.message.body.album_list;
            appendToPageAlbums(results);
            console.log(results);
        }
    })
}

function appendToPageAlbums(results) {

    const container = document.querySelector("#container");
    container.innerHTML = "";
    console.log(results);

    // Print albums results on the page
    results.forEach(item => {
        container.innerHTML +=
            `<div class="container-fluid">
            <div class="card bg-dark text-white">
                <img src=${item.album_coverart_500x500} class="card-img" alt="music album cover">/
                <div class="card-img-overlay">
                    <p class="card-title">${item.artist.album_name}</p>
                    <p>${item.artist_name}</p>
                    <p>${item.artist.album_name.album_release_date}</p>
                </div>
            </div>
        </div>`

    })
}
*/