const apiKey = "e422a6beda4a794b4e5e2a03ad47ae5c";
const apiURL = "https://api.musixmatch.com/ws/1.1/";

/**
// When page loads, print CHART top 6 tracks from Ireland
$(window).bind("load", function() {

    urlExt = "chart.tracks.get";

    $.ajax({
        type: "GET",
        data: {
            apikey: apiKey,
            page: 1, // results only on homepage
            page_size: 6, // 6 songs returned
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
            <div class="container-chart">
                  <div class="card bg-dark text-white col-sm-4 col-md-4 mx-auto">
                  <img src="images/album-cover.jpeg" class="card-img" alt="picture of a vinyl">
                  <div class="card-img-overlay chart-cards">
                              <h5 class="card-title">${item.track.track_name}</h5>
                                  <h6>${item.track.artist_name}</h6>
                          </div>
                          </div>
                  </div>`;
        });
    }

    appendToPageChartResults();
});
*/

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

// Enter key pressed, triggers search button click event
$('#query-lyrics').keypress(function(e) {
    if (e.which == 13) {
        $('#searchButton').click();
    }
});

function getLyrics(query, selected) {

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
            `<div class="container-songs mx-auto">
                 <div class="card card-songs text-white mx-auto">
                    <img src="images/album-cover.jpeg" class="card-img" alt="picture of a vinyl">
                        <div class="card-img-overlay">
                             <h5>${item.track.track_name}</h5> 
                            <h6>${item.track.artist_name}</h6>
                            <h6 class="getLyricsNow" data-trackid="${item.track.track_id}">Get Lyrics</h6>
                        </div>
                 </div>
            </div>`;
    });


    let getLyricsNow = document.querySelectorAll('.getLyricsNow');
    getLyricsNow.forEach(item => item.addEventListener('click', (event) => {
        const trackID = event.currentTarget.dataset.trackID;
        console.log(trackID);
        getLyrics(trackID)
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
                            <h5>${item.artist.artist_name}</h5> 
                            <h6>${item.artist.artist_country}</h6>
                        </div> 
                 </div> 
            </div>`
    });
}