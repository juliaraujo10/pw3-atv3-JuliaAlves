import './App.css';
import GetResource from './components/GetResource';
import ListResources from './components/ListResource';
import CreateResource from './components/CreateResouce';

function App() {

  return (
    <div className="App">
      <GetResource />
      <ListResources />
      <CreateResource />
    </div>
  );
}

export default App;
