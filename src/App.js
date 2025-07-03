import logo from './logo.svg';
import './App.css';
import PokemonList from './PokemonList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <PokemonList />
    </div>
  );
}

export default App;
