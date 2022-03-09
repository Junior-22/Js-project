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

// loop iterates over the items in the pokemonList and write in DOM
for (let i = 0; i < pokemonList.length; i++) {
  document.write("<p>" + pokemonList[i].name + "</p>" + "<p>" + pokemonList[i].height + "</p>");
  console.log(pokemonList [i]);
}

// second option
// for(let i = 0; i < pokemonList.length; i++){
//   document.write(`${pokemonList[i].name}- height: ${pokemonList[i].height}`);
//   console.log(pokemonList [i]);
// }

// adding a conditional
if (pokemonList[i].height === 1) {
  document.write("normal");
} else if (pokemonList[i].height >= 1 && pokemonList[i].height < 1.5) {
  document.write("That's big");
} else {
  document.write("good")
}
