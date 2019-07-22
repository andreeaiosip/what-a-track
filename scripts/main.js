const apiKey = "422a6beda4a794b4e5e2a03ad47ae5c";
const apiURL = "https://api.musixmatch.com/ws/1.1/";

// Variable for the search box input
const query = document.querySelector('#query-lyrics').value;

// Add event listener to the search button
searchButton.addEventListener('click', () => {
    getLyrics(query);
})


//  Form event listener to prevent the default format for submitting to a server
const form = document.querySelector('#form');

form.onsubmit = (event) => {
    event.preventDefault();

    // 3 values - radio x 2, text input in the search box
    let selected;

    // Variable for the radio buttons
    const radio = document.querySelectorAll('[type="radio"]');

    // Decide what radio button / option was selected
    radio.forEach(item => {
        if (item.checked) selected = item.value;
    })

    getLyrics(selected, query);
}

function getLyrics(selected, query) {


    // If artist radio button option is selected
    if (selected == 'artist') {
        data = {
            apikey: apiKey,
            q_artist: query,
            f_has_lyrics: true,
            format: "jsonp",
            callback: "jsonp_callback"
        }
    }

    $.ajax({
        type: "GET",
        data: getLyrics,
        url: apiURL + 'track.search',
        dataType: "jsonp",
        jsonpCallback: "jsonp_callback",
        contentType: "application/json",
        success: function(data) {
            let results = data.message.body;
            console.log(results)
        }
    })


    // If song radio button option is selected
    if (selected == 'song') {
        data = {
            apikey: apiKey,
            q_track: query,
            f_has_lyrics: true,
            s_track_rating: true,
            format: "jsonp",
            callback: "jsonp_callback"
        }
    }


    $.ajax({
        type: "GET",
        data: getLyrics,
        url: apiURL + 'track.search',
        dataType: "jsonp",
        jsonpCallback: "jsonp_callback",
        contentType: "application/json",
        success: function(data) {
            let results = data.message.body;
            console.log(results)
        }
    })

}


// Function for printing results on the page

function appendToPage(results) {

    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    console.log(results)

    results.track_list.forEach(item => {
        tbody.innerHTML +=
            `<tr>
            <td>${item.track.artist_name}</td>
            <td>${item.track.track_name}</td>
            <td class="getLyrics" data-trackid="${item.track.track_id}">Get Lyrics</td>
        </tr>`;
    });


    let getLyrics = document.querySelectorAll('.getLyrics');
    getLyrics.forEach(item => item.addEventListener('click', (event) => {
        const trackID = event.currentTarget.dataset.trackid;
        console.log(trackID);
        getLyrics(trackID)
    }))
}