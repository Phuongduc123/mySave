import { ACTION_LOGGED } from "../actions/signin/action_type";

export default (
  state = {
    logged: false,
    token:"",
  },
  action
) => {
  switch (action.type) {
    case ACTION_LOGGED:{
      localStorage.setItem("logged",!state.logged);
      localStorage.setItem("token",action.params.token);
      return {
        ...state,
        logged:!state.logged,
        token: action.params.token
      }
      
    }
    
    default: {
      return { ...state };
    }
  }
};
