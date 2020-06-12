document.getElementById('getText').addEventListener('click', getText);

function getText() {
    var game = document.querySelector('#site-search').value;
    var url = 'https://api.rawg.io/api/games?search=' + encodeURIComponent(game);
    url = url.trim();
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            let output = `<h2 class=" col-md-12 text-center">Results</h2><br>`;
            data.results.forEach(function (post) {
                console.log(post.id)
                output += `
                <div class="col-md-4">
                    <div class ="well text-center">
                    <img src="${post.background_image}"></img>
                    <h2> ${post.name}</h2>
                    <a onclick="gameSelected('${post.id}')" class="btn btn-info" href="game.html">Game Details</a>
                    </div>
                </div>
            `;
            });
            document.getElementById('output').innerHTML = output;
        })
        .catch((error) => console.log(error))
}

function gameSelected(id) {
    sessionStorage.setItem('gameId', id);
    window.location = 'game.html';
    return false;
}

function getGame() {
    let gameId = sessionStorage.getItem('gameId');

    var url = 'https://api.rawg.io/api/games/' + encodeURIComponent(gameId);
    url = url.trim();
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data.id)

            let game = `
            <div class ="row">
                <div class ="col-md-4">
                    <img src ="${data.background_image}" class="thumbnail">
                </div>
                <div class ="col-md-8">
                    <h2>${data.name}</h2>
                    <ul class="list-group">
                    <li class="list-group-item"><strong>Released</strong>: ${data.released}</li>
                    <li class="list-group-item"><strong>Rating</strong>: ${data.rating}</li>
                    <li class="list-group-item"><strong>Platforms</strong>: ${data.platforms}</li> 
                    <li class="list-group-item"><strong>Description</strong>: ${data.description}</li>

                    </ul>
                </div>
            </div>
            <a href="index.html" class="btn btn-success">Back to search</a>
            `;
            document.getElementById('game').innerHTML = game;
        });

};