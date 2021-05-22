import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProfileById } from '../../action/ProfileAction'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import ProfileTop from './ProfileTop'
import Moment from 'react-moment'

const Profile = (props) => {

    const dispatch = useDispatch();

    const profile = useSelector((state) => state.ProfileReducer.profile)
    const checkAuthenticated = useSelector((state) => state.AuthReducer.user._id)

    useEffect(() => {
        dispatch(getProfileById(props.match.params.id)) //important
    }, [getProfileById])

    return (
        <>
            {profile === null ? <>Loading</> :
                <Link to='/profiles' className="btn btn-lignt">Back to profiles</Link>
            }
            {/* check if profile is not null, if so, check if the viewer sees his own profile and allow him to edit from there also */}
            {profile != null && checkAuthenticated === profile.user._id ?
                <Link to="/edit-profile" className="btn btn-dark"> Edit Profile </Link>
                :
                <>
                    <div className="profile-grid my-1">
                        {/* <ProfileTop /> */}
                        {profile != null ?
                            <>
                                {/* Profile top part */}

                                <div className="profile-top bg-primary p-2">
                                    <img
                                        className="round-img my-1"
                                        src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                                        alt=""
                                    />
                                    <h1 className="large">{profile.user.name}</h1>
                                    <p className="lead">{profile.status} {profile.company && <span>at {profile.company}</span>}</p>
                                    <p>{profile.location && <span> {profile.location}</span>}</p>
                                    <div className="icons my-1">
                                        {profile.website && (
                                            <a href={profile.website} target="_blank" rel="noopener noreferrer">
                                                <i className="fas fa-globe fa-2x" />
                                            W
                                            </a>
                                        )}

                                        {profile.social && profile.social.twitter && (
                                            <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer">
                                                <i className="fab fa-twitter fa-2x"></i>
                                            T
                                            </a>
                                        )}

                                        {profile.social && profile.social.facebook && (
                                            <a href={profile.social.facebook} target="_blank" rel="noopener noreferrer">
                                                <i className="fab fa-facebook fa-2x"></i>
                                            F
                                            </a>
                                        )}

                                        {profile.social && profile.social.linkedin && (
                                            <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer">
                                                <i className="fab fa-linkedin fa-2x"></i>
                                            L
                                            </a>
                                        )}

                                        {profile.social && profile.social.youtube && (
                                            <a href={profile.social.youtube} target="_blank" rel="noopener noreferrer">
                                                <i className="fab fa-youtube fa-2x"></i>
                                            Y
                                            </a>
                                        )}

                                        {profile.social && profile.social.instagram && (
                                            <a href={profile.social.instagram} target="_blank" rel="noopener noreferrer">
                                                <i className="fab fa-instagram fa-2x"></i>
                                            I
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Profile About */}


                                <div className="profile-about bg-light p-2">
                                    {profile.bio && (
                                        <>
                                            <h2 className="text-primary">{profile.user.name}'s Bio</h2>
                                            <p>{profile.bio}</p>
                                        </>
                                    )}
                                    <div className="line"></div>
                                    <h2 className="text-primary">Skill Set</h2>
                                    <div className="skills">
                                        <div className="p-1"><i class="fa fa-check"></i> {profile.skills}</div>
                                        {/* <div class="p-1"><i class="fa fa-check"></i> CSS</div>
                                        <div class="p-1"><i class="fa fa-check"></i> JavaScript</div>
                                        <div class="p-1"><i class="fa fa-check"></i> Python</div>
                                        <div class="p-1"><i class="fa fa-check"></i> C#</div> */}
                                    </div>
                                </div>

                                {/* Experience */}
                                {profile.experience.length > 0 ? (<>
                                    <div className="profile-exp bg-white p-2">
                                        <h2 className="text-primary">Experience</h2>

                                        {profile.experience.map((val) => (
                                            <div>
                                                <h3 className="text-dark">{val.company}</h3>
                                                <p>
                                                    <Moment format="DD/MM/YYYY">{val.from}</Moment> -
                                                    {!val.to ? 'Now' : <Moment format="DD/MM/YYYY">{val.to}</Moment>}
                                                </p>
                                                <p><strong>Position:</strong>{val.title}</p>
                                                <p>
                                                    <strong>Description: </strong>{val.description}

                                                </p>
                                            </div>
                                        ))}

                                    </div>
                                </>
                                ) : <h4>No Experience</h4>}

                                {/* Education */}
                                {profile.education.length > 0 ? (<>
                                    <div class="profile-edu bg-white p-2">
                                        <h2 class="text-primary">Education</h2>

                                        {profile.education.map((val) => (
                                            <div>
                                                <h3 className="text-dark">{val.school}</h3>
                                                <p>
                                                    <Moment format="DD/MM/YYYY">{val.from}</Moment> -
                                                    {!val.to ? 'Now' : <Moment format="DD/MM/YYYY">{val.to}</Moment>}
                                                </p>
                                                <p><strong>Degree:</strong>{val.degree}</p>
                                                <p>
                                                    <strong>Field Of Study: </strong>{val.fieldofstudy}
                                                </p>
                                                <p>
                                                    <strong>Description: </strong>{val.description}
                                                </p>
                                            </div>
                                        ))}

                                    </div>
                                </>
                                ) : <h4>No Experience</h4>}
                            </>
                            : <><h4>Loading</h4></>
                        }
                    </div>
                </>
            }
        </>
    )
}

export default Profile
