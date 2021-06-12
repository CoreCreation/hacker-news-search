import React from 'react';
import { useContext, useEffect, useState } from 'react/cjs/react.development';
import { useHackerNewsApi } from './UseHackerNewsApi';

const SearchContext = React.createContext();
const SearchResultsContext = React.createContext();
const MoreResultsContext = React.createContext();
const RemovePostContext = React.createContext();

export function useSearch() {
    return useContext(SearchContext);
}

export function useSearchResults() {
    return useContext(SearchResultsContext);
}

export function useMoreResults() {
    return useContext(MoreResultsContext);
}

export function useRemovePost() {
    return useContext(RemovePostContext);
}

//This will manage the search results in order to show them as intended to the user
export function SearchResultsProvider({ children }) {
    //The API needs page numbers in order to get more than one page
    const [pageCount, setPageCount] = useState(0);
    //The API needs a search term
    const [searchTerm, setSearchTerm] = useState("");
    //These are the posts that are currently displayed on screen
    const [posts, setPosts] = useState([]);

    //This hook will manage the data fetching
    //fetchData(term, pageNumber) will get data from the API and put it into data
    const [data, fetchData] = useHackerNewsApi();

    //When the data changes, it needs to be put into the shown posts
    useEffect(() => {
        setPosts(prevPosts => [...prevPosts, ...data]);
    }, [data]);

    //When the user wants more results fetch more data and advance the page count
    function getMoreResults() {
        if (searchTerm.length > 0) {
            fetchData(searchTerm, pageCount + 1);
            setPageCount(prevCount => prevCount + 1);
        }
    }

    //When a user deletes a post, iterate through and delete it from posts
    function removePost(postToRemove) {
        setPosts(prevPosts => {
            //I am not convinced that this is the most performant way to do this
            return prevPosts.filter(item => item !== postToRemove);
        });
    }

    //When a UI element wants to change search for something, it sends the term
    function search(term) {
        //since we are searching for a new term, we need to empty the existent data
        setSearchTerm(term);
        setPageCount(0);
        setPosts([]);
        //Don't fetch empty an empty search
        if (term.length > 0) {
            fetchData(term, 0);
        }
    }

    return (
        <SearchContext.Provider value={search}>
            <SearchResultsContext.Provider value={posts}>
                <RemovePostContext.Provider value={removePost}>
                    <MoreResultsContext.Provider value={getMoreResults}>
                        {children}
                    </MoreResultsContext.Provider>
                </RemovePostContext.Provider>
            </SearchResultsContext.Provider>
        </SearchContext.Provider>
    )
}