import { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Comment from './Comment';
import { orderByDatesDesc } from '../utils/dates';

import './CommentList.css';


function CommentList({ initialComments, handleCommentListUpdate }) {
    const orderedComments = orderByDatesDesc(initialComments);
    const [comments, setComments] = useState(orderedComments);

    const addComment = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        const newComment = {
            "message": formJson.postReply,
            "likes": 0,
            "dislikes": 0,
            "user": {
                "name": `User${Math.floor(Math.random() * 1000)}`,
                "id": uuidv4()
            },
            "date": new Date().toISOString(),
            "id": uuidv4(),
            "replies": []
        }
        const newCommentList = [
            newComment,
            ...comments,
        ]
        document.getElementById('add-comment-text-box').value = 

        setComments(newCommentList)
        handleCommentListUpdate(newCommentList)
    };

    const handleUpdatedComment = (comment) => {
        const commentsCopy = [...comments]
        for (var i = 0; i < commentsCopy.length; i++) {
            if (commentsCopy[i].id === comment.id) {
                commentsCopy[i] = comment
            }
        }
        setComments(commentsCopy)
        handleCommentListUpdate(commentsCopy)
    };

    return (
        <>
            <h4>Comments</h4>
            <div className='comment-list'>
                <form method='post' onSubmit={addComment} className='reply-form' id='post-reply-form'>
                    <textarea id='add-comment-text-box' name='postReply' placeholder=' Leave a comment' rows='3'></textarea>
                    <button className='commentButton' type='submit' data-toggle='reply-form' data-target='post-reply-form'>Submit</button>
                </form>
                {comments &&
                    comments.map((comment, index) => (
                        <Comment initialComment={comment} key={comment.id} index={index} handleCommentUpdate={handleUpdatedComment}/>
                ))}
            </div>
        </>
    );
}

CommentList.propTypes = {
    initialComments: PropTypes.array.isRequired,
    handleCommentListUpdate: PropTypes.func.isRequired
};

export default CommentList;
