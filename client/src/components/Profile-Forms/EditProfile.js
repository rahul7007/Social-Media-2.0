import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { createProfile, getCurrentProfile } from '../../action/ProfileAction'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { alert } from '../../action/AlertAction';

const EditProfile = (props) => {

    const dispatch = useDispatch();

    const Profile = useSelector((state) => state.ProfileReducer.profile)
    const Load = useSelector((state) => state.ProfileReducer.profileLoading)
    // console.log("Profile from edit profile", Profile)
    // console.log("Loading from edit profile", Load)

    // console.log("Profile", Profile)

    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    })

    const [displaySocialInputs, toggleSocialInputs] = useState(false)

    useEffect(() => {
        getCurrentProfile()

        setFormData({
            company: Profile.company,
            website: Profile.website,
            location: Profile.location,
            status: Profile.status,
            skills: Profile.skills,
            githubusername: Profile.githubusername,
            bio: Profile.bio,
            twitter: Profile.social.twitter,
            facebook: Profile.social.facebook,
            linkedin: Profile.social.linkedin,
            youtube: Profile.social.youtube,
            instagram: Profile.social.instagram
        })
    }, [])

    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData


    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createProfile(formData, props.history, true)) //don't know how how props is wokring here
    }

    return (
        <>
            <h1 className="large text-primary">
                Edit Your Profile
      </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
            <small>* = required field</small>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <select name="status" onChange={(e) => onChange(e)}>
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text"
                    >Give us an idea of where you are at in your career</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Company" name="company" onChange={(e) => onChange(e)} value={company} />
                    <small className="form-text"
                    >Could be your own company or one you work for</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Website" name="website" onChange={(e) => onChange(e)} value={website} />
                    <small className="form-text"
                    >Could be your own or a company website</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" onChange={(e) => onChange(e)} value={location} />
                    <small className="form-text"
                    >City & state suggested (eg. Boston, MA)</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Skills" name="skills" onChange={(e) => onChange(e)} value={skills} />
                    <small className="form-text"
                    >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
                    >
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Github Username"
                        name="githubusername"
                        onChange={(e) => onChange(e)}
                        value={githubusername}
                    />
                    <small className="form-text"
                    >If you want your latest repos and a Github link, include your
            username</small
                    >
                </div>
                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" name="bio" onChange={(e) => onChange(e)} value={bio}></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                    <button type="button" className="btn btn-light" onClick={() => toggleSocialInputs(!displaySocialInputs)}>
                        Add Social Network Links
          </button>
                    <span>Optional</span>
                </div>

                {displaySocialInputs && <>

                    <div className="form-group social-input">
                        <i className="fab fa-twitter fa-2x"></i>
                        <input type="text" placeholder="Twitter URL" name="twitter" onChange={(e) => onChange(e)} value={twitter} />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-facebook fa-2x"></i>
                        <input type="text" placeholder="Facebook URL" name="facebook" onChange={(e) => onChange(e)} value={facebook} />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-youtube fa-2x"></i>
                        <input type="text" placeholder="YouTube URL" name="youtube" onChange={(e) => onChange(e)} value={youtube} />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-linkedin fa-2x"></i>
                        <input type="text" placeholder="Linkedin URL" name="linkedin" onChange={(e) => onChange(e)} value={linkedin} />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-instagram fa-2x"></i>
                        <input type="text" placeholder="Instagram URL" name="instagram" onChange={(e) => onChange(e)} value={instagram} />
                    </div>


                </>}


                <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>

        </>
    )
}

export default withRouter(EditProfile)
