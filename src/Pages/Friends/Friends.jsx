import Navbar from "../Dashboard/DashboardComponents/Navbar";
import styles from "./Friends.module.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { getFriends, sendFriendRequest,cancelFriendRequest, acceptFriendRequest, rejectFriendRequest } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from "react";
import axios from "axios";
/*info : 
  followng urls value saved in .env file.
  Add REACT_APP_API_URL = <http://your-url> 
*/
const apiUrl = process.env.REACT_APP_API_URL;

const Friends = () => {
    //state
    const userInfo = useSelector((state) => state.userInfoReducer)

    //friends state
    const friendsState = useSelector((state) => state.friendsReducer)

    //state of search friends list
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    //dispatcher to dispatch action to reducers
    const dispatch = useDispatch()

    //search friend
    const handleSearch = () => {

        const body = { 'email': searchQuery }

        axios.post(`${apiUrl}/friends/search`, body, {
            headers: {
                'X-auth-token': userInfo.token,
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            let result = JSON.parse(JSON.stringify(response.data.results))
            setSearchResult(result.users);
        }).catch(function (error) {
            console.log(error.response.data.errorMsg);
        });

    }

    //accept friend reauest 
    const acceptFriendRequestHandler = (friendsId) => {
        dispatch(acceptFriendRequest({
            "id": friendsId
        }, {
            headers: {
                'X-auth-token': userInfo.token,
                'Content-Type': 'application/json'
            }
        }))
    }

    //reject friend reauest 
    const rejectFriendRequestHandler = (friendsId) => {
        dispatch(rejectFriendRequest({
            "id": friendsId
        }, {
            headers: {
                'X-auth-token': userInfo.token,
                'Content-Type': 'application/json'
            }
        }))
    }

    //send friend reauest 
    const sendFriendRequestHandler = (friendsId) => {
        dispatch(sendFriendRequest({
            "id": friendsId
        }, {
            headers: {
                'X-auth-token': userInfo.token,
                'Content-Type': 'application/json'
            }
        }))
    }

    //cancel friend reauest 
    const cancelFriendRequestHandler = (friendsId) => {
        dispatch(cancelFriendRequest({
            "id": friendsId
        }, {
            headers: {
                'X-auth-token': userInfo.token,
                'Content-Type': 'application/json'
            }
        }))
    }

    //fetch friends
    useEffect(() => {
        dispatch(getFriends({
            'email': userInfo.email
        }, {
            headers: {
                'X-auth-token': userInfo.token,
                'Content-Type': 'application/json'
            }
        }))
    }, [userInfo, dispatch])

    return (
        <>
            <Navbar userEmail={userInfo.email} />
            <main>
                <div className={styles.friendContainer}>
                    {/* <div className={styles.searchFriendContainer}>
                        <div className={styles.searchFriends}>
                            <input type="text" name='name' placeholder="Enter email.." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            <button onClick={handleSearch}>Search friends</button>
                        </div> */}

                        {
                            searchResult.map((el) => {
                                return (
                                    <div className={styles.friend} key={uuid()}>
                                        {/* <img src={el.profilePicture}/> */}
                                        <div className={styles.friendInformation}>
                                            <p>{el.email}</p>
                                        </div>
                                        {friendsState.myFriends.some((myFriend) => myFriend._id === el._id) ? (
                                            <button className={styles.friendOptions}><MoreVertIcon /></button>
                                        ) : friendsState.friendRequests.some(friendRequest => friendRequest._id === el._id) ? (
                                            <div>
                                                <button className={styles.acceptButton} onClick={() => acceptFriendRequestHandler(el._id)}> Accept </button>
                                                <button className={styles.rejectButton} key={el._id} onClick={() => rejectFriendRequestHandler(el._id)}>Reject</button>
                                            </div>
                                        ) : friendsState.friendRequestsSent.some(friendRequestSent => friendRequestSent._id === el._id) ? (
                                            <div>
                                                <button className={styles.rejectButton} key={el._id} onClick={() => cancelFriendRequestHandler(el._id)}>Cancel</button>
                                            </div>
                                        ) : (
                                            <button className={styles.friendOptions} onClick={() => sendFriendRequestHandler(el._id)}>
                                                <GroupAddIcon />
                                            </button>
                                        )}
                                    </div>

                                )
                            })
                        }
                    {/* </div> */}

                    <div className={styles.friendCardContainer}>

                        <div className={styles.friendCard}>
                            <div className={styles.cardTitle}>
                                <h2>Friends requests {friendsState.friendRequests.length}</h2>
                            </div>
                            <div className={styles.friends}>
                                {
                                    friendsState.friendRequests.map((friend) => {
                                        return (
                                            <div className={styles.friend} key={uuid()}>
                                                {/* <img src={friend.profilePicture}/> */}
                                                <div className={styles.friendInformation}>
                                                    <p>{friend.email}</p>
                                                    {/* <p>Latest message : {friend.lastMsg.msg}</p> */}
                                                </div>
                                                <div>
                                                    <button className={styles.acceptButton} onClick={() => acceptFriendRequestHandler(friend._id)}> Accept </button>
                                                    <button className={styles.rejectButton} onClick={() => rejectFriendRequestHandler(friend._id)}>Reject</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className={styles.friendCard}>
                            <div className={styles.cardTitle}>
                                <h2>Total friends {friendsState.myFriends.length}</h2>
                            </div>
                            <div className={styles.friends}>
                                {
                                    friendsState.myFriends.map((friend) => {
                                        return (
                                            <div className={styles.friend} key={uuid()}>
                                                {/* <img src={friend.profilePicture}/> */}
                                                <div className={styles.friendInformation}>
                                                    <p>{friend.email}</p>
                                                    {/* <p>Latest message : {friend.lastMsg.msg}</p> */}
                                                </div>
                                                <button className={styles.friendOptions}><MoreVertIcon /></button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                    </div>

                </div>
            </main >
        </>
    )
}

export default Friends