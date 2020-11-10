import { Affix, Button } from "antd";
import React, { useState } from "react";
import MenuLeft from "./MenuLeft";
import MenuRight from "./MenuRight";
import File from "./File";
import { connect } from "react-redux";
import actions from "../redux/actions/file/index";
import { useEffect } from "react";
import "../css/userScreen.css";

const UserScreen = (props) => {
  // get file to redux
  const [fileRow, setFileRow] = useState(1);
  // const [rowContent,setRowContent]= useState([])
  useEffect(() => {
    props.getFile();
    setFileRow(Math.ceil(props.files?.length / 4)+2);
  }, [props.files?.length]);

  // function to render files
  const renderFiles = () => {
    let rows=[]
    for (var i = 0; i < fileRow; i++) {
      rows.push(
        <div key={i} style={{ display: "flex"}}>
          {props.files?.map((file, index) => {
            console.log(file);
            if (index - i * 4 < 4 && index - i * 4 >= 0) {
              return (
                <div key={index}>
                  <File name={file.name} link={file.file} idFile={file._id}/>
                </div>
              );
            }
          })}
        </div>
      );
    }
    return rows.map((row)=>{
      return row
    })
  };
  return (
    <div style={{ display: "flex",flexDirection:"row" }}>
      {console.log(fileRow)}
      <div className="menu-left" >
        <MenuLeft hideAdd={false}/>
      </div>

      <div style={{ flex: 6, display: "block" }}>
        {/* renderFiles */}
        {JSON.parse(localStorage.getItem("logged")) === true ?renderFiles():<></>}
      </div>
      <div className="menu-right" >
        <MenuRight />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    logged:state.signin.logged,
    files: state.file.file,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFile: (file) => {
      dispatch(actions.getFile(file));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
