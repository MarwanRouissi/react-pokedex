import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './PokemonModal.css';

function PokemonModal({ pokemon, onClose }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (pokemon && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Détruire l'instance précédente du graphique si elle existe
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Extraire les noms et les valeurs des statistiques
      const statNames = pokemon.stats.map(statInfo => statInfo.stat.name);
      const statValues = pokemon.stats.map(statInfo => statInfo.base_stat);

      // Créer un nouveau graphique
      chartInstance.current = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: statNames,
          datasets: [{
            label: 'Stats',
            data: statValues,
            fill: true,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }],
        },
        options: {
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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <div className="header">
          <h2>ID: {pokemon.id}</h2>
          <h2>{pokemon.name}</h2>
        </div>
        <img id="modal-img" src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
        <h3>About</h3>
        <div className="about">
          <div className="height">
            <div className="height-details">
              <img width="48" height="48" src="https://img.icons8.com/badges/48/ruler-vertical.png" alt="ruler-vertical"/>
              <p>{pokemon.height / 10} M</p>
            </div>
            <p>Height</p>
          </div>
          <div className="weight">
            <div className="weight-details">
              <img width="50" height="50" src="https://img.icons8.com/ios/50/weight.png" alt="weight"/>
              <p>{pokemon.weight / 10} KG</p>
            </div>
            <p>Weight</p>
          </div>
          <div className="pokemon-abilities">
            {pokemon.abilities.map((abilityInfo, index) => (
              <span key={index} className="pokemon-ability">{abilityInfo.ability.name}</span>
            ))}
            <p>Abilities</p>
          </div>
        </div>
        <div className="pokemon-stats">
          <canvas ref={chartRef}></canvas>
        </div>
        <div className="pokemon-types">
          {pokemon.types.map((typeInfo, index) => (
            <span key={index} className="pokemon-type">{typeInfo.type.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonModal;
