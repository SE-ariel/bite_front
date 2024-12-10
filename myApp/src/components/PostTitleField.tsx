import React from 'react';
import './PostTitleField.css';

interface PostTitleFieldProps {
    title: string;
    setTitle: (title: string) => void;
}

const PostTitleField: React.FC<PostTitleFieldProps> = ({ title, setTitle }) => {
    return (
        <div className="post-title-field">
            <label htmlFor="title">Recipe Title:</label>
            <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the recipe title"
                className="title-input"
            />
        </div>
    );
};

export default PostTitleField;

