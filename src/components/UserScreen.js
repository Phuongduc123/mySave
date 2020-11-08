import { Affix, Button } from "antd";
import React, { useState } from "react";
import MenuLeft from "./MenuLeft";
import MenuRight from "./MenuRight";
import File from "./File";
import { connect } from "react-redux";
import actions from "../redux/actions/file/index";
import { useEffect } from "react";

const UserScreen = (props) => {
  // get file to redux
  const [fileRow, setFileRow] = useState(1);
  // const [rowContent,setRowContent]= useState([])
  useEffect(() => {
    props.getFile();
    setFileRow(Math.ceil(props.files.length / 4)+2);
  }, [props.files.length]);

  // function to render files
  const renderFiles = () => {
    let rows=[]
    for (var i = 0; i < fileRow; i++) {
      rows.push(
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {props.files.map((file, index) => {
            if (index - i * 4 < 4 && index - i * 4 >= 0) {
              console.log(file);
              return (
                <div key={index}>
                  <File name={file.name} link={file.file}/>
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
    <div style={{ display: "flex" }}>
      {console.log(fileRow)}
      <div style={{ flex: 1 }}>
        <MenuLeft />
      </div>

      <div style={{ flex: 6, display: "block" }}>
        {/* renderFiles */}
        {renderFiles()}
      </div>
      <div style={{ flex: 1 }}>
        <MenuRight />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
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
