const apiKey = "e422a6beda4a794b4e5e2a03ad47ae5c";
const apiURL = "https://api.musixmatch.com/ws/1.1/";


// API method for the ALBUM TRACKS lookup

function getAlbumTracks(appendToPageAlbumTracks) {
    urlExt = 'album.tracks.get';

    $.ajax({
        type: "GET",
        data: {
            apikey: apiKey,
            page: 1, // results only on homepage
            page_size: 100,
            album_id: ALBUM ID TBC,
            f_has_lyrics: 1,
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
            let results = results.message.body.track_list;
            appendToPageAlbumTracks(results);
            console.log(results);
        }
    })
}

function appendToPageAlbumTracks(results) {

    const container = document.querySelector("#container");
    container.innerHTML = "";
    console.log(results);

    // Print results on the page
    // results.forEach(item => {
    //     container.innerHTML +=
    //         <div class="container-fluid">
    //             <div class="card bg-dark text-white col-sm-12 col-md-4">
    //                 <img src={tbc} class="card-img" alt="..."> /
    //                      <div class="card-img-overlay">
    //                          <h5>${track_name}</h5> 
    <
    h5 class = "card-title" > $ { getSnippet() } < /h5> 
        //                      </div> 
        //             </div>

    // })
}

function getSnippet(appendToPageSnippet) {
    urlExt = 'track.snippet.get';

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
            let results = results.message.body.snippet;
            appendToPageSnippet(results);
            console.log(results);
        }
    })
}

// function appendToPageSnippet(results) {

//     const container = document.querySelector("#container");
//     container.innerHTML = "";
//     console.log(results);

// Print results on the page
// results.forEach(item => {
//     container.innerHTML +=
//         <div class="container-fluid">
//                             <h6>{snippet_body}</h6> 
//                      </div> 
//             </div>

// })
// }