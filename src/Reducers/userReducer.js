const initState = {
    user: {}
}

const userReducer = (state = initState, action) => {
    console.log('test' + action);
    switch(action.type) {
        case 'ADD_USER_DATA':
            return {
                ...state,
                user: action.user
            }
            break;
    }
    return state;
}

export default userReducer;