import React, { useEffect, useState } from "react";
import { useParams, Redirect, useHistory } from 'react-router-dom'
import { Container, Grid, Typography, Button, Avatar, Tabs, Tab, Box, styled } from '@mui/material';
import Market from './Market';
import Reviews from './Reviews';
import SettingsModal from './SettingsModal';
import { ParseJSON } from "../common/ParseJSON";
import UploadProductModal from './UploadProductModal';
import Toast from "./Toast";
import userService from "../services/user.service";
import { BorderBottom } from "@mui/icons-material";

const ProfileHeader = styled(Grid)({
  alignItems: 'center',
  alignSelf: 'baseline',
  textAlign: 'center',
  paddingTop: '10px',
  paddingLeft: '10px',
  height: '100%',
  backgroundColor: '#c0c0c0'
});

const ProfileBody = styled(Grid)({
  alignItems: 'center',
  textAlign: 'center',
  padding: "10px",
  height: '100%',
  backgroundColor: 'white',
  width: '100%',

});

const ProfileContainer = styled(Grid)({
  alignItems: 'center',
  textAlign: 'center',
  height: '100%',
  backgroundColor: 'white',
  width: '100%',
  border: '1px solid black'
});
// Tabs Based ON Material UI Framework TabPanel Example
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ Typography: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



const Profile = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [profile, setProfile] = useState({});
  const [rating, setRating] = useState("⭐");
  const [value, setValue] = useState(0);
  const [fetchedProfile, setFetchedProfile] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [toastMsg, setToastMsg] = useState("");
  const profilePicture = ParseJSON(profile?.profile_picture);
  const { username: profileUser } = useParams() || { username: "merchant1" };
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();



  useEffect(() => {
    if (profileUser) {
      loadUserProfile()
    }
  }, [profileUser]);


  useEffect(() => {
    if (profile?.reviews) {
      let ratingSum = 0
      let totalRatings = 0
      profile?.reviews?.forEach(r => {
        if (r?.rating) {
          ratingSum += Number(r.rating)
          totalRatings += 1
        }
      });
      let avg = ratingSum / totalRatings
      let stars = Math.floor(avg) || 1
      setRating("⭐".repeat(stars))
    }
  }, [profile]);

  const loadUserProfile = async () => {
    let newProfile = await userService.getUserInfo(profileUser)
      .catch((err) => {
        setErrorMsg(`Error Loading Profile Of ${profileUser} from server`);
        setFetchedProfile(true)
      })

    if (newProfile?.message) {
      setErrorMsg(`Error Loading Profile Of ${profileUser}.\n ${newProfile.message}`);
      setFetchedProfile(true)
    }
    else {
      setProfile(newProfile);
    }
    setFetchedProfile(true)

  };

  const updateToast = (sev, msg) => {
    setSeverity(sev);
    setToastMsg(msg);
    loadUserProfile();
    setOpenToast(true);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const isCurrentUser = () => {
    return profileUser === currentUser.username
  }

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  if (fetchedProfile && errorMsg !== "") {
    return (<Container style={{ width: '100%' }}>
      <Typography style={{ paddingTop: '10%', color: 'red' }} variant="h4">{`${errorMsg}. If this is not the case, please try again later`}</Typography>
    </Container>)
  } else {
    return (
      <Container style={{ width: '100%', padding: 0 }}>
        <ProfileContainer container xs={12} direction='row'>
          <ProfileHeader item xs={12} md={profile.is_merchant ? 3 : 12} >
            <Avatar sx={{ width: '125px', height: '125px', margin: 'auto' }} src={profilePicture?.thumb?.url || "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"} />
            <Typography style={{ paddingTop: "10px" }}> <strong>{`${profile.first_name} ${profile.last_name}`}</strong></Typography>
            <Typography><strong>{`${profile?.city}, ${profile?.province}`}</strong></Typography>
            {
              profile.is_merchant &&

              <Typography>{profile?.reviews?.length} <strong>Reviews</strong> | {rating}</Typography>
            }
            {profile?.is_merchant &&
              <Grid item xs={12} style={{ alignSelf: 'center', width: '100%' }}>
                <Tabs orientation="vertical" variant="scrollable" value={value} onChange={handleChange}>
                  <Tab label="About" {...a11yProps(0)} />
                  < Tab label="Reviews" {...a11yProps(1)} />
                  <Tab label="Tattoos" {...a11yProps(2)} />
                </Tabs>
              </Grid>
            }
            {(isCurrentUser()) &&
              <Grid item xs={12} style={{ alignSelf: 'center', width: '100%' }}>
                <SettingsModal currentInfo={profile} profilePic={profilePicture} updateToast={updateToast} />
                {(isCurrentUser() && profile?.is_merchant) &&
                  <>
                    <UploadProductModal updateToast={updateToast} />
                    <Button onClick={() => history.push('/MerchantAppointments')}>Manage My Appointments</Button>
                  </>
                }

              </Grid>

            }
          </ProfileHeader>
          <ProfileBody item xs={12} md={profile.is_merchant ? 9 : 12} >
            <Box sx={{ width: '100%' }}>
              <TabPanel value={value} index={0} style={{ width: '100%', height: '100%' }}>
                <Typography><strong>Address:</strong> {`${profile.is_merchant || isCurrentUser() ? profile.address + "," : ""} ${profile.city}, ${profile.province}`}</Typography>
                {(profile.is_merchant || isCurrentUser()) &&
                  <>
                    <Typography><strong>Phone:</strong> {` ${profile.phone_number || 'Not Provided'}`}</Typography>
                    <Typography><strong>Email:</strong> {` ${profile.email || 'Not Provided'}`}</Typography>
                  </>
                }
                {(profile?.is_merchant) && (
                  <>
                    <Typography><strong>Bio</strong></Typography>
                    <Typography>{profile?.bio || ""}</Typography>
                    <Typography><strong>Appointment Policy:</strong></Typography>
                    <Typography>{profile?.appointment_policy}</Typography>
                  </>
                )}
              </TabPanel>
              <TabPanel value={value} index={2} style={{ width: '100%', height: '100%' }}>
                <Market products={profile?.products} />
              </TabPanel>
              <TabPanel value={value} index={1} style={{ width: '100%', height: '100%' }}>
                <Reviews reviews={profile?.reviews} />
              </TabPanel>
            </Box>
          </ProfileBody>
        </ProfileContainer>
        <Toast open={openToast} setOpen={setOpenToast} severity={severity} msg={toastMsg} />
      </Container >
    );
  }
};

export default Profile;
