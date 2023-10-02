//Get user data from localstorage if any
let info = JSON.parse(localStorage.getItem("userData"));

let jwtToken = ""
let userId = ""
let userEmail = ""
let isUserLoggedIn = false

//if user info alredy exist
if (info) {
    jwtToken = info.token
    userId = info.u_id
    userEmail = info.email
    isUserLoggedIn = true
}

const userInfo = {
    u_id: userId,
    email: userEmail,
    token: jwtToken,
    isUserLoggedIn: isUserLoggedIn
}

const userInfoReducer = (state = userInfo, action) => {
    if (action.type === "isUserLoggedIn") {
        return {
            ...state,
            isUserLoggedIn: action.payload
        }
    }

    if (action.type === "setUserInfo") {
        console.log(action.payload)
        localStorage.setItem("userData", JSON.stringify(action.payload))
        return {
            ...state,
            ...action.payload
        }
    }

    return state;
}

export default userInfoReducer;