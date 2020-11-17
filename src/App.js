import React, { useEffect, useState } from "react";
import "./css/App.css";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import UserScreen from "./components/UserScreen";
import { Affix, Avatar, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Searchs from "./components/Searchs";
import Logup from "./components/Logup";
import { connect } from "react-redux";
import actions from "./redux/actions/signin/index";
import CommunityScreen from "./components/CommunityScreen";
import { getProfile } from "./request/postRequest";

const App = (props) => {
  const [userName, setUserName] = useState("name");
  //send action to redux to signout
  const Signout = () => {
    props.actionLogged("");
  };

  useEffect(() => {
    getProfile(setUserName);  
  });

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
              <Link to="/my-community">my Community</Link>
            </li>
            <li className="left-item">
              <div>
                <Searchs />
              </div>
            </li>
            {/* logout and view profile  */}
            {JSON.parse(localStorage.getItem("logged")) === true ? (
              <li className="right-item">
                <Link>
                  <Popover
                    content={
                      <div className="popoverUser">
                        <Link>
                          <p className="itemPopover">{userName}</p>
                        </Link>
                        <Link to="/signin">
                          <p className="itemPopover" onClick={Signout}>
                            Sign out
                          </p>
                        </Link>
                      </div>
                    }
                  >
                    <Avatar size={30} icon={<UserOutlined />} />
                  </Popover>
                </Link>
              </li>
            ) : (
              <></>
            )}

            <li className="right-item">
              <Link to="/signin">Sign in</Link>
            </li>
            <li className="right-item">
              <Link to="/signup">Sign up</Link>
            </li>
          </ul>
        </Affix>

        <Switch>
          <Route exact path="/signin">
            <Login />
          </Route>
          <Route exact path="/user-screen">
            <UserScreen />
          </Route>
          <Route exact path="/my-community">
            <CommunityScreen />
          </Route>
          <Route exact path="/signup">
            <Logup />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    logged: state.signin.logged,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actionLogged: (token) => {
      dispatch(actions.actionLogged(token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
