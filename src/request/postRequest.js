const axios = require("axios");
const FileDownload = require('js-file-download');

//post request
export const postUserProfile = async (email, password, name) => {
  await axios
    .post(
      "http://127.0.0.1:8000/api/signup",
      {
        email: email,
        password: password,
        profile: {
          name: name,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {})
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const postConfirmSignin = async (email, password, actionLogged) => {
  await axios
    .post(
      "http://127.0.0.1:8000/api/signin",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      if (response.status == 200) {
        actionLogged(response.data.token);
      }
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const postFileToPage = async (title, file_id) => {
  await axios
    .post(
      "http://127.0.0.1:8000/api/postpage/",
      {
        title: title,
        file: file_id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {})
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const postComment = async (content, post_id) => {
  await axios
    .post(
      "http://127.0.0.1:8000/api/commentpostlist/",
      {
        content: content,
        post: post_id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {})
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const searchPost = async (searchContent, getFileToRedux) => {
  await axios
    .post(
      "http://127.0.0.1:8000/api/searchpost/",
      {
        search: searchContent,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      console.log("respone :", response);
      if (response.status >= 200 && response.status < 300) {
        getFileToRedux(response.data.data);
      }
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

//getRequest
export const getUserfile = async (changeAction) => {
  await axios
    .get(
      "http://127.0.0.1:8000/api/userfile",

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      if (response.status == 200) {
        changeAction(response.data.data);
      }
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const getFileFromPost = async (getFile) => {
  await axios
    .get(
      "http://127.0.0.1:8000/api/postpage/",

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      if (response.status == 200) {
        getFile(response.data.news);
      }
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const getComment = async (idPost, setFullComment) => {
  await axios
    .post(
      "http://127.0.0.1:8000/api/getcommentpost/",
      {
        id: idPost,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      console.log(response)
      if(response.status===200){
        
        setFullComment(response.data["all post comment here"]);
      }
      
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const getDownloadFile = async (url,name) => {
  await axios
    .get(
      `http://127.0.0.1:8000${url}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      FileDownload(response.data, `${name}`)
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};


//delete request
export const deleteFile = async (
  idFile,
  //after delete get files again
  getFile
) => {
  await axios
    .delete("http://127.0.0.1:8000/api/userfile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        id: idFile,
      },
    })
    .then((response) => {
      if (response.status > 200 && response.status < 300) {
        getFile([]);
      }
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};
