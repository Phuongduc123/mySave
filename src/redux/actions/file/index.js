import {
    GET_FILE,
    GET_FILE_TO_REDUX,
    GET_FILE_FROM_POST_TO_REDUX,
    GET_FILE_FROM_POST,
    GET_SEARCH_FILE
} from './action_type'

export default {
    getFile: (file)=>{
        return {
            type:GET_FILE,
            params:{
                file:file,
            }
        }
    },
    getFileToRedux: (file)=>{
        return {
            type:GET_FILE_TO_REDUX,
            params:{
                file:file
            }
        }
    },
    getFileFromPost:()=>{
        return {
            type:GET_FILE_FROM_POST,
        }
    },
    getFileFromPostToRedux:(file)=>{
        return {
            type:GET_FILE_FROM_POST_TO_REDUX,
            params:{
                file:file
            }
        }
    },
    getSearchFile:(file)=>{
        return {
            type: GET_SEARCH_FILE,
            params:{
                file:file
            }
        }
    }
}