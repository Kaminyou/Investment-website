import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from '../components/userList'

export default function PersonalPage( {token} ) {
  const [userList, setUserList] = useState([]);
  const [isFetch, setIsFetch] = useState(false);
  const MINUTE_MS = 2000; // 2 sec


  const getUserList = async () => {

    await axios.get("/api/personal/listuser", {
      headers: {Authorization: 'Bearer ' + token}
    })
    .then((res) => {
      setUserList(res.data.currentUsers);
      setIsFetch(true);
    })
    .catch((error) => {
      console.error(error);
      setIsFetch(false);
    });
  }

  useEffect(() => {
    getUserList();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
        getUserList();
      }, MINUTE_MS);
    return () => clearInterval(interval);
  }, [])

  return (
    <div className="main-wrapper">
      <div className="main-inner">
        {!isFetch ? (
          <p>Loading...</p>
        ):(
          <>
            <UserList userlist={userList} token={token}/>
          </>
        )}
      </div>
    </div>
  );
}
