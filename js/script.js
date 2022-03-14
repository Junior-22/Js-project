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

  return {
    add: add,
    getAll: getAll
  };
})();

// Updated using forEach loop, write in DOM, write conditional
pokemonRepository.getAll().forEach(function(pokemon) {
  document.write("<p>")
  document.write(pokemon.name + " " + ("height is") + pokemon.height);
  if (pokemon.height > 1.1 && pokemon.height < 1.5) {
    document.write("--- That's big");
  }
});
document.write("</p>")

// Add item
console.log(pokemonRepository.getAll());
pokemonRepository.add({name: Meowth, height: o.4});
console.log(pokemonRepository.getAll());
