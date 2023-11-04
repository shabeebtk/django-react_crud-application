const initialState = {
    admin : false,
    is_authenticated: false,
    user: null
}

const authReducer = ( state = initialState, action )=>{

    switch(action.type){
        case 'USER_SIGNIN':
            return{
                is_authenticated : true,
                user : action.payload
            }

        case 'USER_LOGOUT':
            return {
                is_authenticated : false,
                user : null
            }
        
        case 'ADMIN_SIGNIN':
            return {
                is_admin : true,
                is_authenticated : true,
                user : action.payload
            }
        default:
            return state
    }

}

export default authReducer;