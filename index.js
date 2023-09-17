
const loadMoreButton = document.getElementById("loadButton")
const limit = 9;
let offset = 0;
const maxRecord = 151;
let scrollTop = 0;
let scrollLeft = 0;

function convertPokemonToHTML(pokemon){
  let typesString = pokemon.types.map((type)=>{
    return `<li class="type ${type.type.name}">${type.type.name}</li>`
  })
  let endString = `
      <li class="pokemon ${pokemon.types[0].type.name}")>
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
    pokemons.forEach((pokemon,idx) => {
      pokemonList.innerHTML += convertPokemonToHTML(pokemon);
    });
    let cards = document.getElementsByClassName("pokemon");
    for (let i = 0; i < cards.length; i++){
      let name = cards[i].getElementsByClassName("name")[0].textContent;
      cards[i].addEventListener('click',()=>openPokemonModal(name))
    }

}

async function openPokemonModal(name){
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  window.scrollTo({top:0, behavior:'smooth'});
  let pokemon = await pokeapi.getPokemon(name)
  let modal = document.getElementById("modal");
  let typesString = pokemon.types.map((type)=>{
    return `<li class="details type ${type.type.name}">${type.type.name}</li>`
  })
  let statsString = pokemon.stats.map((stat)=>{
    return `<li class="details stat ${stat.stat.name}" style="text-align:left">${stat.stat.name}</li>`
  })
  console.log(pokemon.types[0].type.name)
  let statsData = pokemon.stats.map((stat)=>{
    return `<div class="${pokemon.types[0].type.name}" style="filter:brightness(0.9);width:300px"><li class="details stat bar ${pokemon.types[0].type.name}" style="filter:brightness(2.0);width: ${stat.base_stat}%;text-align:center; max-width:100%">${stat.base_stat}</li></div>`
  })
  modal.innerHTML = `
      <div class="detailCard ">
        <div class="details header">
          <img src=${pokemon.sprites.other["home"].front_default} alt="${pokemon.name}">
          </img>
        </div>
        <div class="details content ${pokemon.types[0].type.name}">
          <div class="details title">
            <h2 class="details name">${pokemon.name}</h2>
            <span class="details number">#${pokemon.id.toString().padStart(3,'0')}</span>
          </div>
          <div class="details types container">
            <ol class="details types">
              ${typesString.join('')}
            </ol>
          </div>
          <div class="details info container">
            <div style="display:flex; flex-direction: row; justify-content:center; width:100%;">
            <ol>
              ${statsString.join('')}
            </ol>
            <ol>
              ${statsData.join('')}
            </ol>
            </div>
          </div>
        <btn class="modal-btn-close" onclick="closeModal()">Fechar</btn>
        </div>
      </div>
  `
  modal.style.display = 'flex'

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


function closeModal(){
  let modal = document.getElementById("modal");
  modal.style.display = 'none'
  window.scrollTo({top:scrollTop, behavior:'smooth'});
}
