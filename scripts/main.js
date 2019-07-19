const apiKey = "e422a6beda4a794b4e5e2a03ad47ae5c";
const apiURL = "https://api.musixmatch.com/ws/1.1/";


// Set event Listener on Search Button
const searchButton = document.querySelector("#user-search-button");

// Link the Search Button to the search field
searchButton.addEventListener('click', () => {
    const lyricsSearch = ("#query-lyrics").value;
    getData(lyricsSearch);
})



function getData() {

    // Variable set for the search section field
    const queryLyrics = document.querySelector("#query-lyrics").value;

    // Variable set for the output section
    const outputSection = document.getElementById("#output");
    document.querySelector("#output").textContent = "";

    $.ajax({
        type: "GET",
        data: {
            apikey: apiKey,
            q_track: queryLyrics,
            q_artist: queryLyrics,
            format: "jsonp",
            callback: "jsonp_callback"
        },

        // matcher.lyrics.get API method takes two parameters: q_track and q_artist
        url: apiURL + "matcher.lyrics.get",
        dataType: "jsonp",
        jsonpCallback: "jsonp_callback",
        contentType: "application/json",
        success: function(data) {
            let lyricsResults = data.message.body.q_track.q_artist;
            outputSection.innerHTML += `<thead>
                                           <tr>
                                            <th scope="col">Song</th>
                                          <th scope="col">Artist</th>
                                        </tr>
                                     </thead>`;
            lyricsResults.forEach(function(item) {
                outputSection.innerHTML += `<tbody>
                                            <tr>
                                                <td>${q_track}</td>
                                                <td>${q_artist}</td>
                                            </tr>
                                            
                                            <button class="btn btn-secondary btn-result" onclick="returnLyrics(${item.q_track.q_artist}, 'getTrack')">Click here for lyrics</button>
                                        </tbody>`;
            })
        }
    });
}