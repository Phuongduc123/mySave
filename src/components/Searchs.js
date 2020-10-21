import React from "react";
import { Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";

const { Search } = Input;

const Searchs = (props) => {
  return (
    <>
      <Search
        style={{marginLeft:"100px"}}
        placeholder="input search text"
        width={10}
        onSearch={(value) => console.log(value)}
      />
    </>
  );
};
export default Searchs;
