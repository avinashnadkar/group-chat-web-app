const initState = {
    myGroups : [{name:"",members:[]}],
    chatGroup : {name:'', members:[]}
}

const groupReducer = (state = initState,action) => {

    if(action.type === "setMyGroups"){
        return{
            ...state,
            myGroups : [...action.payload]
        }
    }

    if(action.type === "setChatGroup"){
        return{
            ...state,
            chatGroup : {...action.payload}
        }
    }

    return state
}

export default groupReducer;