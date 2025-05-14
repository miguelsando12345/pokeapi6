class Pokemon {
  constructor(data) {
    this.name = data.name;
    this.id = data.id;
    this.image = data.sprites.other["official-artwork"].front_default;
    this.types = data.types.map((t) => t.type.name);
    this.abilities = data.abilities.map((a) => a.ability.name);
  }

  render() {
    return `
        <div class="card">
          <h2>#${this.id} - ${
      this.name[0].toUpperCase() + this.name.slice(1)
    }</h2>
          <img src="${this.image}" alt="${this.name}">
          
          <div class="types">
            ${this.types.map((t) => `<span class="type">${t}</span>`).join("")}
          </div>
  
          <div class="abilities">
            <h4>Habilidades:</h4>
            <ul>
              ${this.abilities.map((a) => `<li>${a}</li>`).join("")}
            </ul>
          </div>
        </div>
      `;
  }
}

class Pokedex {
  constructor(displayId) {
    this.apiURL = "https://pokeapi.co/api/v2/pokemon/";
    this.display = document.getElementById(displayId);
    this.currentId = 1;
  }

  async fetchAndRender(idOrName) {
    try {
      const res = await fetch(this.apiURL + idOrName.toString().toLowerCase());
      if (!res.ok) throw new Error("Pokémon no encontrado");
      const data = await res.json();
      const pokemon = new Pokemon(data);
      this.currentId = pokemon.id;
      this.display.innerHTML = pokemon.render();
    } catch (error) {
      this.display.innerHTML = `<p>${error.message}</p>`;
    }
  }

  next() {
    this.fetchAndRender(this.currentId + 1);
  }

  prev() {
    if (this.currentId > 1) {
      this.fetchAndRender(this.currentId - 1);
    }
  }
}

const pokedex = new Pokedex("pokemon-display");

document.addEventListener("DOMContentLoaded", () => {
  pokedex.fetchAndRender(1); // Mostrar Bulbasaur al inicio
});

document.getElementById("search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const term = document.getElementById("search-input").value.trim();
  if (term) {
    pokedex.fetchAndRender(term);
  }
});

document.getElementById("next-btn").addEventListener("click", () => {
  pokedex.next();
});

document.getElementById("prev-btn").addEventListener("click", () => {
  pokedex.prev();
});
