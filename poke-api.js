
const pokeapi = { }


pokeapi.getPokemons = async (offset=0,limit=10) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  const response = await fetch(url)
  let responseJson = await response.json();
  let results = responseJson.results;
  let data = await Promise.all(results.map(async (pokemon) => {
    let res = await fetch(pokemon.url)
    let data = await res.json();
    // console.log(data);
    return data;
  }))

  return data;
}

// pokeapi.getPokemonDetail = async (pokemon){
//   // const pokemons = getPokemons()
// }

