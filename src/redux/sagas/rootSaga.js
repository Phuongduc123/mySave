import { all } from 'redux-saga/effects'
import signupSaga from "./signupSaga";
import fileSaga from "./fileSaga";


export default function* rootSaga() {
	yield all([
		signupSaga(),
		fileSaga(),
	]);
}
