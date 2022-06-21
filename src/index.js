const url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw&type=single"

function fetchJoke() {
    fetch(url)
        .then(response => {
            console.log(response.status);
            return response.json()
        })
        .then(data => {
            outputJoke(data)
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
}

function outputJoke(data) {
    const joke = document.getElementById("joke");
    joke.innerHTML = data["joke"];
}
