import React from 'react';
import { useRemovePost } from '../SearchResultsContext';

export default function Post({ post }) {

    const removePost = useRemovePost();

    return (
        <tr>
            <td>{post.id}</td>
            <td>{post.author}</td>
            <td>{post.comments}</td>
            <td>{post.title}</td>
            <td className="URL-Col">{post.url}</td>
            <td>
                <button onClick={() => removePost(post)}>Delete</button>
            </td>
        </tr>
    );
}