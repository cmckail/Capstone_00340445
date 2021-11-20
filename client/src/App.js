/**
 * Note all styling handled by a combination of bootstrap and MUI components/functions
 */
import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
// allows use of bootstrap app.js layer and downwards
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Box, Button, Typography, AppBar, Toolbar, styled } from "@mui/material";
import { history } from "./common/history";
import { parseJwt } from "./common/TokenCheck";
const Home = lazy(() => import("./components/Home"));
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const Profile = lazy(() => import("./components/Profile"));
const Marketplace = lazy(() => import("./components/Marketplace"));
const ProductPage = lazy(() => import("./components/ProductPage"));
const Success = lazy(() => import("./components/Success"));
const UserAppointments = lazy(() => import("./components/UserAppointments"));
const MerchantAppointments = lazy(() => import("./components/MerchantAppointments"));


const NavLinkStyled = styled(Link)`
  color:'red';
  &:hover: {
    color: blue;
  }
`;
const App = () => {

  // var currentUser = JSON.parse(localStorage.getItem("user"));
  const [currentUser, setCurrentUser] = useState({})

  //Every render check if user is valid, else kick to out of app
  useEffect(() => {
    history.listen(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      setCurrentUser(user);
      console.log('user', user);
      if (user) {
        const decodedJwt = parseJwt(user.accessToken);

        if (decodedJwt.exp * 1000 < Date.now()) {
          logOut();
        }
      }
    });
  });

  useEffect(() => {
    // for some reason logout gets caught here but not login
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
  }, [history])

  const logOut = useCallback(() => {
    localStorage.removeItem("user");
    history.push('/login');
    setCurrentUser(null)
  }, []);

  return (
    <Suspense fallback={<Container><h1>...loading</h1> </Container>}>
      <Router history={history}>
        <Container style={{ width: "100%", padding: '0' }}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <Typography
                  component={NavLinkStyled}
                  size="large"
                  edge="start"
                  to={"/"}
                  color="white"
                  sx={{ mr: 2 }}
                >
                </Typography>
                <Typography component={NavLinkStyled} to={"/"} color="white" sx={{ flexGrow: 1, textDecoration: 'none' }}>
                  Tadoo
                </Typography>
                {currentUser ? (
                  <>
                    <Typography component={NavLinkStyled} to={`/profile/${currentUser.username}`} color="white" sx={{ flexGrow: 1, textDecoration: 'none' }}>
                      {currentUser.username}
                    </Typography>
                    <Typography component={NavLinkStyled} to={`/market`} color="white" sx={{ flexGrow: 1, textDecoration: 'none' }}>
                      Marketplace
                    </Typography>
                    <Typography component={NavLinkStyled} to={`/myAppointments`} color="white" sx={{ flexGrow: 1, textDecoration: 'none' }}>
                      Appointment
                    </Typography>
                    <Button
                      onClick={logOut}
                      style={{
                        color: 'white'
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) :
                  (
                    <>
                      <Typography component={NavLinkStyled} to={`/register`} color="white" sx={{ flexGrow: 1, textDecoration: 'none' }}>
                        Register
                      </Typography>
                      <Typography component={NavLinkStyled} to={`/login`} color="white" sx={{ flexGrow: 1, textDecoration: 'none' }}>
                        Login
                      </Typography>
                    </>
                  )}
              </Toolbar>
            </AppBar>
          </Box>
          <div>
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile/:username" component={Profile} />
              <Route path="/market" exact component={Marketplace} />
              <Route path="/market/:id" component={ProductPage} />
              <Route path="/myAppointments" component={UserAppointments} />
              <Route path="/merchantAppointments" component={MerchantAppointments} />
              <Route path="/success" component={Success} />
            </Switch>
          </div>
        </Container>
      </Router>
    </Suspense >
  );
};

export default App;
