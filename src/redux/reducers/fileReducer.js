import { GET_FILE,GET_FILE_TO_REDUX,GET_FILE_FROM_POST_TO_REDUX,GET_SEARCH_FILE} from "../actions/file/action_type";
import {getUserfile} from "../../request/postRequest.js"
import file from "../actions/file";

export default (
  state = {
    file:[],
    fileFromPost:[],
    searchFile:[]
  },
  action
) => {
  switch (action.type) {
    
    case GET_FILE_TO_REDUX:{
      
      return {
        ...state,
        file:action.params.file  
      }
      
    }
    case GET_FILE_FROM_POST_TO_REDUX:{
      return {
        ...state,
        fileFromPost:action.params.file
      }
    }
    case GET_SEARCH_FILE:{
      return {
        ...state,
        fileFromPost:action.params.file
      }
    }
    
    default: {
      return { ...state };
    }
  }
};
