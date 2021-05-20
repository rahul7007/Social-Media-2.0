import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { getCurrentProfile } from "../../action/ProfileAction";
import { useSelector } from "react-redux";
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'

const Dashboard = () => {
    const dispatch = useDispatch();

    const Name = useSelector((state) => state.AuthReducer.user.name)
    const Profile = useSelector((state) => state.ProfileReducer.profile)

    useEffect(() => {
        dispatch(getCurrentProfile())
    }, [])

    return (
        <div>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user" /> Welcome {Name}
            </p>
            {Profile !== null ? <>

                {/* Once the user has profile, he/she can update it */}

                <DashboardActions />
                <Experience experience={Profile.experience} />
                <Education education={Profile.education} />

            </> :
                <>
                    You have not setup profile yet, please put some info
                    <Link to='/create-profile' className="btn btn-primary my-1">Create Profile</Link>
                </>

            }
        </div>
    )
}

export default Dashboard
