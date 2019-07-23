const apiKey = "e422a6beda4a794b4e5e2a03ad47ae5c";
const apiURL = "https://api.musixmatch.com/ws/1.1/";

// Variable for the search box input
const query = document.querySelector('#query-lyrics').value;

// Add event listener to the search button to trigger the search for the value typed in the search box
searchButton.addEventListener('click', () => {
    getLyrics(query);
})

//  Form event listener to prevent the default format for submitting to a server
const form = document.querySelector('#form');

// Variable for printing the results as a table on the page 
const tbody = document.querySelector("tbody");

// .getLyrics is the link to the option for showing the lyrics for each song from the list with results displayed
let getLyricsNow = document.querySelectorAll('.getLyricsNow');


// 3 values - radio x 2, text input in the search box
let selected;

// Variable for the radio buttons
const radio = document.querySelectorAll('[type="radio"]');


getLyrics(query);


function getLyrics(query) {

    // Decide what radio button / option was selected
    radio.forEach(item => {
        if (item.checked) selected = item.id;
    })

    console.log(selected);

    // If artist radio button option is selected
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
        success: function(data) {
            console.log(data)
        }
    })
}

// Function for printing results on the page
let results = data;

function appendToPage(results) {

    tbody.innerHTML = "";
    console.log(results)

    // Print results on the table as a table layout
    results.track_list.forEach(item => {
        tbody.innerHTML +=
            `<tr>
            <td>${item.track.artist_name}</td>
            <td>${item.track.track_name}</td>
            <td class="getLyricsNow" data-trackid="${item.track.track_id}">Get Lyrics</td>
        </tr>`;
    });

    getLyricsNow.forEach(item => item.addEventListener('click', (event) => {
        const trackID = event.currentTarget.dataset.trackid;
        console.log(trackID);
        getLyrics(trackID)
    }))
}