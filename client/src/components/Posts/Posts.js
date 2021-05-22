// Parent component of all posts

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllPosts } from '../../action/PostAction'
import Spinner from '../Layout/Spinner'
import PostItem from './PostItem'
import Moment from 'react-moment'
import { addLike, removeLike, delPostById } from '../../action/PostAction'
import PostForm from './PostForm'

const Posts = () => {

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.PostReducerNew.posts);
    // console.log("POST->", posts)
    const postLoading = useSelector((state) => state.PostReducerNew.postLoading);

    const currentUser = useSelector((state) => state.AuthReducer.user._id); //60a727ab500408c480bdb658


    useEffect(() => {
        dispatch(getAllPosts())
    }, [getAllPosts])

    return (

        <>
            {postLoading ? <Spinner /> :
                <>
                    <h1 className="large text-primary">Posts</h1>
                    <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>
                    <PostForm />
                    {/* PostItem component */}
                    <div className="posts">
                        {posts.map((val) => (
                            // <PostItem key={val._id} post={val} />
                            <div key={val._id} className="post bg-white p-1 my-1">
                                <div>
                                    <Link to={`/profile/${val.user}`}>
                                        <img
                                            className="round-img"
                                            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                                            alt=""
                                        />
                                        <h4>{val.name}</h4>
                                    </Link>
                                </div>
                                <div>
                                    <p className="my-1">{val.text}</p>
                                    <p className="post-date">
                                        Posted on <Moment format="DD/MM/YYYY">{val.date}</Moment>
                                    </p>
                                    <button type="button" onClick={(e) => dispatch(addLike(val._id))} className="btn btn-light">
                                        <i className="fas fa-thumbs-up"></i>{' '}
                                        {val.likes.length > 0 && (<span>{val.likes.length}</span>)}

                                    </button>
                                    <button type="button" onClick={(e) => dispatch(removeLike(val._id))} className="btn btn-light">
                                        <i className="fas fa-thumbs-down"></i>
                                    </button>
                                    <Link to={`/post/${val._id}`} className="btn btn-primary">
                                        Discussion {val.comments.length > 0 && (<span className='comment-count'>{val.comments.length}</span>)}
                                    </Link>

                                    {/* del button will be only available if the post.user & user.id match  */}
                                    {val.user === currentUser && (
                                        < button type="button" onClick={e => dispatch(delPostById(val._id))} className="btn btn-danger">
                                            <i className="fas fa-times"></i>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            }
        </>
    )
}

export default Posts
