import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProfileById } from '../../action/ProfileAction'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const Profile = (props) => {

    const dispatch = useDispatch();

    const profile = useSelector((state) => state.ProfileReducer.profile)
    const checkAuthenticated = useSelector((state) => state.AuthReducer.user._id)

    useEffect(() => {
        dispatch(getProfileById(props.match.params.id)) //important
    }, [getProfileById])

    return (
        <div>
            {profile === null ? <>Loading</> :
                <Link to='/profiles' className="btn btn-lignt">Back to profiles</Link>
            }
            {/* check if profile is not null, if so, check if the viewer sees his own profile and allow him to edit from there also */}
            {profile != null && checkAuthenticated === profile.user._id ?
                <Link to="/edit-profile" className="btn btn-dark"> Edit Profile </Link>
                : <h1>You can't edit profile</h1>
            }
        </div>
    )
}

export default Profile
