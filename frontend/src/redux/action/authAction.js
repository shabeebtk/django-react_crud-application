export const userSignin = (user) => {
    return {
        type : 'USER_SIGNIN',
        payload : user
    };
};

export const userLogout = (user) =>{
    return {
        type : 'USER_LOGOUT',
    }
}

export const adminSignin = (user) => {
    return {
        type : 'ADMIN_SIGNIN',
        payload : user
    }
}

export const GET_ALL_USERS = 'GET_ALL_USERS';

export const getAllUsers = (users) =>{
    return {
        type : GET_ALL_USERS,
        payload : users
    }
}