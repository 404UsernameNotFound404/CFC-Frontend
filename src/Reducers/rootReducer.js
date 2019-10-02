const initState = {
    posts: [
        {id: 0, title: 'one', body: 'B!'},
        {id: 1, title: 'two', body: 'B@'},
        {id: 2, title: 'three', body: 'B#'}
    ],
    user: {}
}

const rootReducer = (state = initState, action) => {
    console.log('test' + action);
    switch(action.type) {
        case 'DELETE_POST': 
            console.log('deleting post')
            break;
        case 'ADD_USER_DATA':
            return {
                ...state,
                user: action.user
            }
            break;
    }
    return state;
}

export default rootReducer;