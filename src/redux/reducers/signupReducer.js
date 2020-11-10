import { FETCH_QR_CODE } from "../actions/signup/action_type";

export default (
  state = {
    user: {},
  },
  action
) => {
  switch (action.type) {
    default: {
      console.log("successfuly");
      return { ...state };
    }
  }
};
