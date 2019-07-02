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
  };


  // Listen for the href value changes.
  window.addEventListener("hashchange", function() {

      // Target the div with the id of "data"
      var dataDiv = $("#data");

      // "Data" div will have the current hash value.
      dataDiv.innerHTML = location.hash;
  });