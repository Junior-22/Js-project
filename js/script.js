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

// loop iterates over the items in the pokemonList
for (let i = 0; i < pokemonList.length; i++) {
 console.log(pokemonList [i]);
}

// write in the DOM
function newContent() {
  document.open();
  document.write("<h2>Ivysaur's height is 1</h2>");
  document.write("<h2>Sandslash's height is 1</h2>");
  document.write("<h2>Nidoqueen's height is 1.3</h2>");
  document.write("<h2>Wigglytuff's height is 1</h2>");
  document.close();
}
