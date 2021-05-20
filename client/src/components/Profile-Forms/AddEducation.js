import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { addEducation } from '../../action/ProfileAction'
import { useDispatch } from "react-redux";


const AddEducation = (props) => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false)

    const { school, degree, fieldofstudy, from, to, description, current } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(addEducation(formData, props.history))
    }

    return (
        <>
            <h1 className="large text-primary">Add Education</h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
            <small>* = required field</small>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="* School or Bootcamp" name="school" value={school}
                        onChange={onChange} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Degree or Certificate" name="degree" value={degree}
                        onChange={onChange} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Field of Study" name="fieldofstudy" value={fieldofstudy}
                        onChange={onChange} />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from}
                        onChange={onChange} />
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" checked={current} value={current}
                        onChange={() => {
                            setFormData({ ...formData, current: !current });
                            toggleDisabled(!toDateDisabled)
                        }} /> Current Job</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to}
                        onChange={onChange} disabled={toDateDisabled ? 'disabled' : ''} />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Program Description"
                        value={description}
                        onChange={onChange}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </>
    )
}

export default withRouter(AddEducation)
