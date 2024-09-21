const initState = {
    validationErrorsMsg: { emailErrorMsg: "", passwordErrorMsg: "" },
}

const authReducer = (state = initState,action) => {

    if(action.type === "SET_LOGIN_ERROR"){
        return{
            ...state,
            validationErrorsMsg: action.payload,
        }
    }

    if(action.type === "CLEAR_LOGIN_ERROR"){
        return{
            ...state,
            validationErrorsMsg: initState,
        }
    }

    return state
}

export default authReducer;