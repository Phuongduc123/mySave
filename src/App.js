import React from "react";
import "./css/App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UserScreen from "./components/UserScreen";
import { Affix } from "antd";
import Searchs from "./components/Searchs";

const App = (props) => {
  return (
    <>
      <Router>
        {/* navBar */}
        <Affix offsetTop={0}>
          <ul className="nav-bar">
            <li className="left-item">
              <input
                type="image"
                src="./assets/logo1.png"
                style={{ height: "50px" }}
              />
            </li>
            <li className="left-item">
              <a>my Setting</a>
            </li>
            <li className="left-item">
              <Link to="/user-screen">my Home</Link>
            </li>
            <li className="left-item">
              <a>my History</a>
            </li>
            <li className="left-item">
              <div>
                <Searchs />
              </div>
            </li>
            <li className="right-item">
              <Link to="/login">Log in</Link>
            </li>
            <li className="right-item">
              <a>Log up</a>
            </li>
          </ul>
        </Affix>

        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/user-screen">
            <UserScreen />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
