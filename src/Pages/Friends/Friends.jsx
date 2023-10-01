import Navbar from "../Dashboard/DashboardComponents/Navbar";
import styles from "./Friends.module.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { handleSearchFriendInput, searchFriend, getFriends } from "../../Redux/actions";
import { useDispatch,useSelector } from "react-redux";
import {v4 as uuid} from 'uuid';
import { useEffect } from "react";

const Friends = () => {
    //state
    const userInfo = useSelector((state)=>state.userInfoReducer)

    //friends state
    const friends = useSelector((state)=>state.friendsReducer)

    //dispatcher to dispatch action to reducers
    const dispatch = useDispatch()

    //search friend
    const handleSearch = () => {
        dispatch(searchFriend({
            'email' : friends.email
        },{
            headers: {
                'X-auth-token' : userInfo.token,
                'Content-Type': 'application/json'
            }
        }))
    }

    //fetch friends
    useEffect(()=>{
        dispatch(getFriends({
            'email' : userInfo.email
        },{
            headers: {
                'X-auth-token' : userInfo.token,
                'Content-Type': 'application/json'
            }
        }))
    },[userInfo,dispatch])

    return(
        <>
            <Navbar userEmail={userInfo.email}/>
            <main>
                <div className={styles.friendContainer}>
                    <div className={styles.searchFriendContainer}>
                        <div className={styles.searchFriends}>
                            <input type="text" name='name' placeholder="Enter email.." value={friends.email} onChange={(e)=>dispatch(handleSearchFriendInput(e.target.value))}/>
                            <button onClick={handleSearch}>Search friends</button>
                        </div>

                        {
                            friends.friends.map((el)=>{
                                return (
                                    <div className={styles.friend} key={uuid()}>
                                        {/* <img src={el.profilePicture}/> */}
                                        <div className={styles.friendInformation}>
                                            <p>{el.email}</p>
                                        </div>
                                        <button className={styles.friendOptions}><GroupAddIcon/></button>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className={styles.friendCard}>
                        <div className={styles.cardTitle}>
                            <h2>Total friends {friends.myFriends.length}</h2>
                        </div>
                        <div className={styles.friends}>
                            {
                                friends.myFriends.map((friend)=>{
                                    return(
                                        <div className={styles.friend} key={uuid()}>
                                            {/* <img src={friend.profilePicture}/> */}
                                            <div className={styles.friendInformation}>
                                                <p>{friend.email}</p>
                                                {/* <p>Latest message : {friend.lastMsg.msg}</p> */}
                                            </div>
                                            <button className={styles.friendOptions}><MoreVertIcon/></button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Friends