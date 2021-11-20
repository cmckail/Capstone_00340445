import React, { useState, useRef, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Grid } from '@mui/material';
import authServices from "../services/auth.service";
import { isValidUser } from "../common/TokenCheck";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import VButton from "react-validation/build/button";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    setLoggedIn(isValidUser())
  }, [])

  useEffect(() => {
    if (loggedIn) {
      let user = JSON.parse(localStorage.getItem("user"));
      history.push(`/profile/${user.username}`);
    }
  }, [loggedIn])

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      let success = await authServices.login(username, password)
        .catch((err) => {
          if (err.response) {
            setMessage(err.response.data.message);
          }

        });
      setLoggedIn(isValidUser);
    }
  };

  return (
    <Grid container style={{ width: '100%' }}>
      <Grid item xs={10} style={{ padding: '50px' }}>

      </Grid>
      <Grid item xs={12} container style={{ justifyContent: 'center' }}>


        <Form onSubmit={handleLogin} ref={form} style={{ maxWidth: '80%' }}>
          <Grid container spacing={1}>
            <Grid item xs={10}>
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={onChangeUsername}
                validations={[required]}
              />
            </Grid>

            <Grid item xs={10}>
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
              />
            </Grid>

            <Grid item xs={12}>

            </Grid>
            <Grid item xs={10} style={{ textAlign: 'end' }}>
              <button className="btn btn-primary btn-block">
                Login
              </button>
            </Grid>

            {message && (
              <Grid item xs={12}>
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </Grid>
            )}
            <VButton style={{ display: "none" }} ref={checkBtn} />
          </Grid>
        </Form>
      </Grid>
    </Grid >
  );
};

export default Login;
