import {
	FETCH_QR_CODE,
	FETCH_QR_CODE_FAILED,
	FETCH_QR_CODE_SUCCEED,
} from "./action_type";

export default {
	fetchQRCode: (data) => {
		return {
			type: FETCH_QR_CODE,
			params: {
				data
			}
		}
	},
	
}
