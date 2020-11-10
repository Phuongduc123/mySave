import React, { useEffect, useState } from "react";
import { Card, Avatar, Popover, Modal } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  FolderOpenTwoTone,
  UploadOutlined,
  CommentOutlined,
  DownloadOutlined
} from "@ant-design/icons";
import {
  deleteFile,
  postFileToPage,
  postComment,
  getComment,
  getDownloadFile
} from "../request/postRequest";
import { connect } from "react-redux";
import actions from "../redux/actions/file/index";
import "../css/file.css";
import TextArea from "antd/lib/input/TextArea";

const { Meta } = Card;

const File = (props) => {
  //state
  const [Timeload, setTimeload] = useState(true);
  const [fileType, setFileType] = useState("");
  const [imageFile, setImageFile] = useState("./assets/file.png");
  const [visibleModal, setVisibleModal] = useState(false);
  const [contentComment, setContentComment] = useState("");
  const [fullComment, setFullComment] = useState([]);

  //effect
  useEffect(() => {
    fileClassification(props.name);
    setTimeout(() => {
      setTimeload(false);
    }, 3000);
  }, [props.name]);

  useEffect(() => {
    getComment(props.idPost, setFullComment);
  }, [props.idPost]);

  /* function*/
  // deletefile
  const delFile = () => {
    deleteFile(props.idFile, props.getFile);
  };
  //post file to page
  const postFilePage = () => {
    postFileToPage(props.name, props.idFile);
  };
  //comment post
  const commentPost = () => {
    setVisibleModal(true);
  };
  //download file
  const downloadFile = () =>{
    getDownloadFile(props.link,props.name)
  }

  //handle modal
  const handleOk = async (e) => {
    await postComment(contentComment, props.idPost);
    setVisibleModal(false);
    getComment(props.idPost, setFullComment);
  };

  const handleCancel = (e) => {
    setVisibleModal(false);
  };

  //classify files
  const fileClassification = (name) => {
    var type = "";
    for (var i = name.length - 1; i >= 0; i--) {
      if (name[i] === ".") {
        type = name.substring(i, name.length);
      }
      if (type === ".mp3") setImageFile("./assets/mp3.png");
      else if (type === ".png" || type === ".jpg")
        setImageFile(`http://127.0.0.1:8000${props.link}`);
      else if (type === ".mp4") setImageFile("./assets/video.png");
      else setImageFile("./assets/file.png");
    }
  };

  return (
    <div>
      <Card
        style={{ width: 190, margin: 20, float: "left" }}
        loading={Timeload}
        hoverable={true}
        cover={
          <Popover
            content={
              <div className="popoverUser">
                <p className="itemPopover">
                  <spam className="fileAtribute">File name:</spam> {props.name}
                </p>
                <p className="itemPopover">
                  <spam className="fileAtribute">Author:</spam> {props.author}
                </p>
                <p className="itemPopover">
                  <spam className="fileAtribute">Time:</spam> {props.time}
                </p>
              </div>
            }
          >
            <img alt="example" src={imageFile} />
          </Popover>
        }
        actions={
          props.community
            ? [
                <FolderOpenTwoTone
                  key="openFile"
                  onClick={() =>
                    window.open(`http://127.0.0.1:8000${props.link}`, "_blank")
                  }
                />,
                <Popover
                  content={
                    <div className="popoverUser">
                      {fullComment?.map((comment, index) => {
                        return (
                          <p className="itemPopover" key={index}>
                            <spam className="fileAtribute">
                              {comment[1]["user who comment"].name}:
                            </spam>
                            {comment[0].comment.content}
                          </p>
                        );
                      })}
                    </div>
                  }
                >
                  <CommentOutlined key="postFileToPage" onClick={commentPost} />
                  
                </Popover>,
                <DownloadOutlined key="downloadFile" onClick={downloadFile}/> 
              ]
            : [
                <FolderOpenTwoTone
                  key="openFile"
                  onClick={() =>
                    window.open(`http://127.0.0.1:8000${props.link}`, "_blank")
                  }
                />,
                <UploadOutlined key="postFileToPage" onClick={postFilePage} />,
                <DeleteOutlined key="deleteFile" onClick={delFile} />,
                <DownloadOutlined key="downloadFile" onClick={downloadFile}/> 
              ]
        }
      >
        <Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={props.name}
        />
      </Card>
      <Modal
        title="Comment"
        visible={visibleModal}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Comment"
      >
        <TextArea
          rows={4}
          onChange={(value) => {
            setContentComment(value.target.value);
          }}
        />
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFile: (file) => {
      dispatch(actions.getFile(file));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(File);
