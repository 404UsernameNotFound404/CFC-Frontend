const initState = {
    searchBar: ''
}

const searchPageReducer = (state = initState, action) => {
    console.log('test' + action);
    switch(action.type) {
        case 'UPDATE_SEARCH_BAR':
            console.log(action);
            return {
                ...state,
                searchBar: action.search
            }
            break;
    }
    return state;
}

export default searchPageReducer;