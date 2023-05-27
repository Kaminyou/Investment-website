import { useState } from 'react';
import { useHistory } from "react-router";
import axios from "axios";
import swal from "sweetalert";

function Login({ setToken }) {
  const history = useHistory();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const handleAccountChange = (e) => {
    setAccount(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const logMeIn = (e) => {
    axios(
      {
        method: "POST",
        url:"/api/token",
        data:{
          account: account,
          password: password,
        }
      }
    ).then((response) => {
      setToken(response.data.access_token)
      setAccount("")
      setPassword("")
      history.push({
        pathname: "/",
      });
    }).catch((error) => {
      if (error.response) {
        swal({
          title: "Error",
          text: "Invalid User",
          icon: "error",
        });
      }
    })
    setAccount("")
    setPassword("")
    e.preventDefault()
  }


  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form>
          <h3>Login</h3>
          <div className="form-group">
            <label>Account</label>
            <input type="email" className="form-control" name="email"  placeholder="Enter your account" onChange={handleAccountChange} value={account}/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" name="password" placeholder="Enter password" onChange={handlePasswordChange} value={password}/>
          </div>
          <button type="button" className="btn btn-primary btn-block pantoneZOZl" onClick={logMeIn}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Login