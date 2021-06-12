//This is the component that holds 
//the table header and the search results
import { useSearchResults, useMoreResults } from "../SearchResultsContext";
import Post from './Post';

export default function SearchResultTable() {

    const posts = useSearchResults();
    const getMoreResults = useMoreResults();

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Author</th>
                        <th>Comments</th>
                        <th>Title</th>
                        <th>URL</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        posts.map((post) => {
                            return (<Post key={post.id} post={post} />);
                        })
                    }
                </tbody>
            </table >
            { posts.length > 0 && <div className="LoadMore-Button"><button onClick={() => getMoreResults()}>Load more</button></div>}
        </div>
    );
}
