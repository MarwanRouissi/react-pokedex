import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './PokemonModal.css';

function PokemonModal({ pokemon, onClose }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (pokemon && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // const statNames = pokemon.stats.map(statInfo => statInfo.stat.name);
      const statValues = pokemon.stats.map(statInfo => statInfo.base_stat);
      const pokemonType = pokemon.types.length > 0 ? pokemon.types[0].type.name : 'normal';
      const tempElement = document.createElement('div');
      tempElement.className = `pokemon-type-${pokemonType}`;
      document.body.appendChild(tempElement);
      const style = window.getComputedStyle(tempElement);
      const backgroundColor = style.backgroundColor.replace('rgb', 'rgba').replace(')', ', 0.4)');;
      document.body.removeChild(tempElement);
      const borderColor = backgroundColor.replace('rgb', 'rgba').replace(')', ', 1)');

      chartInstance.current = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: [
            "HP", "ATK", "DEF", "SATK", "SDEF", "SPD"
          ],
          datasets: [{
            label: 'Stats',
            data: statValues,
            fill: true,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
        },

      });
    }
  }, [pokemon]);

  if (!pokemon) return null;

  const pokemonTypeClass = pokemon.types.length > 0 ? `pokemon-type-${pokemon.types[0].type.name}` : '';


  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content ${pokemonTypeClass}`} onClick={e => e.stopPropagation()}>
        <div className="header">
          <h2>{pokemon.name}</h2>
          <h2>#{pokemon.id}</h2>
          <button className="close-button" onClick={onClose}>X</button>
        </div>
        <img id="modal-img" src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
        <div className="info-card">
          <div className="pokemon-types">
            {pokemon.types.map((typeInfo, index) => (
              <span key={index} className={`pokemon-type pokemon-type-${typeInfo.type.name}`}>{typeInfo.type.name}</span>
            ))}
          </div>
          <h3 className={`pokemon-type-${pokemonTypeClass}`}>About</h3>
          <div className="about">
            <div className="height">
              <div className="center">
                <img width="40" height="40" src="https://img.icons8.com/badges/48/ruler-vertical.png" alt="ruler-vertical"/>
                <p>{pokemon.height / 10} M</p>
              </div>
              <p>Height</p>
            </div>
            <div className="weight">
              <div className="center">
                <img width="40" height="40" src="https://img.icons8.com/ios/50/weight.png" alt="weight"/>
                <p>{pokemon.weight / 10} KG</p>
              </div>
              <p>Weight</p>
            </div>
          </div>
          <h3>Base Stats</h3>
          <div className="pokemon-stats center">
            <canvas ref={chartRef} backgroundColor='red'></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonModal;
