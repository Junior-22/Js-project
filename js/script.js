// IIFE
let pokemonRepository = (function (){
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');
  //adds a pokemon to the list
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  // gets the pokemon list
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
      item.imageUrl = details.sprites.front_default;
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

  function showModal(pokemon) {
    let modalTitle = $(".modal-title");
    let modalBody = $(".modal-body");

    // Clear existing content
    modalTitle.empty();
    modalBody.empty();

    // Create content for the modal
    let titleElement = $("<h4>" + pokemon.name + "</h4>");
    let imageElement =$('<img class="modal-img" style="width:70%">');
    imageElement.attr("src", pokemon.imageUrl);
    let heightElement = $("<p>" + "Height:" + pokemon.height + "</p>");
    let weightElement = $("<p>" + "Weight:" + pokemon.weight + "</p>");
    let typesElement = $("<p>" + "Types:" + pokemon.types + "</p>");
    let abilitiesElement = $("<p>" + "Abilities:" + pokemon.abilities + "</p>");
    let statsElement = $("<p>" + "Stats:" + pokemon.stats + "</p>");

    modalTitle.append(titleElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
    modalBody.append(statsElement);
  }

  // add showDetails function
  function showDetails(pokemon) {
    loadDeatails(pokemon).then(function () {
      showModal(pokemon);
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
