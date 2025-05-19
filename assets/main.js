//Busacr datos del pokemon  dependiando de su numero o nombre
function buscarPokemon(contenedorNumero) {
  let inputId = `pokemonInput${contenedorNumero}`;
  let nombrePokemon = document
    .getElementById(inputId)
    .value.trim()
    .toLowerCase();

  let urlApi = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`;

  fetch(urlApi)
    .then((Response) => Response.json())
    .then((datosPokemon) => mostrarPokemon(datosPokemon, contenedorNumero))
    .catch(() => mostrarError(contenedorNumero));
}

//Mostrar info del pokemon

function mostrarPokemon(datosPokemon, contenedorNumero) {
  let infoDivId = `pokemonInfo${contenedorNumero}`;
  let infoDiv = document.getElementById(infoDivId);
  infoDiv.innerHTML = `
    <h2 class ="pk-name">${datosPokemon.name.toUpperCase()}</h2>
   <img class="pk-img" src="${
     datosPokemon.sprites.other["official-artwork"].front_default
   }">

    <p>Número:${datosPokemon.id}</p>
    <p>weight:${datosPokemon.weight / 10}Kg</p>
    <p>height:${datosPokemon.height / 10}m</p>
    `;
}
//Mostrar error si no se encuentra el pokemon
function mostrarError(contenedorNumero) {
  let infoDivId = `pokemonInfo${contenedorNumero}`;
  let infoDiv = document.getElementById(infoDivId);
  infoDiv.innerHTML = `
  <p class="pk-ms"> Pokemon no encontrado. <br> Intentanta com otro nombre o número</p>`;
}

// Mostrar pokemon inicial

window.onload = function () {
  documwnt.getElementById("pokemonImput1").value = "25";
  buscarPokemon(1);
  document.getElementById("pokemonInput2").value = "4";
  buscarPokemon(2);
};
