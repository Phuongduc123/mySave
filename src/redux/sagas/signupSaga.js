import {
    FETCH_QR_CODE
} from "../actions/signup/action_type";

import actions from "../actions/signup/index";

// saga effect
import {put, takeLatest, call, all, fork} from 'redux-saga/effects'

function* fetchQRCode() {
	try {
		console.log("sagas successfuly");
	} catch (err) {
		console.error(err);
	}
}



function* signupSaga() {
	yield takeLatest(FETCH_QR_CODE, fetchQRCode);
}

export default function *rootSaga() {
	yield all([fork(signupSaga)]);
}
