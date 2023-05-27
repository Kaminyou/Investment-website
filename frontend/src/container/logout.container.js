import { useHistory } from "react-router";
import axios from "axios";

function LogOut({ token }) {
    const history = useHistory();

    const logMeOut = () => {
        axios({
          method: "POST",
          url:"/api/logout",
        })
        .then((response) => {
            token()
            history.push({
                pathname:  "/",
            });
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
    })}
  
    return (
    <div className="auth-wrapper">
    <div className="auth-inner">
      <h3>Log out?</h3>
      <button type="button" className="btn btn-primary btn-block pantoneZOZl" onClick={logMeOut}>Logout</button>
    </div>
    </div>
    )
  }

export default LogOut