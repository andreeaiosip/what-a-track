const apiKey = "e422a6beda4a794b4e5e2a03ad47ae5c";
const apiURL = "https://api.musixmatch.com/ws/1.1/";

// My colleague Sean Murphy helped me with the first API call

// This code prevents automatic search when the button is pressed without any query typed in the search box
// Code source https://stackoverflow.com/questions/7067005/disable-button-whenever-a-text-field-is-empty-dynamically
function success() {
    const i = document.getElementById("query-music");
    if (i.value == "") {
        document.getElementById("searchButton").disabled = true;
    } else
        document.getElementById("searchButton").disabled = false;
}

// My colleague Villius Dzemyda helped me with the chart music display 
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
            f_has_lyrics: 1, //display songs with lyrics only
            format: "jsonp",
            callback: "jsonp_callback"
        },
        url: apiURL + urlExt,
        dataType: "jsonp",
        jsonpCallback: "jsonp_callback",
        contentType: "application/json",
        success: function(results) {
            let resultsChart = results.message.body.track_list;
            appendToPageChartResults(resultsChart);
        },
    });

    // My colleague, Heather Olcot helped me with displaying results from an API call
    // Top 10 tracks in Ireland are printed on the page
    function appendToPageChartResults(resultsChart) {
        const container = document.querySelector("#container");
        container.innerHTML = "";
        console.log(resultsChart);
        resultsChart.forEach(item => {
            container.innerHTML +=
                `<div class="container mx-auto">
            <div class="row mx-auto music-container">
                <div class="col-2 music-img-container">
                    <img class="music-img">
                </div>
                <div class="col-9 offset-1">
                    <p class="song-name">${item.track.track_name}</p>
                    <p class="artist-name">${item.track.artist_name}</p>
                    <div>
                        <p class="getLyrics pointer" data-trackID="${item.track.track_id}" onclick="getLyrics(${item.track.track_id})">Lyrics
                            <img src="assets/images/expand.png" class="expand-arrow">
                        </p>
                    </div>
                </div>
            </div>
        </div>`;
        });
    }
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

// My colleague Sean Murphy helped me with the conditional for the radio buttons option
// Add event listener to the search button to trigger the search for the value typed in the search box
searchButton.addEventListener('click', () => {
    const query = document.querySelector('#query-music').value; // Keyword typed in the search bar
    const radio = document.querySelectorAll('[type="radio"]'); // Radio button picked

    let selected;
    radio.forEach(item => {
            if (item.checked) selected = item.id;
        })
        // Radio button plus keyword will form the search values
    getMusic(query, selected);
});

// Enter key pressed, triggers search button click event - suggestion from mentor Simen Daehlin
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
            page: 1, // Results only on homepage
            page_size: 100, // 100 artists returned
            s_artist_rating: "desc", // Results displayed by popularity
            format: "jsonp",
            callback: "jsonp_callback"
        }

        // API method for the ARTIST lookup
        urlExt = "artist.search";


        // If SONG radio button option is selected
    } else if (selected == "song") {
        data = {
            apikey: apiKey,
            q_track: query,
            f_has_lyrics: 1,
            page: 1, // Results only on homepage
            page_size: 100, // 100 artists returned
            s_track_rating: "desc", // Results displayed by popularity
            format: "jsonp",
            callback: "jsonp_callback"
        }

        // API method for the SONG lookup
        urlExt = "track.search";
    }

    $.ajax({
        type: "GET",
        data: data,
        url: apiURL + urlExt,
        dataType: "jsonp",
        jsonpCallback: "jsonp_callback",
        contentType: "application/json",
        success: function(results) {

            if (selected == "artist") {
                resultsArtist = results.message.body.artist_list;
                appendToPageArtistResults(resultsArtist);
            } else {
                resultsTrack = results.message.body.track_list;
                appendToPageSongResults(resultsTrack);
            }
        }
    });

}

/**
 * Print results for the SONG search
 * @param resultsTrack 
 */

function appendToPageSongResults(resultsTrack) {

    const container = document.querySelector("#container");
    container.innerHTML = "";
    console.log(resultsTrack);
    if (resultsTrack.length === 0) {
        container.innerHTML += `
        <div class="error"><p>Sorry, no song found with this title.</p></div>
        `;
    }
    resultsTrack.forEach(item => {
        container.innerHTML +=
            `<div class="container mx-auto">
            <div class="row mx-auto music-container">
                <div class="col-2 music-img-container">
                    <img class="music-img song-img">
                </div>
                <div class="col-9 offset-1">
                    <p class="song-name">${item.track.track_name}</p>
                    <p class="artist-name">${item.track.artist_name}</p>
                    <p class="getLyrics pointer" onclick="getLyrics(${item.track.track_id})" data-trackID="${item.track.track_id}">Lyrics
                        <img src="assets/images/expand.png" class="expand-arrow ">
                    </p>
                </div>
            </div>
        </div>`;
    });

}

/**
 * Print results for the ARTIST search
 * @param resultsArtist 
 */
function appendToPageArtistResults(resultsArtist) {
    const container = document.querySelector("#container");
    container.innerHTML = "";
    console.log(resultsArtist);
    if (resultsArtist.length === 0) {
        container.innerHTML += `
        <div class="error"><p>Sorry, no artist found with this name.</p></div>
        `;
    }
    resultsArtist.forEach(item => {
        container.innerHTML +=
            `<div class="container mx-auto">
            <div class="row mx-auto music-container">
                <div class="col-2 music-img-container">
                    <img class="music-img">
                </div>
                <div class="col-9 offset-1">
                    <p class="artist-title">${item.artist.artist_name}</p>
                    <p class="country">${item.artist.artist_country}</p>
                    <p class="getAlbums pointer" onclick="getAlbums(${item.artist.artist_id})" data-artistId="${item.artist.album_list}">Albums
                        <img src="assets/images/expand.png" class="expand-arrow">
                    </p>
                </div>
            </div>
        </div> `
    });

}


// My mentor Simen Daehlin helped with how to pass the id to the function

/** 
 * Search for LYRICS when clicked on a song
 * @param trackId
 */
function getLyrics(trackId) {

    urlExt = "track.lyrics.get";

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
        success: function(data) {

            // Tutor Stephen and Hailey helped me with this conditional and modal display
            // If there are no lyrics found, the user will receive a message on the screen. 
            if ((data.message.body) == 0) {
                const container = document.querySelector("#container");
                container.innerHTML = "";
                console.log(data);
                container.innerHTML += `<p class="error">Sorry, no lyrics found.</p>`

            } else {

                modalLyrics = data.message.body.lyrics.lyrics_body;

                // Check if there is any data returned into the modal.
                if (!modalLyrics || modalLyrics.length < 1) {
                    modalLyrics = "Sorry, no lyrics found";
                }

                appendToPageLyrics(modalLyrics);

                // If lyrics are found, will be printed in a modal.
                $("#printLyrics").modal('show');
            }
        }
    });

}
// Stops modal from being shown if no lyrics are found
//Code from Stackoverflow
$('#lyricsModalContainer').on('show.bs.modal', function(e) {
    if (!data) return e.preventDefault()
})

// Print lyrics results on the page
function appendToPageLyrics(data) {
    const container = document.getElementById("lyricsModalContainer");
    container.innerHTML = "<p>" + data + "</p>";
}


// API method for the ALBUMS lookup when clicked on ARTIST results

function getAlbums(artistId) {
    urlExt = 'artist.albums.get';

    $.ajax({
        type: "GET",
        data: {
            apikey: apiKey,
            page: 1, // Results only on homepage
            page_size: 100, // 100 results returned
            artist_id: artistId,
            g_album_name: 1, // Common albums will be grouped together
            s_release_date: "desc", // Displayed by the newest to the oldest release
            page: 1, // Results only on the homepage
            format: "jsonp",
            callback: "jsonp_callback"

        },
        url: apiURL + urlExt,
        dataType: "jsonp",
        jsonpCallback: "jsonp_callback",
        contentType: "application/json",
        success: function(results) {
            let data = results.message.body.album_list;
            appendToPageAlbums(data);
            console.log(data);
        }
    })
}
// Print ALBUMS results on the page
function appendToPageAlbums(data) {
    const container = document.querySelector("#container");
    container.innerHTML = "";
    console.log(data);
    if (data.length === 0) {
        container.innerHTML += `
        <div class="error"><p>Sorry, no albums available.</p></div>
        `;
    }
    data.forEach(item => {
        container.innerHTML +=
            `<div class="container mx-auto">
            <div class="row mx-auto music-container">
                <div class="col-2 music-img-container">
                    <img class="music-img">
                </div>
                <div class="col-9 offset-1">
                    <p class="album-name">${item.album.album_name}</p>
                    <p class="country" id="releaseDate">${item.album.album_release_date}</p>
                    <p class="getLyrics pointer" onclick="getAlbumTracks(${item.album.album_id})" data-artistId="${item.album.album_id}}">Tracks
                        <img src="assets/images/expand.png" class="expand-arrow">
                    </p>
                </div>
            </div>
        </div>`
    });

}


// API method for the ALBUM TRACKS lookup

function getAlbumTracks(albumId) {
    urlExt = 'album.tracks.get';

    $.ajax({
        type: "GET",
        data: {
            apikey: apiKey,
            page: 1, // Results only on homepage
            page_size: 50, // 50 tracks will be displayed
            album_id: albumId,
            format: "jsonp",
            callback: "jsonp_callback"

        },
        url: apiURL + urlExt,
        dataType: "jsonp",
        jsonpCallback: "jsonp_callback",
        contentType: "application/json",
        success: function(results) {
            let data = results.message.body.track_list;
            appendToPageAlbumTracks(data);
            console.log(data);
        }
    });
}

// TRACKS of a specific album will be displayed on the page
function appendToPageAlbumTracks(data) {
    const container = document.querySelector("#container");
    container.innerHTML = "";
    console.log(data);
    if (data.length === 0) {
        container.innerHTML += `
        <div class="error"><p>Sorry, no tracks available.</p></div>
        `;
    }
    data.forEach(item => {
        container.innerHTML +=
            `<div class="container mx-auto">
            <div class="row mx-auto music-container">
                <div class="col-2 music-img-container">
                    <img class="music-img">
                </div>
                <div class="col-9 offset-1">
                    <p class="artist-title">${item.track.track_name}</p>
                    <p class="getAlbums pointer" data-trackId="${item.track.track_id}" onclick="getLyrics(${item.track.track_id})">Lyrics
                        <img src="assets/images/expand.png" class="expand-arrow">
                    </p>
                </div>
            </div>
        </div>`
    });

}

// Scroll to top when arrow up clicked 
$(window).scroll(function() {
    let height = $(window).scrollTop();
    if (height > 100) {
        $('#back2Top').fadeIn();
    } else {
        $('#back2Top').fadeOut();
    }
});
$(document).ready(function() {
    $("#back2Top").click(function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

});