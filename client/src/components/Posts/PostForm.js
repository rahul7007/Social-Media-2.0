import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { addPost } from '../../action/PostAction'

const PostForm = () => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(addPost({ text })) //since text is string by default, we need to pass it as object.
        setText('') //clear the form after submit
    }

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Say Something...</h3>
            </div>
            <form className="form my-1" onSubmit={onSubmit}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Create a post"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

export default PostForm
