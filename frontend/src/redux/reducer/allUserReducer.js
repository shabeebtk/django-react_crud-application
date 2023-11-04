import { GET_ALL_USERS } from "../action/authAction"

const initialState = {
    allUser : 'shabeeb'
}

const allUsersReducer = (state=initialState, action)=>{
    switch(action.type){
        case GET_ALL_USERS:
            return{
                ...state,
                allUser : action.payload
            }

        default:
            return state
    }

}

export default allUsersReducer;