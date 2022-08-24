const initState = {
    createGroupInput : {groupName:'',members:[]},
    myGroups : [],
    findGroups : []
}

const groupReducer = (state = initState,action) => {

    if(action.type === "handleCreateGroupInput"){

        return{
            ...state,
            createGroupInput : {groupName : action.payload.value , members:[...state.createGroupInput.members]}
        }
        // console.log(action.payload)
    }

    if(action.type === "addMembers"){
        let members = state.createGroupInput.members
        return{
            ...state,
            createGroupInput :  {groupName : state.createGroupInput.groupName, members: [...members, action.payload]}
        }
    }

    if(action.type === "setMyGroups"){
        return{
            ...state,
            myGroups : [...action.payload]
        }
    }

    return state
}

export default groupReducer;