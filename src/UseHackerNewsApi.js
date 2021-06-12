import { useEffect, useState } from "react/cjs/react.development";


export function useHackerNewsApi() {
    //This Hook will only fetch the data by page and return all of it
    const [pageNumber, setPageNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [posts, setPosts] = useState([]);

    //Through this function components can trigger the hook to get data from the Api
    function updateSearchAndPageNumber(term, pageNumber) {
        setPageNumber(pageNumber);
        setSearchTerm(term);
    }

    useEffect(() => {
        async function getPosts() {
            //Currently this will fetch 10 results at a time
            fetch("http://hn.algolia.com/api/v1/search?hitsPerPage=10&query=" + searchTerm + "&page=" + pageNumber)
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    throw res;
                }).then((json) => {
                    //json is mapped into an array of objects
                    return json['hits'].map(item => {
                        return {
                            id: item.objectID,
                            author: item.author,
                            comments: item.num_comments,
                            title: item.title,
                            url: item.url
                        }
                    })
                }).then((data) => {
                    setPosts(data);
                })
                .catch(err => {
                    console.error("There was an error", err);
                });
        }
        if (searchTerm.length > 0) {
            getPosts();
        }
    }, [searchTerm, pageNumber]);

    return [posts, updateSearchAndPageNumber];

}