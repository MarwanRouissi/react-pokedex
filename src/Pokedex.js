import { useEffect, useState, useCallback } from "react";
import PokemonModal from "./PokemonModal";
import './Pokedex.css';

function Pokedex() {
  const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState({});
  const [limit] = useState(40);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const loadMore = useCallback(() => {
    if (isLoading) return;
    setIsLoading(true);
    setOffset(prevOffset => prevOffset + limit);
  }, [isLoading, limit]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }

    fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemonList(prevList => [...prevList, ...data.results]);
        setIsLoading(false);
      });
  }, [limit, offset, initialLoad]);

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

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemonDetails[pokemon.name])
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  return (
    <div className="pokemons-grid">
      {pokemonList.map((pokemon) => (
        <div className="pokemon-card" key={pokemon.name} onClick={() => handlePokemonClick(pokemon)}>
          {pokemonDetails[pokemon.name] && (
            <>
              <img
                src={pokemonDetails[pokemon.name].sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
              />
              <h2 className="pokemon-name">{pokemon.name}</h2>
              <p className="pokemon-id">#{pokemonDetails[pokemon.name].id}</p>
            </>
          )}
        </div>
      ))}
      {isLoading && <p>Loading more Pokémon...</p>}
      <PokemonModal pokemon={selectedPokemon} onClose={handleCloseModal} />
    </div>
  );
}

export default Pokedex;
