document.getElementById('getText').addEventListener('click', getText);

function getText() {
    fetch('https://api.rawg.io/api/games')
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            let output = '<h2>Results</h2>';
            data.forEach(function(results) {
                output += `
                <div>
                <h2> ${results.name}</h2>
                <img src="${results.background_image}"></img>
                <p>${results.description}</p>
                </div>
            `;
            });
            document.getElementById('output').innerHTML = output;
        })
    /*.catch((err) => console.log(error)) */
}   