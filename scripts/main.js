document.getElementById('getSearch').addEventListener('click', getText);

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
                <div class="card grow bg-light mb-3 col-md-3">
                    <div class ="well text-center">
                    <img  class ="mt-3" src="${post.background_image}"></img>
                    <h4>${post.name}</h4>
                    <a onclick="gameSelected('${post.id}')" class="btn btn-info mt-3 mb-3" href="game.html">Game Details</a>
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
            <div class ="row justify-content-center">
                <div class ="col-md-4">
                    <img src ="${data.background_image}" class="responsive">
                </div>
                <div class ="col-md-8">
                    <h2>${data.name}</h2>
                    <ul class="list-group">
                    <li class="list-group-item"><strong>Released</strong>: ${data.released}</li>
                    <li class="list-group-item"><strong>Rating</strong>: ${data.rating} out of 5</li>
                    <li class="list-group-item"><strong>Platforms</strong>: ${data.platforms}</li> 
                    <li class="list-group-item"><strong>Description</strong>: ${data.description}</li>

                    </ul>
                </div>
                <a href="index.html" class="btn btn-success mt-3 mb-3">Back to search</a>
            </div>
            `;
            document.getElementById('game').innerHTML = game;
        });

};