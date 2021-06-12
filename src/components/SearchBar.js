import { useRef } from 'react';
import { useSearch } from '../SearchResultsContext';

//This is the component that handles the search bar
export default function SearchBar() {

    const searchValueRef = useRef();
    const search = useSearch();

    return (
        <div className="Search-Bar">
            <input type="text" ref={searchValueRef}>
            </input>
            <br />
            <button onClick={() => { search(searchValueRef.current.value) }}>
                Search
            </button>
        </div>
    );
}