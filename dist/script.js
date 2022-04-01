let pokemonRepository = (function() {
  let e = [],
    t = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  function n(t) {
    e.push(t);
  }
  let o = document.getElementById("list"),
    i = document.getElementById("searchBar");
  function l(e) {
    let t = document.querySelector(".pokemon-list"),
      n = document.createElement("li"),
      o = document.createElement("button");
    (o.innerText = e.name),
      o.classList.add("btn-dark"),
      n.classList.add("group-list-item"),
      n.appendChild(o),
      t.appendChild(n),
      o.addEventListener("click", function() {
        c(e);
      });
  }
  function a(e) {
    let t = e.detailsUrl;
    return fetch(t)
      .then(function(e) {
        return e.json();
      })
      .then(function(t) {
        (e.imageUrl = t.sprites.front_default),
          (e.height = t.height),
          (e.weight = t.weight),
          (e.abilities = []);
        for (let n = 0; n < t.abilities.length; n++)
          e.abilities.push(t.abilities[n].ability.name);
      })
      .catch(function(e) {
        console.error(e);
      });
  }
  function c(e) {
    a(e).then(function() {
      !(function(e) {
        let t = $(".modal-title"),
          n = $(".modal-body");
        t.empty(), n.empty();
        let o = $("<h4>" + e.name + "</h4>"),
          i = $("<img class='modal-img' style='width:70%'>");
        i.attr("src", e.imageUrl);
        let l = $("<p>Height: " + 10 * e.height + "cm</p>"),
          a = $("<p>Weight: " + e.weight / 10 + "kg</p>"),
          c = $("<p>Abilities: " + e.abilities + "</p>");
        t.append(o), n.append(i), n.append(l), n.append(a), n.append(c);
      })(e);
    });
  }
  return (
    console.log("searchbar: " + i),
    console.log("List of pokemon: " + o),
    i.addEventListener("keyup", t => {
      let n = t.target.value.toLowerCase();
      console.log(n),
        console.log(e),
        (function(e, t) {
          $(".pokemon-list").empty();
          const n = e.filter(e => e.name.includes(t));
          n.length ? n.forEach(e => l(e)) : e.forEach(e => l(e));
        })(e, n);
    }),
    {
      add: n,
      getAll: function() {
        return e;
      },
      addListItem: l,
      loadList: function() {
        return fetch(t)
          .then(function(e) {
            return e.json();
          })
          .then(function(e) {
            e.results.forEach(function(e) {
              n({ name: e.name, detailsUrl: e.url });
            });
          })
          .catch(function(e) {
            console.error(e);
          });
      },
      loadDeatails: a,
      showDetails: c
    }
  );
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(e) {
    pokemonRepository.addListItem(e);
  });
});
