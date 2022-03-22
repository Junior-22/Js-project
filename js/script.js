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


let modalContainer = document.querySelector('#modal-container');
// add modal
function showModal(title, text) {
  // clear existing modal content
  modalContainer.innerHTML = ' ';

  let modal = document.createElement('div');
  modal.classList.add('modal');

  // add new modal content
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'close';
  // Close modal using 'Close' button
  closeButtonElement.addEventListener('click', hideModal);

  let titleElement = document.createElement('h1');
  titleElement.innerText = title;

  let contentElement = document.createElement('p');
  contentElement.innerText = text;

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
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

document.querySelector('#show-modal').addEventListener('click', () => {
  showModal();
});


// The code below I wrote to put in the IIFE below the loadDeatails function

// function showModal(pokemon) {
//   // clear existing modal content from HTML
//   modalContainer.innerHTML = '';
//
//   let modal = document.createElement('div');
//   modal.classList.add('modal');
//
//   // add new modal content
//   let closeButtonElement = document.createElement('button');
//   closeButtonElement.classList.add('modal-close');
//   closeButtonElement.innerText = 'Close';
//   // Close modal using 'Close' button
//   closeButtonElement.addEventListener('click', hideModal);
//
//   let titleElement = document.createElement("<p> 'Name:' + pokemon.name + </p>");
//   titleElement.innerText = pokemon.name;
//
//   let imageElement = document.createElement("img");
//   imageElement.setAttribute("src", pokemon.imageUrl);
//
//   let contentElement = document.createElement(
//     "<p> 'Height:' + pokemon.height + </p>"
//     "<p> 'Types:' + pokemon.types + </p>"
//     "<p> 'Weight:' + pokemon.weight + </p>"
//     "<p> 'Abilities:' + pokemon.abilities + </p>"
//     "<p> 'Stats:' + pokemon.stats + </p>"
//   );
//   contentElement.innerText = text;
//
//   modal.appendChild(closeButtonElement);
//   modal.appendChild(titleElement);
//   modal.appendChild(imageElement);
//   modal.appendChild(contentElement);
//   modalContainer.appendChild(modal);
//
//   modalContainer.classList.add('is-visible');
// }
//
// document.querySelector('#show-modal').addEventListener('click', () => {
//   showModal(pokemon);
// });
