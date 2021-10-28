import ImportButton from './components/buttons/ImportButton';
import DBStatusIcon from './components/icons/DBStatusIcon';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <DBStatusIcon />
      <ImportButton />
    </div>
  );
}
