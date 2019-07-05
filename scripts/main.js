 // Fetch Data with Fetch API
 function getLyricsFetch() {
     let lyrics = lyricsInput.value;
     fetch()
         .then(resoponse => Response.text())
         .then(data => {
             console.log(data);
         })

     .catch(err => console.log("Something went wrong. Error"));
 }