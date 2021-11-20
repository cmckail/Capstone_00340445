import React, { useState, useRef } from "react";
import { useHistory } from 'react-router'
import { Grid, Avatar, Paper, Container } from '@mui/material';
import {
    validatePostalCode,
    validateUsername,
    validatePassword,
    validateEmail,
    isRequired,
    validateMobilePhone
} from '../common/Validators';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Button from "react-validation/build/button";
import authServices from "../services/auth.service";


const Register = () => {
    const form = useRef();
    const checkBtn = useRef();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [province, setProvince] = useState("ON");
    const [postal_code, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [appt_number, setApptNumber] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [role, setRole] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isPhotoPicked, setIsPhotoPicked] = useState(false);
    const [photoPreview, setPhotoPreview] = useState();
    const [photoValid, setPhotoValid] = useState(true);
    const [photoValidText, setPhotoValidText] = useState("Tester");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        setUsername(e.target.value.replace(/\s/g, ''));
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value.replace(/\s/g, ''));
    };

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const onChangeLastName = (e) => {
        setLastName(e.target.value);
    };

    const onChangeAddress = (e) => {
        setAddress(e.target.value);
    };

    const onChangeProvince = (e) => {
        setProvince(e.target.value);
    };

    const onChangePostalCode = (e) => {
        let postal = e.target.value
        if (typeof e.target.value === 'string') {
            postal = postal.toUpperCase().trim()
        }
        setPostalCode(postal);
    };

    const onChangeRole = (e) => {
        setRole(e.target.value)
    }

    const onChangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
    }

    const onChangeCity = (e) => {
        setCity(e.target.value)
    }

    const onChangeApptNumber = (e) => {
        setApptNumber(e.target.value)
    }

    const history = useHistory();

    const changeHandler = (event) => {
        const photo = event.target.files[0];
        if (Boolean(!photo.type.includes("image/"))) {
            setPhotoValid(false);
            setPhotoValidText('File must be an Image');
        } else if (photo.size > 31457280) {
            setPhotoValid(false);
            setPhotoValidText('Photo must be less then 30MB.');
        } else {
            setPhotoValid(true);
            setSelectedFile(photo);
            setPhotoPreview(URL.createObjectURL(event.target.files[0]))
            setIsPhotoPicked(true);
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();

        setSuccessful(false);
        setMessage("");
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0 && photoValid) {
            authServices.register({ username, email, password, first_name, last_name, address, city, province, postal_code, appt_number, role, phone_number, selectedFile })
                .then((resp) => {
                    history.push('/login')
                })
                .catch((error) => {
                    if (error.response && error.response.data.message) {
                        setMessage(error.response.data.message)
                    } else {
                        setMessage('Unknown error occurred, Please Contact Support')
                    }
                }
                )
        } else {
            console.log('error');
        }
    };

    return (
        <Container >
            <Paper elevation={3} sx={{ padding: '20px', width: "70%", margin: 'auto', marginTop: '20px' }}>
                <Form onSubmit={handleRegister} ref={form}>
                    {!successful && (
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Avatar sx={{ margin: 'auto', width: '125px', height: '125px' }} src={photoPreview || "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"} />
                                <label htmlFor="file">Avatar</label>
                                <input className="form-control" type="file" name="file" accept="image/*" onChange={changeHandler} />
                                {isPhotoPicked && !photoValid && (
                                    (
                                        <div className="alert alert-danger" role="alert">
                                            {photoValidText}
                                        </div>
                                    )
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <label htmlFor="role">Do you want to be a Tadoo Merchant?</label>
                                <select name='role'
                                    onChange={onChangeRole}
                                    value={role}
                                    className='form-control'
                                    style={{ width: '100%' }}
                                >
                                    <option value={false}>No, I'm a Customer</option>
                                    <option value={true}>Yes, I'm a Tattoo Artist</option>
                                </select>
                            </Grid>
                            <Grid item xs={12}>
                                <label htmlFor="username">Username</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={username}
                                    onChange={onChangeUsername}
                                    validations={[isRequired, validateUsername]}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <label htmlFor="password">Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[isRequired, validatePassword]}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    validations={[isRequired, validateEmail]}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <label htmlFor="first_name">First Name</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="first_name"
                                    value={first_name}
                                    onChange={onChangeFirstName}
                                    validations={[isRequired]}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <label htmlFor="last_name">Last Name</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="last_name"
                                    value={last_name}
                                    onChange={onChangeLastName}
                                    validations={[isRequired]}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <label htmlFor="city">City</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="city"
                                    value={city}
                                    onChange={onChangeCity}
                                    validations={[isRequired]}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label htmlFor="postal_code">Postal Code</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="postal_code"
                                    value={postal_code}
                                    onChange={onChangePostalCode}
                                    validations={[isRequired, validatePostalCode]}
                                />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <label htmlFor="province">Province</label>
                                <select name='province'
                                    onChange={onChangeProvince}
                                    value={province}
                                    className="form-control"
                                >
                                    <option value={""}></option>
                                    <option value={"ON"}>ON</option>
                                    <option value={"QC"}>QC</option>
                                    <option value={"NB"}>NB</option>
                                    <option value={"MB"}>MB</option>
                                    <option value={"BC"}>BC</option>
                                    <option value={"PE"}>PE</option>
                                    <option value={"SK"}>SK</option>
                                    <option value={"AB"}>AB</option>
                                    <option value={"NL"}>NL</option>
                                </select>
                            </Grid>
                            <Grid item xs={12} md={10}>
                                <label htmlFor="address">Address</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    value={address}
                                    onChange={onChangeAddress}
                                    validations={[isRequired]}
                                />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <label htmlFor="appt">Appt</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="postal_code"
                                    value={appt_number}
                                    onChange={onChangeApptNumber}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <label htmlFor="phone_number">Phone Number</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="string"
                                    value={phone_number}
                                    onChange={onChangePhoneNumber}
                                    validations={[isRequired, validateMobilePhone]}
                                />
                            </Grid>

                            <Grid item xs={12} style={{ textAlign: 'right' }}>
                                <button className="btn btn-primary btn-block">Sign Up</button>
                            </Grid>
                        </Grid>
                    )}

                    {message && (
                        <div className="form-group">
                            <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <Button style={{ display: "none" }} ref={checkBtn} />

                </Form>
            </Paper>

        </Container>
    );
};

export default Register;
