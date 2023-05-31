import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import isEmpty from 'validator/lib/isEmpty'

export default function CreateUser({token}) {
  const [newAccount, setNewAccount] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleNewAccountChange = (e) => {
    setNewAccount(e.target.value)
  }

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value)
  }

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value)
  }

  const sendCreateUserRequest = () => {
    if (isEmpty(newAccount) || isEmpty(newCategory) || isEmpty(newPassword)) {
      swal({
        title: "Error",
        text: "Please provide account and password",
        icon: "error",
      });
      return
    }
    const formData = new FormData();
    
    formData.append("account", newAccount);
    formData.append("category", parseInt(newCategory));
    formData.append("password", newPassword)
    
    axios.post("/api/admin/createuser", formData, {
      headers: {Authorization: 'Bearer ' + token}
    })
    .then(res => {
      setNewAccount("");
      setNewCategory("");
      setNewPassword("");
      
      swal({
        title: "Success",
        text: "Create successfully!",
        icon: "success",
      });
    })
    .catch(
      err => {
        console.warn(err);
        swal({
          title: "Error",
          text: "Server error",
          icon: "error",
        });
      }
    );
  }

  return (
    <div>
      <h4>Create User</h4>
      <div className="form-group">
        <label htmlFor="formWebURLInput">Account</label>
        <input type="text" className="form-control" id="formNewAccount" placeholder="new account" value={newAccount} onChange={handleNewAccountChange}/>
      </div>

      <div className="form-group">
        <label htmlFor="formWebAccountInput">Group</label>
        <input type="text" className="form-control" id="formNewGroup" placeholder="new group" value={newCategory} onChange={handleNewCategoryChange}/>
      </div>

      <div className="form-group">
        <label htmlFor="formWebAccountInput">Password</label>
        <input type="text" className="form-control" id="formNewPassword" placeholder="new password" value={newPassword} onChange={handleNewPasswordChange}/>
      </div>
      <button type="button" className="btn btn-primary btn-block pantoneZOZl" onClick={sendCreateUserRequest}>Create</button>
      <br></br>
    </div>
  );
}