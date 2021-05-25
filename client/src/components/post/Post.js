import React, { useEffect, useState } from 'react'
import Spinner from '../Layout/Spinner'
import { getSinglePost, addComment, delComment } from '../../action/PostAction'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

const Post = (props) => {

    const [text, setText] = useState('')

    const dispatch = useDispatch();

    const post = useSelector((state) => state.PostReducerNew.post);
    console.log("Post from Post compo", post)

    const currentUser = useSelector((state) => state.AuthReducer.user._id);

    useEffect(() => {
        console.log("get sinfle post calling");
        dispatch(getSinglePost(props.match.params.id))
    }, [])


    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(addComment(post._id, { text })) //since text is string by default, we need to pass it as object.
        setText('') //clear the form after submit
    }

    return (
        <>
            <div className="posts">
                {post !== null ?
                    <div className="post bg-white p-1 my-1">
                        <div>
                            <Link to={`/profile/${post.user}`}>
                                <img
                                    className="round-img"
                                    src={post.avatar}
                                    alt=""
                                />
                                <h4>{post.name}</h4>
                            </Link>
                        </div>
                        <div>
                            <p className="my-1">{post.text}</p>
                            <p className="post-date">
                                Posted on <Moment format="DD/MM/YYYY">{post.date}</Moment>
                            </p>
                        </div>
                    </div> : <h1>Loading discsuusion</h1>}



                <div className="post-form">
                    <div className="bg-primary p">
                        <h3>Leave A Comment</h3>
                    </div>
                    <form className="form my-1" onSubmit={onSubmit}>
                        <textarea
                            name="text"
                            cols="30"
                            rows="5"
                            placeholder="Comment on this post"
                            value={text}
                            onChange={e => setText(e.target.value)}
                            required
                        ></textarea>
                        <input type="submit" className="btn btn-dark my-1" value="Submit" />
                    </form>
                </div>

                {/* Display comments*/}
                <div className="comments">
                    {post !== null ? post.comments.map((val) => (
                        <>
                            <div class="post bg-white p-1 my-1">
                                <div>
                                    <Link to={`/profile/${post.user}`}>
                                        <img
                                            class="round-img"
                                            src={val.avatar}
                                            alt=""
                                        />
                                        <h4>{val.name}</h4>
                                    </Link>
                                </div>
                                <div>
                                    <p class="my-1">
                                        {val.text}
                                    </p>
                                    <p class="post-date">
                                        Posted on <Moment format="DD/MM/YYYY">{val.date}</Moment>
                                    </p>
                                    {val.user === currentUser && (
                                        < button type="button" onClick={e => dispatch(delComment(post._id, val._id))} className="btn btn-danger">
                                            <i className="fas fa-times"></i>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </>
                    )) : <h4> Loading </h4>}
                </div>








                <Link to="/posts">
                    Back to Posts
                    </Link>
            </div>
        </>
    )
}

export default Post
