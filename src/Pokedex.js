import { useEffect, useState } from "react";
import './Pokedex.css';


function Pokedex() {
  const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState({});

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPokemonList(data.results);
      });
  });

  useEffect(() => {
      const fetchPokemonDetails = async (pokemon) => {
        if (pokemonDetails[pokemon.name]) return;
        try {
          const response = await fetch(pokemon.url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const details = await response.json();
          setPokemonDetails(prevDetails => ({
            ...prevDetails,
            [pokemon.name]: details
          }));
        } catch (error) {
          console.error(`Error fetching details for Pokémon: ${error.message}`);
        }
      };

      pokemonList.forEach(pokemon => {
        if (!pokemonDetails[pokemon.name]) {
          fetchPokemonDetails(pokemon);
        }
      });
    }, [pokemonList, pokemonDetails]);


  return (
    <div className="pokemons-grid">
      {pokemonList.map((pokemon) => {
        return (
            <div className="pokemon-card" key={pokemon.name}>
              {pokemonDetails[pokemon.name] && (
                <div>
                  <p className="pokemon-id">#{pokemonDetails[pokemon.name].id}</p>
                  <img
                    src={pokemonDetails[pokemon.name].sprites.other["official-artwork"].front_default}
                    alt={pokemon.name}
                  />
                  <h2 className="pokemon-name">{pokemon.name}</h2>
                </div>
              )}
            </div>
          );
      })}
    </div>
  )
}

export default Pokedex;
