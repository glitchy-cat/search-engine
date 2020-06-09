document.getElementById('getText').addEventListener('click', getText);

function getText() {
    var game = document.querySelector('#site-search').value;
    var url = 'https://api.rawg.io/api/games?search=' + encodeURIComponent(game);
    url = url.trim();
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            let output = `<h2 class=" col-md-12 text-center">Results</h2><br>`;
            data.results.forEach(function (post) {
                console.log(post)
                output += `
                <div class="col-md-3">
                    <div class = "well text-center">
                    <img src="${post.background_image}"></img>
                    <h2> ${post.name}</h2>
                    <a onclick="gameSelected('${post.id}')" class="btn btn-primary" href="#">Game Details</a>
                    </div>
                </div>
            `;
            });
            document.getElementById('output').innerHTML = output;
        })
        .catch((err) => console.log(error))
}
