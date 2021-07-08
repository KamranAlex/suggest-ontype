import './App.css';
import AddTags from './components/AddTags';
import logo from './ooloi.webp';

function App() {
  return (
    <div className='App'>
      <div className='header'>
        <img src={logo} alt='' />
        <p>Suggest onType</p>
        <button onClick={() => window.location.reload(false)} className>
          Reload
        </button>
      </div>
      <AddTags />
    </div>
  );
}

export default App;
