import React from "react";
import "../css/logup.css"
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {Link} from "react-router-dom"

const Logup = (props) => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className="logup">
      <div
        className="form"
      >
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
            <h1>Signin</h1>
          </div>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your full name!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Full name"
            />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
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
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password again!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password(again)"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
                <p>Bạn có muốn đăng nhập?<Link to="/login">Đăng nhập ngay</Link></p>
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
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Logup;