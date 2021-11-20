/**
 * handles parsing the access token and checking if valid
 */

export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const isValidUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    // if user in local storage confirm token is still valid
    const decodedToken = parseJwt(user.accessToken);
    if (decodedToken.exp * 1000 > Date.now()) {
      return true
    }
  }
  return false
}
