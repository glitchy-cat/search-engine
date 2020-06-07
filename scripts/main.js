document.getElementById('getText').addEventListener('click', getText);

function getText() {
    var game = document.querySelector('#site-search').value;
    var url = 'https://api.rawg.io/api/games?page_size=5&search=' + encodeURIComponent(game);
    url = url.trim();
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            let output = '<h2>Results</h2>';
            data.results.forEach(function (post) {
                console.log(post)
                output += `
                <div>
                <h2> ${post.name}</h2>
                <img src="${post.background_image}"></img>
                <p>${post.description}</p>
                </div>
            `;
            });
            document.getElementById('output').innerHTML = output;
        })
    .catch((err) => console.log(error))
}   