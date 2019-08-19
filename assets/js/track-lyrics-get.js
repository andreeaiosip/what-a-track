const apiKey = "e422a6beda4a794b4e5e2a03ad47ae5c";
const apiURL = "https://api.musixmatch.com/ws/1.1/";


// API method for the ALBUM TRACKS lookup

function getLyricsSong(appendToPageLyricsSong) {
    urlExt = 'track.lyrics.get';

    $.ajax({
        type: "GET",
        data: {
            apikey: apiKey,
            track_id: TRACK ID TBC
            format: "jsonp",
            callback: "jsonp_callback"

        },
        url: apiURL + urlExt,
        dataType: "jsonp",
        jsonpCallback: "jsonp_callback",
        contentType: "application/json",
        success: function(results) {
            let results = results.message.body.lyrics;
            appendToPageLyricsSong(results);
            console.log(results);
        }
    })
}

// function appendToPageLyricsSong(results) {

//     const container = document.querySelector("#container");
//     container.innerHTML = "";
//     console.log(results);

// Print results on the page
// results.forEach(item => {
//     container.innerHTML +=
//         <div class="container-fluid">
//                             <h6>${item.lyrics.lyrics_body}</h6> 
//                      </div> 
//             </div>

// })
// }