const initState = {
    myFriends : [],
    friendRequests : [],
    friendRequestsSent : []
}

const friendsReducer = (state = initState,action) => {

    if(action.type === "setMyFriends"){
        return{
            ...state,
            myFriends : action.payload
        }
    }

    if(action.type === "setFriendRequests"){
        return{
            ...state,
            friendRequests : action.payload
        }
    }

    if(action.type === "setFriendRequestsSent"){
        return{
            ...state,
            friendRequestsSent : action.payload
        }
    }

    return state
}

export default friendsReducer;