const initState = {
    email : "",
    friends : [],
    myFriends : []
}

const friendsReducer = (state = initState,action) => {

    if(action.type === "handleSearchFriendInput"){

        return{
            ...state,
            email : action.payload.value
        }
        // console.log(action.payload)
    }

    if(action.type === "setFriends"){
        return{
            ...state,
            friends : [action.payload]
        }
    }

    if(action.type === "setMyFriends"){
        return{
            ...state,
            myFriends : action.payload
        }
    }

    return state
}

export default friendsReducer;