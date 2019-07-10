// // // Musixmatch API details
const musixMatchUrl = "http://tracking.musixmatch.com/t1.0/AMa6hJCIEzn1v8RuOP";
// // const musixmatchApiKey = "e422a6beda4a794b4e5e2a03ad47ae5c";


function findMusic() {



    fetch(musixMatchUrl)
        .then(response => {
            console.log(`response.ok:`, response.ok);
            if (!response.ok) {
                throw `Error`;
            }
            return response.json();
        })
        .then(data => {
            console.log(`data:`, data);
        })
        .catch(error => {
            console.log(`error:`, error);
        });

}


// // // Songkick API details
// // const songKickUrl = "https://api.songkick.com/api/3.0/artists/{artist_id}/calendar.json?apikey=EAooEjc7Vtw6pq7W";
// // const songKickApiKey = "EAooEjc7Vtw6pq7W";

// // // Google Map API details

// // const googleMapUrl = ""
// // const googleApiKey = "AIzaSyCLvD0VOODndtiw6LP8xPs72K-3sI5jtvo";


// // function findMusic(){
// //     findLyrics();
// //     findGigs();
// // }

// // // $(function() {
// // //     $("#q").hide()
// // //   });

// //     // return (
// //     //     {
// //     //         "message": {
// //     //           "header": {
// //     //             "status_code": ,
// //     //             "execute_time": 
// //     //           },
// //     //           "body": {
// //     //             "lyrics": {
// //     //               "lyrics_id": ,
// //     //               "restricted": ,
// //     //               "instrumental": "",
// //     //               "lyrics_body": "",
// //     //               "lyrics_language": "en",
// //     //               "script_tracking_url": <script type="text/javascript" src="http://tracking.musixmatch.com/t1.0/AMa6hJCIEzn1v8RuOP">,      
// //     //               "lyrics_copyright": "Lyrics powered by www.musiXmatch.com",
