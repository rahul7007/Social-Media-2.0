import React from 'react'
import { Link } from 'react-router-dom'

//redux
import { useDispatch } from "react-redux";
import { logoutUser } from "../../action/AuthAction";
import { useSelector } from "react-redux";

const Navbar = () => {
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(
        (state) => state.AuthReducer.isAuthenticated
    );

    const AuthLinkes = () => {
        return (
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li>
                    <a onClick={() => dispatch(logoutUser())} href="#!">
                        <i className="fas fa-sign-out-alt"></i>
                        <span className="hide-sm">Logout</span>
                    </a>
                </li>
            </ul >
        )
    }

    const GuestLinks = () => {
        return (
            <ul>
                <li><Link to="/">Developers</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul >
        )
    }





    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            {isAuthenticated ? <AuthLinkes /> : <GuestLinks />}
        </nav>
    )
}

export default Navbar
