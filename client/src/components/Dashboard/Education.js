import React from 'react'
import Moment from 'react-moment'
import { useDispatch } from "react-redux";
import { deleteEducation } from '../../action/ProfileAction'

const Education = (props) => {
    const dispatch = useDispatch();
    const educations = props.education.map((edu) => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td>
                <Moment format="DD/MM/YYYY">{edu.from}</Moment>-{edu.to === null ? ('Now') : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
            </td>
            <td>
                <button
                    onClick={() => dispatch(deleteEducation(edu._id))}
                    className="btn btn-danger"
                >
                    Delete
                </button>
            </td>
        </tr>
    ));

    return (
        <>
            <h2 className="my-2">Education Details</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>

        </>
    )
}

export default Education
