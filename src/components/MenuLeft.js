import React, { useState } from "react";
import "../css/login.css";
import { Affix, Button, Menu, Switch, Upload } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  PlusOutlined
} from "@ant-design/icons";

const { SubMenu } = Menu;
const propsss = {
  async onChange({ file, fileList }) {
    console.log(file);
  },
};

const MenuLeft = (props) => {
  const [theme, setTheme] = useState("light");
  const [current, setCurrent] = useState("1");
  var handleClick = (e) => {
    setCurrent(e.key);
  };

  var onFileChange =(e)=>{
    console.log(e.target.files[0]);
  }
  return (
    <>
        <Menu
          theme={theme}
          onClick={handleClick}
          style={{ width: 256, height: "1000px" }}
          defaultOpenKeys={["sub1"]}
          selectedKeys={[current]}
          mode="inline"

        >
            <Menu.Item>
              <Upload {...propsss} >
              <Button title="index" icon={<PlusOutlined/>} style={{marginLeft:"3rem", borderStyle:"solid"}}>ADD</Button>
              </Upload>
            </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            icon={<AppstoreOutlined />}
            title="Navigation Two"
          >
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu
            key="sub4"
            icon={<SettingOutlined />}
            title="Navigation Three"
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </Menu>
    </>
  );
};
export default MenuLeft;
