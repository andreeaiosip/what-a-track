const apiKey = "e422a6beda4a794b4e5e2a03ad47ae5c";
const apiURL = "https://api.musixmatch.com/ws/1.1/";


// API method for the CHART lookup

function getChartTracks(appendToPageChartResults) {
    urlExt = 'chart.tracks.get'

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
        }
    })
}

function appendToPageChartResults(results) {

    const container = document.querySelector("#top-tracks");
    container.innerHTML = "";
    console.log(results);

    // Print results on the page
    results.forEach(item => {
        container.innerHTML +=
            `<div class="container-fluid">
                <div class="card bg-dark text-white col-sm-12 col-md-4">
                    <img src="..." class="card-img" alt="...">
                         <div class="card-img-overlay">
                            <h5 class="card-title">Song title</h5>
                                <h6>Artist</h6>
                                     <p class="card-text">Lyrics here</p>
                         </div> 
                </div>
                <div class="card bg-dark text-white col-sm-12 col-md-4">
                    <img src="..." class="card-img" alt="...">
                         <div class="card-img-overlay">
                            <h5 class="card-title">Song title</h5>
                                <h6>Artist</h6>
                                     <p class="card-text">Lyrics here</p>
                         </div> 
                </div>
                <div class="card bg-dark text-white col-sm-12 col-md-4">
                    <img src="..." class="card-img" alt="...">
                         <div class="card-img-overlay">
                            <h5 class="card-title">Song title</h5>
                                <h6>Artist</h6>
                                     <p class="card-text">Lyrics here</p>
                         </div> 
                </div>
                <div class="card bg-dark text-white col-sm-12 col-md-4">
                    <img src="..." class="card-img" alt="...">
                         <div class="card-img-overlay">
                            <h5 class="card-title">Song title</h5>
                                <h6>Artist</h6>
                                     <p class="card-text">Lyrics here</p>
                         </div> 
                </div>
                <div class="card bg-dark text-white col-sm-12 col-md-4">
                    <img src="..." class="card-img" alt="...">
                         <div class="card-img-overlay">
                            <h5 class="card-title">Song title</h5>
                                <h6>Artist</h6>
                                     <p class="card-text">Lyrics here</p>
                         </div> 
                </div>
                <div class="card bg-dark text-white col-sm-12 col-md-4">
                    <img src="..." class="card-img" alt="...">
                         <div class="card-img-overlay">
                            <h5 class="card-title">Song title</h5>
                                <h6>Artist</h6>
                                     <p class="card-text">Lyrics here</p>
                         </div> 
                </div>
            </div>`
    })
}