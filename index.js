
const loadMoreButton = document.getElementById("loadButton")
const limit = 9;
let offset = 0;
const maxRecord = 151;

function convertPokemonToHTML(pokemon){
  let typesString = pokemon.types.map((type)=>{
    return `<li class="type ${type.type.name}">${type.type.name}</li>`
  })
  let endString = `
      <li class="pokemon ${pokemon.types[0].type.name}">
        <span class="number">#${pokemon.id.toString().padStart(3,'0')}</span>
        <span class="name">${pokemon.name}</span>
        <div class="details">
          <ol class="types">
            ${typesString.join('')}
          </ol>
          <img src=${pokemon.sprites.other["official-artwork"].front_default} alt="${pokemon.name}">
        </div>
      </li>
  `
  return endString
}

async function loadPokemonItems(offset=0,limit=5){
    const pokemonList = document.getElementById("pokemonList");
    let pokemons = await pokeapi.getPokemons(offset,limit);
    pokemons.forEach(pokemon => {
      pokemonList.innerHTML += convertPokemonToHTML(pokemon);
    });
}

loadMoreButton.addEventListener('click', () => {
  offset += limit;
  const qtdRecord = offset + limit;
  if (qtdRecord >= maxRecord){
    const newLimit = maxRecord - offset;
    loadPokemonItems(offset,newLimit);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  }
  else{
    loadPokemonItems(offset,limit);
  }
})


loadPokemonItems(offset,limit);

