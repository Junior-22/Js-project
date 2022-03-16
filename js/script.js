// IIFE
let pokemonRepository = (function (){
  let pokemonList = [
    {
      name: 'Ivysaur',
      height: 1,
      weight: 13,
      types: ['grass', 'poison']
    },
    {
      name: 'Sandslash',
      height: 1,
      weight: 29.5,
      types: ['ground', 'rock']
    },
    {
      name: 'Wigglytuff',
      height: 1,
      weight: 12,
      types: ['normal', 'fairy']
    },
    {
      name: 'Nidoqueen',
      height: 1.3,
      weight: 60,
      types: ['poison', 'ground']
    }
  ];

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
      console.log(showDetails(pokemon));
    });
    // append button to listItem
    listItem.appendChild(button);
    // append listItem to ul
    myPokemons.appendChild(listItem);
  }

// add showDetails function
  function showDetails(pokemon) {
    console.log(showDetails);
  }

  // return addListItem
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

// Add item
console.log(pokemonRepository.getAll());
pokemonRepository.add({name: 'Meowth', height: 0.4, weight: 4.2, types: ['Ghost, Fighting']});
console.log(pokemonRepository.getAll());

// 'addListItem' function inside loop
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
