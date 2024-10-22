import axios from 'axios';

/*info : 
  followng urls value saved in .env file.
  Add REACT_APP_API_URL = <http://your-url> 
*/
let apiUrl = process.env.REACT_APP_API_URL;
console.log(apiUrl)


//Is User logged in
export const isUserLoggedIn = (payload) => {
  return { type: "isUserLoggedIn", payload }
}

//set user info after login and signup
export function setUserInfo(payload) {
  return { type: "setUserInfo", payload }
}

export function setLoginError(payload) {
  return { type: 'SET_LOGIN_ERROR',payload: payload};
}

export function clearLoginError() {
  return { type: 'CLEAR_LOGIN_ERROR'};
}

//signup user network request
export function signup(body) {

  return (dispatch) => {

    return axios.post(`${apiUrl}/user/signup`, body)
      .then(function (response) {
        dispatch(isUserLoggedIn(true))
        // console.log(response.data.results)
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

    return axios.post(`${apiUrl}/user/login`, body)
      .then(function (response) {
        if (response.data.status == "success") {
          dispatch(isUserLoggedIn(true))
          let result = JSON.parse(JSON.stringify(response.data.results))
          dispatch(setUserInfo(result))
        } else {
           let error = { emailErrorMsg: "", passwordErrorMsg: response.data.message  }
          dispatch(setLoginError(error));
          // console.log(response)
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  };
}


//logout user 
export function logoutUser() {
  return (dispatch) => {
    localStorage.removeItem('userData');
    dispatch(clearLoginError());
    dispatch(isUserLoggedIn(false))
  }
}

///Friends actions

//search friend input handler
export const handleSearchFriendInput = (val) => {
  return { type: 'handleSearchFriendInput', payload: { value: val } }
}

//set friends list 
export const setFriends = (payload) => {
  return { type: "setFriends", payload }
}

export const setMyFriends = (payload) => {
  return { type: 'setMyFriends', payload }
}

export const setFriendRequests = (payload) => {
  return { type: 'setFriendRequests', payload }
}

export const setFriendRequestsSent = (payload) => {
  return { type: 'setFriendRequestsSent', payload }
}

//fetch friends
export function getFriends(body, headers) {

  return (dispatch) => {

    return axios.get(`${apiUrl}/friends`, headers)
      .then(function (response) {
        // console.log(response)
        let result = JSON.parse(JSON.stringify(response.data.results))
        dispatch(setMyFriends(result.friends))
        dispatch(setFriendRequests(result.friendRequests))
        dispatch(setFriendRequestsSent(result.friendRequestsSent))
      })
      .catch(function (error) {
        console.log(error.response.data.errorMsg);
      });

  };
}

//send friend requests
export function sendFriendRequest(body, headers) {

  return (dispatch) => {

    return axios.post(`${apiUrl}/friends/add-friend`, body, headers)
      .then(function (response) {
        // Dispatch getFriends to fetch the updated friend list
        dispatch(getFriends(body, headers));
      })
      .catch(function (error) {
        console.log(error.response.data.errorMsg);
      });

  };
}

//cancel friend requests
export function cancelFriendRequest(body, headers) {

  return (dispatch) => {

    return axios.post(`${apiUrl}/friends/cancel-friend-request`, body, headers)
      .then(function (response) {
        // Dispatch getFriends to fetch the updated friend list
        dispatch(getFriends(body, headers));
      })
      .catch(function (error) {
        console.log(error.response.data.errorMsg);
      });

  };
}

//accept friend requests
export function acceptFriendRequest(body, headers) {

  return (dispatch) => {

    return axios.post(`${apiUrl}/friends/accept-friend-request`, body, headers)
      .then(function (response) {
        if (response.data.status == "success") {
          // Dispatch getFriends to fetch the updated friend list
          dispatch(getFriends(body, headers));
        }
      })
      .catch(function (error) {
        console.log(error.response.data.errorMsg);
      });

  };
}

//reject friend request
export function rejectFriendRequest(body, headers) {
  return (dispatch) => {

    return axios.post(`${apiUrl}/friends/reject-friend-request`, body, headers)
      .then(function (response) {
        if (response.data.status == "success") {
          // Dispatch getFriends to fetch the updated friend list
          dispatch(getFriends(body, headers));
        }
      })
      .catch(function (error) {
        console.log(error.response.data.errorMsg);
      });

  };
}




//create group
export function createGroup(body, headers) {

  return (dispatch) => {

    return axios.post(`${apiUrl}/group/create`, body, headers)
      .then(function (response) {

        if (response.data.status == "success") {
          dispatch(fetchMyGroups(headers));
        }
        return response.data;
      })
      .catch(function (error) {
        console.log(error.response.data.errorMsg);
        return null;
      });

  };
}

//add members to the group
export function addMembersToTheGroup(body, headers) {

  return (dispatch) => {

    return axios.post(`${apiUrl}/group/add-member`, body, headers)
      .then(function (response) {

        if (response.data.status == "success") {
          dispatch(fetchMyGroups(headers));
        }
        return response.data;
      })
      .catch(function (error) {
        console.log(error.response.data.errorMsg);
        return null;
      });

  };
}


//set my group list 
export const setMyGroups = (payload) => {
  return { type: "setMyGroups", payload }
}

//fetch my group
export function fetchMyGroups(headers) {
  return (dispatch) => {
    return axios.get(`${apiUrl}/group`, headers)
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


// set chatGroup action
export const setChatGroup = (payload) => {
  return { type: "setChatGroup", payload }
}

//fetch group by id
export function fetchGroupById(id, headers) {
  return (dispatch) => {
    return axios.get(`${apiUrl}/group/${id}`, headers)
      .then(function (response) {
        let result = JSON.parse(JSON.stringify(response.data.result))
        dispatch(setChatGroup(result.group))
        // console.log(response.data.result.groups)
      })
      .catch(function (error) {
        console.log(error.response.data.errorMsg);
      });

  };
}