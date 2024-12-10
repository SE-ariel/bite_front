import React from 'react';
import './PostContentField.css';

interface PostContentFieldProps {
    content: string;
    setContent: (content: string) => void;
}

const PostContentField: React.FC<PostContentFieldProps> = ({ content, setContent }) => {
    return (
        <div className="post-content-field">
            <label htmlFor="content">Recipe Content:</label>
            <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter ingredients and directions"
                className="content-textarea"
            ></textarea>
        </div>
    );
};

export default PostContentField;