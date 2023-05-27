//import logo from './logo.svg';
import logo from './img/logo.png';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-fileinput/css/fileinput.min.css'
import '../node_modules/bootstrap-fileinput/css/fileinput-rtl.min.css'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import useToken from './components/useToken'
import RequestPage from "./container/request.container"
import Login from "./container/login.container";
import MainPage from "./container/main.container"
import LogOut from "./container/logout.container"
import DashBoard from "./container/dashboard.container"
import AdminPage from "./container/admin.container"
import PersonalPage from "./container/personal.container"

function App() {
  const { token, removeToken, setToken } = useToken();

  return (
  <Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <img src={logo} width="30" height="30" alt=""/> 
          <Link className="navbar-brand" to={"/"}>SPARK investment website</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            {!token && token!=="" &&token!== undefined ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>Login</Link>
                </li>
              </ul>
            ):(
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/admin"}>Admin</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/personal"}>Personal</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/request"}>Request</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/dashboard"}>Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/logout"}>Logout</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
      <div>
        <Switch>
          <Route exact path='/'>
            <MainPage token={token} />
          </Route>
          <Route exact path='/request'>
            <RequestPage token={token} />
          </Route>
          <Route exact path='/dashboard'>
            <DashBoard token={token} />
          </Route>
          <Route exact path='/sign-in'>
            <Login setToken={setToken} />
          </Route>
          <Route exact path='/logout'>
            <LogOut token={removeToken} />
          </Route>
          <Route exact path='/admin'>
            <AdminPage token={token} />
          </Route>
          <Route exact path='/personal'>
            <PersonalPage token={token} />
          </Route>
        </Switch>
      </div>
    </div>
  </Router>
  );
}

export default App;
