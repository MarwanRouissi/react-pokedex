import './PokemonModal.css'; // Assurez-vous de créer ce fichier CSS

function PokemonModal({ pokemon, onClose }) {
  if (!pokemon) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <div className="header">
          <h2>ID: {pokemon.id}</h2>
          <h2>{pokemon.name}</h2>
        </div>
        <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
        <div className="measurements">
          <p>Height: {pokemon.height / 10} M</p>
          <p>Weight: {pokemon.weight / 10} KG</p>
        </div>
        <div className="pokemon-stats">
          {pokemon.stats.map((statInfo, index) => (
            <p key={index} className="pokemon-stat">{statInfo.stat.name} : {statInfo.base_stat}</p>
          ))}
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
