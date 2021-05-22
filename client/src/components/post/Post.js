import React, { useEffect } from 'react'
import Spinner from '../Layout/Spinner'
import { getSinglePost } from '../../action/PostAction'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

const Post = (props) => {

    const dispatch = useDispatch();

    const post = useSelector((state) => state.PostReducerNew.post);
    console.log("Post from Post compo", post)

    useEffect(() => {
        console.log("get sinfle post calling");
        dispatch(getSinglePost(props.match.params.id))
    }, [])
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
                <Link to="/posts">
                    Back to Posts
                    </Link>
            </div>
        </>
    )
}

export default Post
