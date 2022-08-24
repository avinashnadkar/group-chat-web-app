import axios from 'axios';

//change input state
export const signupInputHandler = (val,name) => {
    return {type:"handleSignupInput", payload : {value:val,name:name}}
}

//login form input state
export const loginInputHandler = (val,name)=>{
    return {type:'handleLoginInput', payload:{value:val,name:name}}
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

//login user network request
export function login(body) {

  return (dispatch) => {

    return axios.post('http://localhost:3001/user/login', body)
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

///Friends actions

//search friend input handler
export const handleSearchFriendInput = (val) => {
  return {type:'handleSearchFriendInput',  payload : {value:val}}
}

//set friends list 
export const setFriends = (payload) => {
  return {type : "setFriends", payload }
}

export const setMyFriends = (payload) => {
  return {type:'setMyFriends', payload}
}

//search friends 
export function searchFriend(body,headers) {

  return (dispatch) => {

    return axios.post('http://localhost:3001/user/search',body,headers)
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data.results))
      dispatch(setFriends(result))
    })
    .catch(function (error) {
      console.log(error.response.data.errorMsg);
    });

  };
}

//fetch friends
export function getFriends(body,headers) {

  return (dispatch) => {

    return axios.post('http://localhost:3001/user/friends',body,headers)
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data.results.friends))
      dispatch(setMyFriends(result))
    })
    .catch(function (error) {
      console.log(error.response.data.errorMsg);
    });

  };
}

///Group actions
export const handleCreateGroupInput = (val) => {
  return { type : "handleCreateGroupInput", payload: {value:val}}
}

export const handleAddMember = (val) => {
  return {type : 'addMembers', payload:val}
}

//create group
export function createGroup(body,headers) {

  return (dispatch) => {

    return axios.post('http://localhost:3001/group/create',body,headers)
    .then(function (response) {
      // let result = JSON.parse(JSON.stringify(response.data.results))
      // dispatch(setMyFriends(result))
      console.log(response)
    })
    .catch(function (error) {
      console.log(error.response.data.errorMsg);
    });

  };
}

//set my group list 
export const setMyGroups = (payload) => {
  return {type : "setMyGroups", payload }
}

//fetch my group
export function fetchMyGroups(email,headers){
  return (dispatch) => {
    return axios.get(`http://localhost:3001/group/?email=${email}`,headers)
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data.result))
      dispatch(setMyGroups(result.groups))
      // console.log(response.data.result.groups)
    })
    .catch(function (error) {
      console.log(error.response.data.errorMsg);
    });

  };
}