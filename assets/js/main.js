const apiKey = "e422a6beda4a794b4e5e2a03ad47ae5c";
const apiURL = "https://api.musixmatch.com/ws/1.1/";


// When page loads, print top 6 tracks from Ireland with API method for the CHART lookup
$(window).bind("load", function() {

    function getChartTracks(appendToPageChartResults) {
        urlExt = 'chart.tracks.get';

        $.ajax({
            type: "GET",
            data: {
                apikey: apiKey,
                page: 1, // results only on homepage
                page_size: 6, // 6 songs returned
                chart_name: top, // top tracks in Ireland
                country: ie,
                f_has_lyrics: 1,
                format: "jsonp",
                callback: "jsonp_callback"

            },
            url: apiURL + urlExt,
            dataType: "jsonp",
            jsonpCallback: "jsonp_callback",
            contentType: "application/json",
            success: function(results) {
                let results = results.message.body.track_list;
                appendToPageChartResults(results);
                console.log(results);
            }
        })
    }


    function appendToPageChartResults(results) {

        const container = document.querySelector("#container");
        container.innerHTML = "";
        console.log(results);
        results.forEach(item => {
            container.innerHTML +=
                `<div class="container">
                <div class="card bg-dark text-white col-sm-12 col-md-4">
                            <h5 class="card-title">${item.track.track_name}</h5>
                                <h6>${item.track.artist_name}</h6> 
                         </div> 
                </div>
   `
        })
    }
});


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

//Enter key pressed, triggers search button click event
$('#query-lyrics').keypress(function(e) {
    if (e.which == 13) {
        $('#searchButton').click();
    }
});

function getLyrics(query, selected) {

    // If artist radio button option is selected
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
        urlExt = 'artist.related.get'


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

function appendToPageSongResults(results) {

    const container = document.querySelector("#container");
    container.innerHTML = "";
    console.log(results);

    // Print results on the page as a table layout
    results.forEach(item => {
        container.innerHTML +=
            `<div class="container-songs">
            <div class="card bg-dark text-white col-sm-12 col-md-6 mx-auto">
           

           <h5>${item.track.track_name}</h5> 
           <h6>${item.track.artist_name}</h6>
            <!-- <h6 class="getLyricsNow" data-trackid="${item.track.track_id}">Get Lyrics</h6> -->
        </div>
        </div>`;
    });


    let getLyricsNow = document.querySelectorAll('.getLyricsNow');
    getLyricsNow.forEach(item => item.addEventListener('click', (event) => {
        const trackID = event.currentTarget.dataset.track_id;
        console.log(trackID);
        getLyrics(trackID)
    }))
}

function appendToPageArtistResults(results) {
    const container = document.querySelector("#container");
    container.innerHTML = "";
    console.log(results);

    // Print results on the page 
    results.forEach(item, index) => {
            $('.row').append(`<div class="col-sm-12 col-md-6 col-lg-4">
        <div class="card my-5"
        <img scr="${artist.cover}" class="card-img-top" alt="artist album cover">
        </div>
        </div>
        container.innerHTML +=
            `<div class="container-artists">
                      <div class="card bg-dark text-white col-sm-12 col-md-6 mx-auto">
              <h5 class="card-title">${item.artist.artist_name}</h5> 
                                     <h6>${item.artist.artist_country}</h6>
                               </div> 
                        </div>`
    });
}