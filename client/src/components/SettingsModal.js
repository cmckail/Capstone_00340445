import React, { useEffect, useState, useRef } from 'react';
import Input from "react-validation/build/input";
import { Modal, Button, Box, Grid, Avatar } from '@mui/material';
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Textarea from "react-validation/build/textarea";
import userService from '../services/user.service';
import { isPostalCode, isMobilePhone } from 'validator';
import {
  validatePostalCode,
  validateMobilePhone,
  isRequired,
  charLimit
} from '../common/Validators';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  maxHeight: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'scroll',
};

export default function SettingsModal({ currentInfo, profilePic, updateToast }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const form = useRef();
  const checkBtn = useRef();
  const [first_name, setFirstName] = useState(currentInfo.first_name);
  const [last_name, setLastName] = useState(currentInfo.last_name);
  const [address, setAddress] = useState(currentInfo.address);
  const [province, setProvince] = useState(currentInfo.province);
  const [postal_code, setPostalCode] = useState(currentInfo.postal_code);
  const [city, setCity] = useState(currentInfo.city);
  const [appt_number, setApptNumber] = useState(currentInfo.appt_number);
  const [phone_number, setPhoneNumber] = useState(currentInfo.phone_number);
  const [selectedFile, setSelectedFile] = useState();
  const [isPhotoPicked, setIsPhotoPicked] = useState(false);
  const [photoPreview, setPhotoPreview] = useState();
  const [photoValid, setPhotoValid] = useState(false);
  const [photoValidText, setPhotoValidText] = useState();
  //Merchant
  const [appointment_policy, setAppointmentPolicy,] = useState(currentInfo.appointment_policy);
  const [bio, setBio] = useState(currentInfo.bio);

  const onChangePhoto = (event) => {
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
  const onChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value)
  }

  const onChangeCity = (e) => {
    setCity(e.target.value)
  }

  const onChangeApptNumber = (e) => {
    setApptNumber(e.target.value)
  }

  const onChangeBio = (e) => {
    setBio(e.target.value)
  }

  const onChangeAppointmentPolicy = (e) => {
    setAppointmentPolicy(e.target.value)
  }

  const handleUpdateUser = (e) => {
    e.preventDefault();

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0 && (photoValid || !isPhotoPicked)) {
      userService.updateUserInfo({ first_name, last_name, address, city, province, postal_code, appt_number, phone_number, bio, appointment_policy, selectedFile })
        .then(() => {
          updateToast("success", "Profile Info Updated");
          setOpen(false);
        })
        .catch(() => {
          updateToast("error", "Error Updating Profile");
          setOpen(false);
        });
    }
  };

  useEffect(() => {
    setFirstName(currentInfo.first_name);
    setLastName(currentInfo.last_name);
    setAddress(currentInfo.address);
    setProvince(currentInfo.province);
    setPostalCode(currentInfo.postal_code);
    setPhoneNumber(currentInfo.phone_number || "");
    setCity(currentInfo.city);
    setApptNumber(currentInfo.appt_number || "");
    setBio(currentInfo.bio || "");
    setAppointmentPolicy(currentInfo.appointment_policy || "");
  }, [open, currentInfo])


  return (
    <div>
      <Button onClick={handleOpen} style={{ width: '100%', fontWeight: 'bold' }}>Edit My Info</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} container spacing={1}>

          <Form onSubmit={handleUpdateUser} ref={form}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Avatar sx={{ margin: 'auto', width: '125px', height: '125px' }} src={photoPreview || profilePic?.thumb?.url || "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"} />
                <label htmlFor="file">Avatar</label>
                <input className="form-control" type="file" name="file" accept="image/*" onChange={onChangePhoto} />
                {isPhotoPicked && !photoValid && (
                  (
                    <div className="alert alert-danger" role="alert">
                      {photoValidText}
                    </div>
                  )
                )}

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
              {currentInfo.is_merchant &&
                <>
                  <Grid item xs={12}>
                    <label htmlFor="bio">Biography</label>
                    <Textarea
                      placeholder="Tell potential clients about yourself....."
                      className="form-control"
                      value={bio}
                      name="bio"
                      rows="5"
                      maxLength="999"
                      onChange={onChangeBio}
                      style={{ resize: 'none' }}
                      validations={[charLimit]}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <label htmlFor="appointment_policy">Appointment Policy</label>
                    <Textarea
                      className="form-control"
                      placeholder="Anything customers should know about appointments"
                      value={appointment_policy}
                      name="appointment_policy"
                      rows="5"
                      maxLength="999"
                      style={{ resize: 'none' }}
                      onChange={onChangeAppointmentPolicy}
                      validations={[charLimit]}
                    />
                  </Grid></>
              }
              <Grid item xs={12} style={{ textAlign: 'right' }}>
                <button className="btn btn-primary btn-block">Update</button>
              </Grid>
            </Grid>
            <CheckButton style={{ display: "none" }} ref={checkBtn} />

          </Form>
        </Box>
      </Modal>
    </div>


  );
}