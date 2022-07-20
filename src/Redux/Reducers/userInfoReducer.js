
//Get user data from localstorage if any
let info = JSON.parse(localStorage.getItem("userData"));
let userInfo;

if(info){
    userInfo = {
        u_id : info.u_id,
        email : info.email,
        token : info.token,
        isUserLoggedIn : true
    }
}else{
    userInfo = {
        u_id : "",
        email : "",
        token : "",
        isUserLoggedIn : false
    }
}


const userInfoReducer = (state = userInfo, action) => {
    if(action.type === "isUserLoggedIn"){
        return {
            ...state,
            isUserLoggedIn : action.payload
        }
    }

    if(action.type === "setUserInfo"){
        console.log(action.payload)
        localStorage.setItem("userData",JSON.stringify(action.payload))
        return {
            ...state,
            ...action.payload
        }
    }

    return state;
}

export default userInfoReducer;