var xhr = newHXMLHttpRequest();

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("data").innerHTML = this.responseText;
    }
};

xhr.open("GET", )



console.log(location.hash);

window.addEventListener("hashchange", function() {
    var contentDiv = $("#content");
    contentDiv.innerHTML = location.hash;

})

console.log(location.hash);