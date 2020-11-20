import React from "react";
import { Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import "../css/App.css";
import {searchPost,searchPostByUser} from "../request/postRequest"
import actions from "../redux/actions/file/index";
import {connect} from "react-redux"

const { Search } = Input;

const Searchs = (props) => {

  const search=(value)=>{
    console.log(value)
    if(props.postType==="postName"){
      searchPost(value,props.getSearchFile);
    }else{
      searchPostByUser(value,props.getSearchFile);
    }
}
  return (
    <>
      <Search
        className="search"
        placeholder="search"
        width={10}
        onSearch={search}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    searchFile:state.file.searchFile
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSearchFile: (file) => {
      dispatch(actions.getSearchFile(file));
    },
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Searchs);
