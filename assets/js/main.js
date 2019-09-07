const apiKey = "e422a6beda4a794b4e5e2a03ad47ae5c";
const apiURL = "https://api.musixmatch.com/ws/1.1/";


// When page loads, print CHART top 6 tracks from Ireland
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

    function appendToPageChartResults(d) {
        const container = document.querySelector("#container");
        container.innerHTML = "";
        d.forEach(item => {
            container.innerHTML += `
            
	<div class="row mx-auto">
		<div class="col-sm-12">
				<div class="col-sm-2 music-img-container">
                    <div class="image music-img" alt="picture of a vinyl">
                    </div>
                </div>
				<div class="col-sm-3 music-container">
					  <h5 class="song-name">${item.track.track_name}</h5>
					<h6 class="artist-name">${item.track.artist_name}</h6>
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
            // g_commontrack: 1,
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
            `<div class="container-songs mx-auto">
                 <div class="card card-songs text-white mx-auto">
                    <img src="images/album-cover.jpeg" class=" img-fluid card-img float-left" alt="picture of a vinyl">
                        <div class="card-img-overlay">
                             <h6>${item.track.track_name}</h6> 
                            <h6 class="artist-name">${item.track.artist_name}</h6>
                            <p class="getLyrics" data-trackID="${item.track.track_id}">Lyrics</p>
                        </div>
                 </div>
            </div>`;
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
            `<div class="container-artists mx-auto">
            <div class="card card-songs bg-dark text-white mx-auto">
            <img src="images/album-cover.jpeg" class="card-img" alt="picture of a vinyl">
                <div class="card-img-overlay mx-auto">
                            <h6>${item.artist.artist_name}</h6> 
                            <h6>${item.artist.artist_country}</h6>
                        </div> 
                 </div> 
            </div>`
    });
}

// API method for the ALBUMS lookup when clicked on ARTIST results

/* function getAlbums(artistId) {
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

    // Print results on the page
    results.forEach(item => {
        container.innerHTML +=
            <div class="container-fluid">
                <div class="card bg-dark text-white">
                    <img src={item.album_coverart_500x500} class="card-img" alt="..."> /
                         <div class="card-img-overlay">
                            <h5 class="card-title">{album_name}</h5> 
                                <h6>{artist_name}</h6> 
                                <p>{album_release_date}</p> 

                         </div> 
                </div>

    })
} **/