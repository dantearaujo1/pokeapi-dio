
const pokeapi = { }


pokeapi.getPokemons = async (offset=0,limit=10) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  const response = await fetch(url)
  let responseJson = await response.json();
  let results = responseJson.results;
  let data = await Promise.all(results.map(async (pokemon) => {
    let res = await fetch(pokemon.url)
    let data = await res.json();
    return data;
  }))

  return data;
}

class Pokemon {
  number;
  name;
  type;
  types = [];
  photo;
}

function convertPokemonDetailToPokemon(pokemonDetail){
  const pokemon = Pokemon();
  pokemon.number = pokemonDetail.id;
  pokemon.name = pokemonDetail.name;

  const types = pokemonDetail.map((typesSlot)=>typesSlot.name)
  const [type] = types
  pokemon.types = types;
  pokemon.type = type
  pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default;

  return pokemon;

}

pokeapi.getPokemonDetails = async (pokemon) => {
  let detail = await fetch(pokemon.url);
  let json = await detail.json()
  return convertPokemonDetailToPokemon(pokemonDetail);
}

pokeapi.getPokemon = async (name) =>{
  let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
  let json = await data.json();
  return json;
}

