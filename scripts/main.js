  // Invoke function expression, so no global variable are introduced.

  (function() {


          // Fetches the file at the given path, then
          // calls the callback with the text content of the file.
          function fetchFile(path, callback) {

              // Create a new AJAX request for fetching the partial HTML file.
              var xhr = newHXMLHttpRequest();

              // Load page when readyState is 4 and status is 200
              xhr.onreadystatechange = function() {
                  if (this.readyState == 4 && this.status == 200) {
                      $("#data").innerHTML = this.responseText;
                  }
              };

              // Call the callback with the content loaded from the file.
              xhr.onload = function() {
                  callback(xhr.responseText);

                  // Fetch the partial HTML file for the given fragment id.
                  xhr.open("GET", path);
                  xhr.send(null);
              };



              //Updates dynamic content based on the identifier.
              function navigate() {

                  // Get a reference to the "data" div.
                  var dataDiv = $("#data"),
              }
              // Listen for the href value changes.
              window.addEventListener("hashchange", function() {

                  //This gets rid of the "#" character.
                  fragmentId = location.hash.substr(1);

                  //Set the "data" div innerHTML based on the fragment identifier.
                  getContent(fragmentId, function(data) {
                      dataDiv.innerHTML = data;
                  });

                  //If no fragment identifier is provided,
                  if (!location.hash) {
                      location.hash = "#home";
                  }

                  //Navigate once to the initial hash value.
                  navigate();

                  //Navigate whenever the fragment identifier value changes.
                  window.addEventListener("hashchange", navigate);

              });
          };