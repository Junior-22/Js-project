// IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //adds a pokemon to the list
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  // gets the pokemon list
  function getAll() {
    return pokemonList;
  }

  // find pokemon in search bar
  let listOfPokemons = document.getElementById("list");
  let searchBar = document.getElementById("searchBar");
  console.log("searchbar: " + searchBar);
  console.log("List of pokemon: " + listOfPokemons);

  // add event listener for search bar
  searchBar.addEventListener("keyup", e => {
    let searchText = e.target.value.toLowerCase();
    console.log(searchText);
    console.log(pokemonList);
    searchPokemon(pokemonList, searchText);
  });

  function searchPokemon(pokemonList, value) {
    let filteredPokemons = pokemonList.filter(function(pokemon) {
      if (pokemon.name.includes(value)) {
        return pokemon;
      }
    });
    console.log(filteredPokemons);
    let oldPokemonList = document.querySelector(".pokemon-list");
    while (oldPokemonList.hasChildNodes()) {
      oldPokemonList.removeChild(oldPokemonList.firstChild);
    }
    for (let i = 0; i < filteredPokemons.length; i++) {
      addListItem(filteredPokemons[i]);
      console.log(filteredPokemons[i]);
    }
  }

  // create button list for pokemons
  function addListItem(pokemon) {
    // create ul for pokemon-list in HTML
    let myPokemons = document.querySelector(".pokemon-list");
    // create li element
    let listItem = document.createElement("li");
    // create button + innerText
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    // add class to button
    button.classList.add("btn-dark");
    listItem.classList.add("group-list-item");
    // append button to listItem
    listItem.appendChild(button);
    // append listItem to ul
    myPokemons.appendChild(listItem);
    // add event listener click
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }

  // add loadList function to fetch pokemons from API
  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          // Add single pokemon to array
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  // load data of pokemons when clicked
  function loadDeatails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        // add details to item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.abilities = [];
        for (let i = 0; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
        }
      })
      .catch(function(e) {
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
    let imageElement = $("<img class='modal-img' style='width:70%'>");
    imageElement.attr("src", pokemon.imageUrl);
    let heightElement = $(
      "<p>" + "Height:" + " " + (pokemon.height * 10 + "cm") + "</p>"
    );
    let weightElement = $(
      "<p>" + "Weight:" + " " + (pokemon.weight / 10 + "kg") + "</p>"
    );
    let abilitiesElement = $(
      "<p>" + "Abilities:" + " " + pokemon.abilities + "</p>"
    );

    modalTitle.append(titleElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(abilitiesElement);
  }

  // loads data from the pokemon server
  function showDetails(pokemon) {
    loadDeatails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  // return addListItem
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDeatails: loadDeatails,
    showDetails: showDetails
  };
})();

// fills repository with pokemons
pokemonRepository.loadList().then(function() {
  // load data
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
