import './App.css';
import ImportButton from './components/buttons/ImportButton';
import DBStatusIcon from './components/icons/DBStatusIcon';

export default function App() {
  return (
    <div className="App">
      <ImportButton />
      <DBStatusIcon />
    </div>
  );
}
