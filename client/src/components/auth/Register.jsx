import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

//redux
import { alert } from "../../action/AlertAction";
import { useDispatch } from "react-redux";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const dispatch = useDispatch();

  const { name, email, passwordConfirm, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); ////purpose of ...formdata
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      dispatch(alert("Password donot match", "danger"));
    } else {
      //   console.log(formData);
      const newUser = {
        name,
        email,
        password,
      };

      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        await api.register(newUser).then((res) => {
          console.log(res);
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="passwordConfirm"
            minLength="6"
            value={passwordConfirm}
            onChange={handleChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  );
};

export default Register;
