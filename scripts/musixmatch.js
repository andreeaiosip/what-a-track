fetch('https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })
    .catch(function(err) {
        console.log("Something went wrong!", err);
    });