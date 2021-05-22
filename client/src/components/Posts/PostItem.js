import React from 'react'
import Moment from 'react-moment'
import { useSelector } from "react-redux";

const PostItem = () => {

    const { allPosts } = useSelector((state) => state.PostReducerNew)
    console.log(allPosts)

    const postId = useSelector((state) => state.PostReducerNew.posts[0]._id);
    const text = useSelector((state) => state.PostReducerNew.posts.text);
    const name = useSelector((state) => state.PostReducerNew.posts.name);
    const avatar = useSelector((state) => state.PostReducerNew.posts.avatar);
    const user = useSelector((state) => state.PostReducerNew.posts.user);
    const likes = useSelector((state) => state.PostReducerNew.posts.likes);
    const comments = useSelector((state) => state.PostReducerNew.posts.comments);
    const date = useSelector((state) => state.PostReducerNew.posts.date);
    console.log(postId)
    return (
        <div>
            POSTITEM
        </div>
    )
}

export default PostItem
