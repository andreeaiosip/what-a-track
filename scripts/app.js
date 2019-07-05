// var xhr = newHXMLHttpRequest();

// xhr.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         document.getElementById("data").innerHTML = this.responseText;
//     }
// };

// xhr.open("GET", )



console.log(location.hash);

window.addEventListener("hashchange", function() {
        var contentDiv = document.getElementById("content");

        //Set the "content" div innerHTML based on the fragment identifier.
        contentDiv.innerHTML = location.hash;

        //If no fragment identifier is provided,
        if (!location.hash) {
            location.hash = "#homepage";
        }

        //Navigate once to the initial hash value.
        navigate();

        //Navigate whenever the fragment identifier value changes.
        window.addEventListener("hashchange", navigate);

    }

)

console.log(location.hash);