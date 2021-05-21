import React, { useEffect } from 'react'
import { getAllProfiles } from '../../action/ProfileAction'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ProfileItem from './ProfileItem'
import { Link } from 'react-router-dom'

const Profiles = () => {
    const dispatch = useDispatch();

    const AllProfiles = useSelector((state) => state.ProfileReducer.profiles)
    const Loading = useSelector((state) => state.ProfileReducer.profileLoading)

    useEffect(() => {
        dispatch(getAllProfiles())
    }, [])

    return (
        <>
            {Loading ? <> <h1>Dpinner</h1> </> :
                <>
                    <h1 className="large text-primary">Developers</h1>
                    <p className="lead">
                        Browse and connect with developers
                    </p>
                    <div className="profiles">

                        {AllProfiles.length > 0 ?
                            AllProfiles.map((val) => (
                                < div key={val._id} className='profile bg-light' >
                                    <img src={val.user.avatar} alt='' className='round-img' />
                                    <div>
                                        <h2>{val.user.name}</h2>
                                        <p>{val.status} {val.company && <span> at {val.company}</span>}</p>
                                        <p className='my-1'>{val.location && <span>{val.location}</span>}</p>
                                        <Link to={`/profile/${val.user._id}`} className='btn btn-primary'>
                                            View Profile
                                        </Link>
                                    </div>
                                    <ul>
                                        {val.skills.slice(0, 4).map((skill, index) => (
                                            <li key={index} className='text-primary'>
                                                <i className='fas fa-check' /> {skill}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                // <ProfileItem key={val._id} profile={val} /> //having problem with ProfileItem props
                            ))
                            :
                            <h4>No profiles found</h4>
                        }
                    </div>
                </>}
        </>
    )
}

export default Profiles
