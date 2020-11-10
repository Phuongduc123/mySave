import {
	GET_FILE,
	GET_FILE_FROM_POST
} from "../actions/file/action_type";

import actions from "../actions/file/index";
import {getUserfile,getFileFromPost} from "../../request/postRequest"

// saga effect
import {put, takeLatest, call, all, fork, select, takeEvery,delay} from 'redux-saga/effects'

function* getFiles(action) {
	try {
	 // create function to pass to request for change file in action	
	 let changeAction=(a)=>{
		action.params.file=a
	 }
	 yield call(()=>getUserfile(changeAction));	
	 yield put(actions.getFileToRedux(action.params.file))
	} catch (err) {
		console.error(err);
	}
	
}

function* getFilesFromPost() {
	try {
	 // create variable and function to get file from  request 
	 let files=[]
	 let getfile=(filesfromrequest)=>{
		files=filesfromrequest
	 }
	 yield call(()=>getFileFromPost(getfile));	
	 yield put(actions.getFileFromPostToRedux(files))
	} catch (err) {
		console.error(err);
	}
	
}



function* fileSaga() {
	yield takeLatest(GET_FILE, getFiles);
	yield takeLatest(GET_FILE_FROM_POST,getFilesFromPost)
}

export default function *rootSaga() {
	yield all([fork(fileSaga)]);
}
