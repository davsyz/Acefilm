const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ff1a1ffc7cf62219153261a245be543c';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?api_key=ff1a1ffc7cf62219153261a245be543c&query=";

const main = document.getElementById('section');
const form = document.getElementById('form');
const search = document.getElementById('query');

retrieveMovies(APILINK);
function retrieveMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(function(data) {
            console.log(data.results);
            data.results.forEach(Element => {
            const div_card = document.createElement('div');
                div_card.setAttribute('class', 'card');

                const div_row = document.createElement('div');
                div_row.setAttribute('class', 'row');

                const div_col = document.createElement('div');
                div_col.setAttribute('class', 'col');

                const image = document.createElement('img');
                image.setAttribute('class', 'thumbnail');
                image.setAttribute('id', 'image');

                const title = document.createElement('h3');
                title.setAttribute('id', 'title');

                const center = document.createElement('div');
                center.style.textAlign = 'center';

                title.innerHTML = `${Element.title}`;
                image.src = IMG_PATH + Element.poster_path;
                center.appendChild(image);
                div_card.appendChild(center);
                div_card.appendChild(title);
                div_col.appendChild(div_card);
                div_row.appendChild(div_col);
                main.appendChild(div_row);    
            });
        })
        .catch(err => console.error('Fetch error:', err));
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    main.innerHTML = '';
    const searchTerm = search.value;
    if (searchTerm) {
        retrieveMovies(SEARCHAPI + searchTerm);
        search.value = '';
    }
});