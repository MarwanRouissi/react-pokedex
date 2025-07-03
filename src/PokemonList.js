import React, { useEffect, useState, useRef, useCallback } from 'react';
import './PokemonList.css';

function PokemonList() {
  const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
  const [pokemons, setPokemons] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const fetchPokemons = useCallback(async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPokemons(prevPokemons => [...prevPokemons, ...data.results]);
      return data.next;
    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const lastPokemonElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        console.log("fetch pokemon");
        console.log(pokemons.length)
        fetchPokemons(BASE_URL + `?offset=${pokemons.length}&limit=20`);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, pokemons.length, fetchPokemons]);

  useEffect(() => {
    console.log("use effect");
    fetchPokemons(BASE_URL + '?offset=0&limit=25');
  }, [fetchPokemons]);

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

    pokemons.forEach(pokemon => {
      if (!pokemonDetails[pokemon.name]) {
        fetchPokemonDetails(pokemon);
      }
    });
  }, [pokemons, pokemonDetails]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="pokemons-grid">
      {pokemons.map((pokemon, index) => {
        if (pokemons.length === index + 1) {
          return (
            <div ref={lastPokemonElementRef} className="pokemon-card" key={pokemon.name}>
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
        } else {
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
        }
      })}
      {loading && <div>Loading...</div>}
    </div>
  );
}

export default PokemonList;
