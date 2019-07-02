  // Create a new AJAX request for fetching the partial HTML file.
  var xhr = newHXMLHttpRequest();

  xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          document.getElementById("data").innerHTML = this.responseText;
      }
  };