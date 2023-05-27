import { Link } from "react-router-dom";
import config from "../config.json";
function MainPage({ token }) {
  return (
    <div className="main-wrapper">
      <div className="main-inner">
        <h2>SPARK investment website</h2>
        <p><i>{config.VERSION}</i></p>
        <h5>Invest your favorite group</h5>
        <p>Please follow the steps to send request</p>
        {!token && token!=="" &&token!== undefined? (
          <>
            <h5>Request</h5>
            <p>Please <Link className="pantoneZOZ1a" to={"/sign-in"}>login</Link> first</p>
          </>
        ):(
          <>
            <h5>Request</h5>
            <p>Please check the <Link className="pantoneZOZ1a" to={"/request"}>request</Link> page</p>
            {/*<img src={demo} width="800" height="600" alt=""/> */}
          </>
        )}
      </div>
    </div>
  )
}

export default MainPage