import React, { useEffect, useState } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import "./login.scss";
import AppService from "../../APIServices/AppAPI";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const initialValues = {
    usernameInput: "",
    passwordInput: "",
  };
  const [loginInput, setLoginInput] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [openEye, setOpenEye] = useState(false);
  const [somethingWentWrong, setSomethingWentWrong] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // resetError to initial State after 2 second
  useEffect(() => {
    if (Object.keys(formErrors).length > 0) {
      setTimeout(() => {
        setFormErrors({});
      }, 2000);
    }
  }, [formErrors]);

  useEffect(() => {
    if (somethingWentWrong) {
      setTimeout(() => {
        setSomethingWentWrong("");
      }, 2000);
    }
  }, [somethingWentWrong]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    console.log("currentUser", currentUser);
    if (currentUser) {
      dispatch(login(currentUser));
    }
  }, []);

  // Chaning input on onChange
  function handleChange(e) {
    const { name, value } = e.target;
    setLoginInput({ ...loginInput, [name]: value });
  }

  // Validating UserInput
  function validateFunc(values) {
    const errors = {};
    if (!values.usernameInput) {
      errors.usernameInput = "Username is required";
    }
    if (!values.passwordInput) {
      errors.passwordInput = "Password is required";
    }
    return errors;
  }

  // Handling Login
  async function handleLogin(e) {
    e.preventDefault();
    setFormErrors(validateFunc(loginInput));
    const token = await AppService.login(
      loginInput.usernameInput,
      loginInput.passwordInput
    );
    if (token == 404) {
      setSomethingWentWrong("Username or Password Wrong");
    }
    const userObj = {
      username: token.username,
      name: token.name,
      position: token.position,
    };
    window.localStorage.setItem("user", JSON.stringify(userObj));
    dispatch(login(userObj));
    navigate("/");
  }

  return (
    <div className="login">
      <div className="login_overlay"></div>
      <form onSubmit={handleLogin} autoComplete="off">
        <h2 className="login_header">Please Login </h2>
        <div
          className={
            formErrors.usernameInput ? "login_input error" : "login_input"
          }
        >
          <FaUserAstronaut className="login_icon" />
          <input
            type="text"
            name="usernameInput"
            placeholder="Username"
            onChange={handleChange}
            value={loginInput.usernameInput}
          />
          <p className="login_error">{formErrors.usernameInput}</p>
        </div>
        <div
          className={
            formErrors.passwordInput ? "login_input error" : "login_input"
          }
        >
          <RiLockPasswordLine className="login_icon" />
          <input
            type={openEye ? "text" : "password"}
            placeholder="Password"
            name="passwordInput"
            onChange={handleChange}
            value={loginInput.passwordInput}
          />
          {openEye ? (
            <AiFillEye
              className="login_icon eye"
              onClick={() => setOpenEye((prevState) => !prevState)}
            />
          ) : (
            <AiFillEyeInvisible
              className="login_icon eye"
              onClick={() => setOpenEye((prevState) => !prevState)}
            />
          )}
          <p className="login_error">{formErrors.passwordInput}</p>
        </div>
        <button>Login</button>
        <p
          className={
            somethingWentWrong
              ? "something_went_wrong_error active"
              : "something_went_wrong_error"
          }
        >
          {somethingWentWrong}
        </p>
      </form>
    </div>
  );
}

export default Login;
