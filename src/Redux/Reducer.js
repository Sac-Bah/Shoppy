import * as type from './ActionType'


const initialState={
    loading:false,
    currentUser:null,
    error:null
};

const userReducer=(state=initialState,action)=>{
    switch(action.type){
       case type.SIGNUP_START:
       case type.LOGIN_START:
       case type.LOGOUT_START:
       case type.GOOGLE_SIGNIN_START:
        return{
            ...state,
            loading:true,
        }
        case type.LOGOUT_SUCCESS:
            return{
                ...state,
                currentUser: null
            }
        
        case type.SET_USER:
        case type.SIGNUP_SUCCESS:
        case type.LOGIN_SUCCESS:
        case type.GOOGLE_SIGNIN_SUCCESS:
            return{
                ...state,
                loading:false,
                currentUser: action.payload
            }
        case type.SIGNUP_ERROR:
        case type.LOGIN_ERROR:
        case type.LOGOUT_ERROR:
        case type.GOOGLE_SIGNIN_ERROR:
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        default:
            return state 
    }
}

export default userReducer