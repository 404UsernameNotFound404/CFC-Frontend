import Cookie from 'js-cookie'

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
    switch (action.type) {
        case 'ADD_USER_DATA':
            return {
                ...state,
                user: action.user,
            }
            break;
        case 'LOGIN':
            const { JWTToken, UserID } = action.loginInfo;
            Cookie.set("authToken", JWTToken)
            if (JWTToken.length > 1) {
                return {
                    ...state,
                    user: { AuthToken: JWTToken, UserID },
                    loggedIn: true
                }
            } else {
                return {
                    ...state,
                    user: { AuthToken: JWTToken },
                    loggedIn: false
                }
            }
            break;
    }
    return state;
}

export default userReducer;