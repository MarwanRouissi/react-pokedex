import { useEffect, useState } from 'react';
import './PokemonList.css';

function PokemonList() {
  const BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=20';
  const [pokemons, setPokemons] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPokemons(data.results);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    const fetchPokemonDetails = async (pokemon) => {
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

    pokemons.forEach(pokemon => {
      if (!pokemonDetails[pokemon.name]) {
        fetchPokemonDetails(pokemon);
      }
    });
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="pokemons-grid">
      {pokemons.map((pokemon) => (
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
      ))}
    </div>
  );
}

export default PokemonList;
