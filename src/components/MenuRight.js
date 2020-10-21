import React, { useState } from "react";
import "../css/login.css";
import { Affix, Menu, Switch } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

const MenuRight = (props) => {
  const [theme, setTheme] = useState("light");
  const [current, setCurrent] = useState("1");
  var handleClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <>
        <Menu
          theme={theme}
          onClick={handleClick}
          style={{  height: "1000px",float:"right" }}
          defaultOpenKeys={["sub1"]}
          selectedKeys={[current]}

        >
          <SubMenu key="sub1" icon={<MailOutlined />} >
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            icon={<AppstoreOutlined />}
            
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
export default MenuRight;
