const initState = {
    myFriends : []
}

const friendsReducer = (state = initState,action) => {

    if(action.type === "setMyFriends"){
        return{
            ...state,
            myFriends : action.payload
        }
    }

    return state
}

export default friendsReducer;