let pokemonList = [
  {
    name: 'Ivysaur',
    height: 1,
    wieght: 13,
    types: ['grass', 'poison']
  },
  {
    name: 'Sandslash',
    height: 1,
    weight: 29.5,
    types: ['ground', 'rock']
  },
  {
    name: 'Nidoqueen',
    height: 1.3,
    weight: 60,
    types: ['poison', 'ground']
  },
  {
    name: 'Wigglytuff',
    height: 1,
    weight: 12,
    types: ['normal', 'fairy']
  }
];

// for loop iterates over the items in the pokemonList, write in DOM, add a conditional
// for (let i = 0; i < pokemonList.length; i++) {
//
//   document.write("<p>")
//   document.write(pokemonList[i].name + " " + ("height is") + " " + pokemonList[i].height)
//   if (pokemonList[i].height > 1.1 && pokemonList[i].height < 1.5) {
//     document.write("--- That's big");
//   }
//   document.write("</p>")
//   console.log(pokemonList[i]);
// }

// Using forEach loop, write in DOM, write conditional
pokemonList.forEach(function(pokemon) {
  document.write("<p>")
  document.write(pokemon.name + " " + ("height is") + pokemon.height);
  if (pokemon.height > 1.1 && pokemon.height < 1.5) {
    document.write("--- That's big");
  }
  console.log(pokemon);
});
document.write("</p>")
