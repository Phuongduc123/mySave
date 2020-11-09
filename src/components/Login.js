import React, { useEffect, useLayoutEffect, useRef } from "react";
import "../css/login.css"
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { postConfirmSignin } from "../request/postRequest";
import { useState } from "react";
import actions from "../redux/actions/signin/index";
import {connect} from "react-redux"
import { Redirect } from "react-router-dom";
import { FormInstance } from 'antd/lib/form';

// let cfLogged=false

const Login = (props) => {
  const formRef=useRef()

  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");


  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  // handle sign in
  const handleSignin = async ()=>{
    formRef.current.resetFields();
    await postConfirmSignin(email,password,props.actionLogged);
  }
  
  // when logged dispatch action confirm logged in redux and redirect to user screen
  if (props.logged===true){
    return <Redirect to="/user-screen"/>
  }

  return (
    <div className="login">
      <div
        className="form"
      >
        <Form
          ref={formRef}
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
                marginBottom: "10px",
                marginRight: "30px",
              }}
            ></img>
            <h1>mySave</h1>
          </div>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
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
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="remember-me">Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{
                backgroundColor: "#00B5AD",
                borderStyle: "hidden",
                width: "100%",
              }}
              onClick={()=>{handleSignin();}}
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    logged:state.signin.logged,
    token: state.signin.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actionLogged: (token) => {
      dispatch(actions.actionLogged(token));
    },
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Login);