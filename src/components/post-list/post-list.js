import React from 'react';
import PostListItem from '../post-list-item';
import './post-list.css';

const PostList = ({posts, onDelete, onToggleImportant, onEdit, onChangeLabel, setColor}) => {

    const elements = posts.map((post) =>{
        const {...postProps} = post;
        
        return (
            <li key={post.id} className="list-group">
                <PostListItem {...postProps} onDelete={() => onDelete(post.id)}
                              onToggleImportant={() => onToggleImportant(post.id)}
                              onEdit={() => onEdit(post.id)}
                              onChangeLabel={onChangeLabel}
                              setColor={setColor}/>
            </li>
        )
    });

    return (
        <ul className="app-list">
            {elements}
        </ul>
    );
};

export default PostList;