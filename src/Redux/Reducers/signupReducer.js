const initState = {
    password : "",
    passwordTwo : "", 
    email : ""
}

const signupReducer = (state = initState,action) => {

    if(action.type === "handleSignupInput"){

        return{
            ...state,
            [action.payload.name] : action.payload.value
        }
        // console.log(action.payload)
    }


    return state
}

export default signupReducer;