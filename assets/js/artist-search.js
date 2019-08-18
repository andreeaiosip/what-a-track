const apiKey = "e422a6beda4a794b4e5e2a03ad47ae5c";
const apiURL = "https://api.musixmatch.com/ws/1.1/";


// API method for the ARTISTS lookup

function getArtist(appendToPageArtistResults) {
    urlExt = 'artist.search';

    $.ajax({
        type: "GET",
        data: {
            apikey: apiKey,
            page: 1, // results only on homepage
            page_size: 100, // 100 artists returned
            format: "jsonp",
            callback: "jsonp_callback"

        },
        url: apiURL + urlExt,
        dataType: "jsonp",
        jsonpCallback: "jsonp_callback",
        contentType: "application/json",
        success: function(results) {
            let results = results.message.body.artist_list;
            appendToPageArtistResults(results);
            console.log(results);
        }
    })
}

function appendToPageArtistResults(results) {

    const container = document.querySelector("#container");
    container.innerHTML = "";
    console.log(results);

    // Print results on the page
    // results.forEach(item => {
    //     container.innerHTML +=
    //         <div class="container-fluid">
    //             <div class="card bg-dark text-white col-sm-12 col-md-4">
    //                 <img src="..." class="card-img" alt="..."> // wil be a general music related image (no album image is sent back in the response).
    //                      <div class="card-img-overlay">
    //                         <h5 class="card-title">{artist_name}</h5> 
    //                             <h6>{country}</h6>

    //                      </div> 
    //             </div>

    // })
}