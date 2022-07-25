const initState = {
    password : "",
    email : ""
}

const loginReducer = (state = initState,action) => {

    if(action.type === "handleLoginInput"){

        return{
            ...state,
            [action.payload.name] : action.payload.value
        }
        // console.log(action.payload)
    }


    return state
}

export default loginReducer;