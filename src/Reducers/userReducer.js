const initState = {
    user: {},
    loggedIn: false
}

/*
user {
    Username: string,
    AuthToken: string
}
*/
const userReducer = (state = initState, action) => {
    console.log('test' + action);
    switch(action.type) {
        case 'ADD_USER_DATA':
            return {
                ...state,
                user: action.user,
            }
            break;
        case 'LOGIN':
            return {
                ...state,
                loggedIn: true
            }
            break;
    }
    return state;
}

export default userReducer;