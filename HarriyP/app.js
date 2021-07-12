const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');

let hpCharacters = [];
searchBar.addEventListener('keyup', e => {
  let searchString = e.target.value.toLowerCase();
  const filters = hpCharacters.filter(character => {
    return (
      character.name.toLowerCase().includes(searchString) ||
      character.house.toLowerCase().includes(searchString)
    );
  });
  displayCharacters(filters);
});

const loadCharacters = async () => {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      hpCharacters = JSON.parse(this.responseText);
      console.log(hpCharacters);
      displayCharacters(hpCharacters);
    }
  };
  xmlhttp.open('GET', 'https://hp-api.herokuapp.com/api/characters', true);
  xmlhttp.send();
};

const displayCharacters = characters => {
  const htmlString = characters
    .map(character => {
      return `
            <li class="character">
                <h2>${character.name}</h2>
                <p>House: ${character.house}</p>
                <img src="${character.image}"></img>
            </li>
        `;
    })
    .join('');
  charactersList.innerHTML = htmlString;
};

loadCharacters();
