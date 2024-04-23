import { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import { Time } from './Time';
import { v4 as uuidv4 } from 'uuid';
import { orderByDatesDesc } from '../utils/dates';

import './Comment.css';


function Comment({ initialComment, index, handleCommentUpdate }) {
    const [comment, setComment] = useState(initialComment);
    const { user, replies } = comment;
    const orderedReplies = orderByDatesDesc(replies);

    const handleUpvote = () => {
        const newComment = {
            ...comment,
            likes: comment.likes + 1
        }
        setComment(newComment)
        handleCommentUpdate(newComment)
    };

    const handleDownvote = () => {
        const newComment = {
            ...comment,
            dislikes: comment.dislikes + 1
        }
        setComment(newComment)
        handleCommentUpdate(newComment)
    };

    const handleReplyUpvote = (reply, index) => {
        replies[index] = {
            ...reply,
            likes: reply.likes + 1
        }
        const newComment = {
            ...comment,
            replies: orderByDatesDesc(replies)
        }
        setComment(newComment)
        handleCommentUpdate(newComment)
    };

    const handleReplyDownvote = (reply, index) => {
        const repliesCopy = [...replies];
        repliesCopy[index] = {
            ...reply,
            dislikes: reply.dislikes + 1
        }
        const newComment = {
            ...comment,
            replies: orderByDatesDesc(repliesCopy)
        }
        setComment(newComment)
        handleCommentUpdate(newComment)
    };

    const toggleReplyBox = (e) => {
        var target = e.target;
        const replyForm = document.getElementById(target.getAttribute("data-target"));
        replyForm.classList.toggle("d-none");
    };

    const addReplyToComment = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        const message = formJson.commentReply;
        if (!message) {
            alert("Reply cannot be blank");
            return
        }

        const newReply = {
            "message": message,
            "likes": 0,
            "dislikes": 0,
            "user": {
                "name": `User${Math.floor(Math.random() * 1000)}`,
                "id": uuidv4()
            },
            "date": new Date().toISOString(),
            "id": uuidv4()
        }

        const newComment = {
            ...comment,
            replies: orderByDatesDesc([newReply, ...replies])
        }
        document.getElementById('add-reply-text-box').value = ''

        setComment(newComment)
        handleCommentUpdate(newComment)
    };

    return (
        <details open className='comment' id={`comment-${index+1}`}>
            <a href={`#comment-${index+1}`} className='comment-border-link'>
                <span className='sr-only'>Jump to comment-1</span>
            </a>
            <summary>
                <div className='comment-heading'>
                    <div className='comment-voting'>
                        <Avatar avatar={"/assets/images/user_icon.jpg"}/>
                    </div>
                    <div className='comment-info'>
                        <button type='button' className='link-button'>{user.name}</button>
                        &nbsp;
                        &bull;
                        &nbsp;
                        <Time time={comment.date}/>
                    </div>
                </div>
            </summary>

            <div className='comment-body'>
                <p>
                    {comment.message}
                </p>
                <button type='button' className='buttonClass' onClick={handleUpvote}>
                    <i className="fa-regular fa-thumbs-up"/>
                    {' '}
                    {comment.likes}
                </button>
                &nbsp; &nbsp;
                <button type='button' className='buttonClass' onClick={handleDownvote}>
                    <i className="fa-regular fa-thumbs-down"/>
                    {' '}
                    {comment.dislikes}
                </button>
                &nbsp; &nbsp;
                <button type='button' className='buttonClass' onClick={toggleReplyBox} data-toggle='reply-form' data-target={`comment-${index+1}-reply-form`}>Reply</button>
                <form method='post' onSubmit={addReplyToComment} className='reply-form d-none' id={`comment-${index+1}-reply-form`}>
                    <textarea id='add-reply-text-box' name='commentReply' placeholder=' Reply to comment' rows='4'></textarea>
                    <button type='submit' className='buttonClass' onClick={toggleReplyBox} data-toggle='reply-form' data-target={`comment-${index+1}-reply-form`}>Submit</button>
                    {' '}
                    <button type='button' className='buttonClass' onClick={toggleReplyBox} data-toggle='reply-form' data-target={`comment-${index+1}-reply-form`}>Cancel</button>
                </form>
            </div>

            <div className='replies'>
                {orderedReplies &&
                    orderedReplies.map((reply, replyIndex) => (
                        <details open className='comment-reply' key={reply.id} id={`comment-${index+1}-reply-${replyIndex+1}`}>
                            <a href={`#comment-${index+1}-reply-${replyIndex+1}`} className='comment-border-link'>
                                <span className='sr-only'>Jump to comment-2</span>
                            </a>
                            <summary>
                                <div className='comment-heading'>
                                    <div className='comment-voting'>
                                        <Avatar avatar={"/assets/images/user_icon.jpg"}/>
                                    </div>
                                    <div className='comment-info'>
                                        <button type='button' className='link-button'>{reply.user.name}</button>
                                        &nbsp;
                                        &bull;
                                        &nbsp;
                                        <Time time={reply.date}/>
                                    </div>
                                </div>
                            </summary>
                            <div className='comment-body'>
                                <p>
                                    {reply.message}
                                </p>
                                <button type='button' className='buttonClass' onClick={() => handleReplyUpvote(reply, replyIndex)}>
                                    <i className="fa-regular fa-thumbs-up"/>
                                    {' '}
                                    {reply.likes}
                                </button>
                                &nbsp; &nbsp;
                                <button type='button' className='buttonClass' onClick={() => handleReplyDownvote(reply, replyIndex)}>
                                    <i className="fa-regular fa-thumbs-down"/>
                                    {' '}
                                    {reply.dislikes}
                                </button>
                            </div>
                        </details>
                ))}
            </div>
        </details>
    );
}

Comment.propTypes = {
    initialComment: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    handleCommentUpdate: PropTypes.func.isRequired
};

export default Comment;
