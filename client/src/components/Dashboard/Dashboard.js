import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { getCurrentProfile } from "../../action/ProfileAction";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentProfile())
    }, [])

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}

export default Dashboard
