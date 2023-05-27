import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from '../components/adminUserList'
import CreateUser from '../components/createUser'

export default function AdminPage( {token} ) {
  const [userList, setUserList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const MINUTE_MS = 2000; // 2 sec


  const getUserList = async () => {

    await axios.get("/api/admin/listuser", {
      headers: {Authorization: 'Bearer ' + token}
    })
    .then((res) => {
      setUserList(res.data.currentUsers);
      setIsAdmin(true);
    })
    .catch((error) => {
      console.error(error);
      setIsAdmin(false);
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
        {!isAdmin ? (
          <p>You are not admin</p>
        ):(
          <>
            <CreateUser token={token}/>
            <UserList userlist={userList} token={token}/>
          </>
        )}
      </div>
    </div>
  );
}
