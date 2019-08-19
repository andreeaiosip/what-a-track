const apiKey = "e422a6beda4a794b4e5e2a03ad47ae5c";
const apiURL = "https://api.musixmatch.com/ws/1.1/";


// API method for the ALBUMS lookup

function getAlbums(appendToPageAlbums) {
    urlExt = 'artist.albums.get';

    $.ajax({
        type: "GET",
        data: {
            apikey: apiKey,
            page: 1, // results only on homepage
            page_size: 100,
            artist_id: ARTISTID TBC,
            g_album_name: "",
            s_release_date: "desc",
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
    // results.forEach(item => {
    //     container.innerHTML +=
    //         <div class="container-fluid">
    //             <div class="card bg-dark text-white col-sm-12 col-md-4">
    //                 <img src={album_coverart_500x500} class="card-img" alt="..."> /
    //                      <div class="card-img-overlay">
    //                         <h5 class="card-title">{album_name}</h5> 
    //                             <h6>{artist_name}</h6> 
    //                             <h6>{album_release_date}</h6> 

    //                      </div> 
    //             </div>

    // })
}