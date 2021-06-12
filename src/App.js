import SearchBar from './components/SearchBar';
import SearchResultTable from './components/SearchResultTable';
import './App.css';
import { SearchResultsProvider } from './SearchResultsContext';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Hacker News Rest API
        </h1>
      </header>
      <div className="App-Body">
        <SearchResultsProvider>
          <SearchBar />
          <SearchResultTable />
        </SearchResultsProvider>
      </div>
    </div>
  );
}

export default App;