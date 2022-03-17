// IIFE
let pokemonRepository = (function (){
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  // 'addListItem' function in IIFE
  function addListItem(pokemon) {
    // create ul for pokemon-list in HTML
    let myPokemons = document.querySelector('.pokemon-list');
    // create li element
    let listItem = document.createElement('li');
    // create button + iinerText
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    // add class to button
    button.classList.add('button');
    // add event listener
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
    // append button to listItem
    listItem.appendChild(button);
    // append listItem to ul
    myPokemons.appendChild(listItem);
  }

  // add loadList function to fetch pokemon
  function loadList() {
    return fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error();
    });
  }

  // add loadDeatails function
  function loadDeatails(item) {
    let url = item.detailsUrl;
    return fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (details) {
      // add details to item
      item.imageurl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      item.weight = details.weight;
      item.abilities = details.abilities;
      item.stats = details.stats;
    })
    .catch(function (e) {
      console.error(e);
    });
  }

  // add showDetails function
  function showDetails(pokemon) {
    loadDeatails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  // return addListItem
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDeatails: loadDeatails
  };
})();

// fills repository with pokemons
pokemonRepository.loadList().then(function() {
  // load data
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
