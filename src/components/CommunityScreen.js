import { Affix, Button } from "antd";
import React, { useState } from "react";
import MenuLeft from "./MenuLeft";
import MenuRight from "./MenuRight";
import File from "./File";
import { connect } from "react-redux";
import actions from "../redux/actions/file/index";
import { useEffect } from "react";

const CommunityScreen = (props) => {
  // get file to redux
  const [fileRow, setFileRow] = useState(1);

  useEffect(()=>{
    props.getFileFromPost();
  },[])
  useEffect(() => {
    //set amount of rows follow length of fileFromPost
    setFileRow(Math.ceil(props.fileFromPost?.length / 4) + 2);
  }, [props.fileFromPost?.length]);

  // function to render fileFromPost
  const renderFiles = () => {
    let rows = [];
    for (var i = 0; i < fileRow; i++) {
      rows.push(
        <div key={i} style={{ display: "flex" }}>
          {props.fileFromPost.map((file, index) => {
            let fileSample = file[1]["file attatched to post"];
            let filepost= file[0].post;
            let poster= file[2]["person who post"]
            if (index - i * 4 < 4 && index - i * 4 >= 0) {
              return (
                <div key={index}>
                  <File
                    name={fileSample.name}
                    link={fileSample.file}
                    idFile={fileSample._id}
                    community={true}
                    time={filepost.timestamp}
                    author={poster.name}
                    idPost={filepost._id}
                  />
                </div>
              );
            }
          })}
        </div>
      );
    }
    return rows.map((row) => {
      return row;
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <MenuLeft hideAdd={true} />
      </div>

      <div style={{ flex: 6, display: "block" }}>
        {/* renderFiles */}
        {JSON.parse(localStorage.getItem("logged")) === true ? (
          renderFiles()
        ) : (
          <></>
        )}
      </div>

      <div style={{ flex: 1 }}>
        <MenuRight />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fileFromPost: state.file.fileFromPost,
    searchFile:state.file.searchFile
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFileFromPost: () => {
      dispatch(actions.getFileFromPost());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CommunityScreen);
