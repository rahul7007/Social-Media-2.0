// Parent component of all posts

import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllPosts } from '../../action/PostAction'

const Posts = () => {

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.PostReducerNew.posts);
    console.log("POST 1", posts)

    // const postLoading = useSelector((state) => state.PostReducerNew.postLoading);

    // console.log("POST 1", posts)
    // console.log("POST 2", postLoading)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [getAllPosts])

    return (

        <>
            posts
        </>
    )
}

export default Posts
