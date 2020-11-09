import React from "react";
import { Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import "../css/App.css";

const { Search } = Input;

const Searchs = (props) => {
  return (
    <>
      <Search
        className="search"
        placeholder="input search text"
        width={10}
        onSearch={(value) => console.log(value)}
      />
    </>
  );
};
export default Searchs;
