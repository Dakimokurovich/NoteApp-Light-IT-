import React from 'react';
import './app-header.css';

const AppHeader = ({allPost, important}) => {
    return (
        <div className="app-header d-flex">
            <h1>NotesApp</h1>
            <h2>{`Notes: ${allPost} | Important notes: ${important}`}</h2>
        </div>
    );
};

export default AppHeader;