import axios from 'axios';

//change input state
export const signupInputHandler = (val,name) => {
    return {type:"handleSignupInput", payload : {value:val,name:name}}
}

//Is User logged in
export const isUserLoggedIn = (payload) => {
    return {type : "isUserLoggedIn", payload }
}

//set user info after login and signup
export function setUserInfo(payload){
  return {type:"setUserInfo",payload}
}

//signup user network request
export function signup(body) {
    console.log('running')
    return (dispatch) => {

      return axios.post('http://localhost:3001/user/signup', body)
      .then(function (response) {
        dispatch(isUserLoggedIn(true))
        console.log(response.data.results)
        let result = JSON.parse(JSON.stringify(response.data.results))
        dispatch(setUserInfo(result))
      })
      .catch(function (error) {
        console.log(error);
      });

    };
}