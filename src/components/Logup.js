import React, { useState } from "react";
import "../css/logup.css";
import { Form, Input, Button, Checkbox,Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../redux/actions/signup/index";
import { postUserProfile } from "../request/postRequest";
import createSagaMiddleware from "redux-saga";
const axios = require("axios");

const Logup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordAgain, setpaswordAgain] = useState("");
  const [redirect,setRedirect] = useState("");
  const [visibleModel, setvisibleModal] = useState(false);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  // post confirm signup account
  const handleSignup = () => {
    postUserProfile(email, password, username);
  };


  // handle modal
  const showModal = () => {
    setvisibleModal(true)
  };

  const handleOk = (e) => {
    setRedirect("/signin")
  };

  const handleCancel = (e) => {
    setvisibleModal(false)
  };
  //handle redirect other screen
  if(redirect!==""){
    return <Redirect to={redirect}/>
  }
  return (
    <div className="logup">
      <div className="form">
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <div style={{ display: "flex" }}>
            <img
              src="./assets/logo.png"
              style={{
                width: "40px",
                height: "40px",
                marginBottom: "30px",
                marginRight: "30px",
              }}
            ></img>
            <h1>Signup</h1>
          </div>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Full name"
              onChange={(value) => {
                setUsername(value.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              onChange={(value) => {
                setEmail(value.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={(value) => {
                setPasword(value.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="passwordAgain"
            rules={[
              { required: true, message: "Please input your Password again!" },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password(again)"
              onChange={(value) => {
                setpaswordAgain(value.target.value);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <p>
                Bạn có muốn đăng nhập?<Link to="/login">Đăng nhập ngay</Link>
              </p>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="logup-form-button"
              style={{
                backgroundColor: "#00B5AD",
                borderStyle: "hidden",
                width: "100%",
              }}
              onClick={() => {
                if (
                  username !== "" &&
                  email !== "" &&
                  password !== "" &&
                  passwordAgain !== "" &&
                  passwordAgain === password
                ) {
                  handleSignup();
                  showModal();
                }
              }}
            >
              Log in
            </Button>

            {/*model to confirm redirect to signin*/}
            <Modal
              title="Do you want sign in now?"
              visible={visibleModel}
              onOk={handleOk}
              onCancel={handleCancel}
              okText="Sign in now!"
            ></Modal>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    default: (data) => {
      dispatch(actions.fetchQRCode(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logup);
