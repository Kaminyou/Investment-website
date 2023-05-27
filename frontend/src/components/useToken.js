import { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import axios from "axios";

function useToken() {
  const history = useHistory();
  const validateToken = () => {
    axios.post("/api/validate", null, {
      headers: {Authorization: 'Bearer ' + token}
    }).then((response) => {
      history.push({
        pathname: "/",
      });
    }).catch((error) => {
      removeToken();
      history.push({
        pathname: "/",
      });
    })
  }

  function getPayload(jwt) {
    // A JWT has 3 parts separated by '.'
    // The middle part is a base64 encoded JSON
    // decode the base64 
    return atob(jwt.split(".")[1])
  }
  
  function isExpired(jwt) {
    const payload = getPayload(jwt);
    const expiration = new Date(payload.exp);
    const now = new Date();
    const halfHour = 1000 * 60 * 30;
    if( expiration.getTime() - now.getTime() < halfHour ){
      return false;
    } else {
      return true;
    }
  }

  function getToken() {
    const userToken = localStorage.getItem('token');
    if (userToken === null) return null;
    if (isExpired(userToken)) {
      localStorage.removeItem("token");
      return null;
    }
    return userToken && userToken
  }

  const [token, setToken] = useState(getToken());

  function saveToken(userToken) {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  function removeToken() {
    localStorage.removeItem("token");
    setToken(null);
  }

  useEffect(() => {
    validateToken();
  }, []);

  return {
    setToken: saveToken,
    token,
    removeToken
  }
}

export default useToken;