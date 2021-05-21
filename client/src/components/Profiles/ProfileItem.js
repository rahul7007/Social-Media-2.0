import React from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'

const ProfileItem = () => {

    const pro = useSelector((state) => state.ProfileReducer.profiles)
    console.log("pro-->>>", pro)

    // const avatar = useSelector((state) => state.ProfileReducer.profiles.user.avatar)
    const name = useSelector((state) => state.ProfileReducer.profiles[0].user.name)
    const status = useSelector((state) => state.ProfileReducer.profiles[0].status)
    const company = useSelector((state) => state.ProfileReducer.profiles[0].company)
    const location = useSelector((state) => state.ProfileReducer.profiles[0].location)

    return (
        <div className='profile bg-light'>
            {/* <img src={avatar} alt='' className='round-img' /> */}
            <div>
                <h2>{name}</h2>
                <p>
                    {status} {company && <span> at {company}</span>}
                </p>
                <p className='my-1'>{location && <span>{location}</span>}</p>
                {/* <Link to={`/profile/${_id}`} className='btn btn-primary'>
                    View Profile
          </Link> */}
            </div>
            {/* <ul>
                {skills.slice(0, 4).map((skill, index) => (
                    <li key={index} className='text-primary'>
                        <i className='fas fa-check' /> {skill}
                    </li>
                ))}
            </ul> */}
        </div>
    )
}

export default ProfileItem
