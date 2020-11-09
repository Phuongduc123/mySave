import React, { useEffect, useState } from "react";
import { Card, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  FolderOpenTwoTone,
} from "@ant-design/icons";
import { deleteFile } from "../request/postRequest";
import { connect } from "react-redux";
import actions from "../redux/actions/file/index";

const { Meta } = Card;

const File = (props) => {
  //state
  const [Timeload, setTimeload] = useState(true);
  const [fileType,setFileType] = useState("");
  const [imageFile,setImageFile] = useState("./assets/file.png")

  //effect
  useEffect(() => {
    fileClassification(props.name);
    setTimeout(() => {
      setTimeload(false);
    }, 3000);
  }, [props.name]);

  /* function*/
  // deletefile
  const delFile = () => {
    console.log("delete");
    deleteFile(props.idFile,props.getFile);
  };
  //classify files
  const fileClassification=(name)=>{
    var type="";
    for(var i=name.length-1;i>=0;i--){
      if(name[i]==="."){
        type=name.substring(i,name.length);
      }
      if(type===".mp3") setImageFile("./assets/mp3.png")
      else if(type===".png" || type===".jpg") setImageFile(`http://127.0.0.1:8000${props.link}`)
      else if(type===".mp4") setImageFile("./assets/video.png")
      else setImageFile("./assets/file.png")
    }
  }
  // function return image from fileType
  // const chooseImageFromFileType=(fileType)=>{
  //   if(fileType===".mp3") return "./assets/mp3.png"
  //   else if(fileType===".png" || fileType===".jpg") return `http://127.0.0.1:8000${props.link}`
  //   else if(fileType===".mp4") return "./assets/video.png"
  //   else return "./assets/file.png"
  // }

  
  return (
    <div>
      <Card
        style={{ width: 190, margin: 20, float: "left" }}
        loading={Timeload}
        hoverable={true}
        cover={
          <img
            alt="example"
            src={imageFile}
          />
        }
        actions={[
          <FolderOpenTwoTone
            key="setting"
            onClick={() =>
              window.open(`http://127.0.0.1:8000${props.link}`, "_blank")
            }
          />,
          <EditOutlined key="edit" />,
          <DeleteOutlined key="ellipsis" onClick={delFile} />,
        ]}
      >
        <Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={props.name}
        />
      </Card>
      
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFile: (file) => {
      dispatch(actions.getFile(file));
    },
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(File);
