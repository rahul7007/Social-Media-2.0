import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import api from "../../api";

//redux
import { useDispatch } from "react-redux";
import { loginUser } from "../../action/AuthAction";
import { useSelector } from "react-redux";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { email, password } = formData;

  const isAuthenticated = useSelector(
    (state) => state.AuthReducer.isAuthenticated
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); ////purpose of ...formdata
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const User = {
      email,
      password,
    };

    try {
      // await api.login(User).then((res) => {
      //   console.log(res);
      // });
      dispatch(loginUser(User));
    } catch (err) {
      console.log(err);
    }
  };

  // Redirect to dashboard if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign in Your Account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={handleChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </>
  );
};

export default Login;
