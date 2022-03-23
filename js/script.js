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
    // clear existing modal content from HTML
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // add new modal content
    let closeSpanElement = document.createElement('span');
    closeSpanElement.classList.add('close');
    closeSpanElement.innerText = 'X';
    // Close modal using 'Close' button
    closeSpanElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;

    let imageElement = document.createElement("img");
    imageElement.setAttribute("src", pokemon.imageUrl);

    let contentElement = document.createElement('p');
    contentElement.innerText = pokemon.height, pokemon.types, pokemon.weight, pokemon.abilities, pokemon.stats;

    modal.appendChild(closeSpanElement);
    modal.appendChild(titleElement);
    modal.appendChild(imageElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  // close modal
  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  // CLose modal using ESC key
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  // CLose modal by clicking outside of modal
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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
