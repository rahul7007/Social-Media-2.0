import React from 'react'
import { useSelector } from "react-redux";

const Alert = () => {
    return (
        useSelector((state) => state.PostReducer && state.PostReducer.map((val) => {
            return (
                <div key={val.id} className={`alert alert-${val.alertType}`}>
                    {val.msg}
                </div>
            )
        })
        )
    )
}

export default Alert