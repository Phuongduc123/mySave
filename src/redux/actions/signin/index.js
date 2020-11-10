import {
    ACTION_LOGGED
} from './action_type'

export default {
    actionLogged: (token)=>{
        return {
            type:ACTION_LOGGED,
            params:{
                token: token
            }
        }
    }
}