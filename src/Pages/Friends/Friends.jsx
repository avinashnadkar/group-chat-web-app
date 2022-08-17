import Navbar from "../Dashboard/DashboardComponents/Navbar";
import styles from "./Friends.module.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { handleSearchFriendInput, searchFriend } from "../../Redux/actions";
import { useDispatch,useSelector } from "react-redux";
import {v4 as uuid} from 'uuid';

const Friends = () => {
    //state
    const userInfo = useSelector((state)=>state.userInfoReducer)

    //friends state
    const friends = useSelector((state)=>state.friendsReducer)

    //dispatcher to dispatch action to reducers
    const dispatch = useDispatch()

    let yourDummyFriend = [{
        name : 'User@gmail.com',
        lastMsg : {usename:'devil',msg: 'Hi, is anyone online for chat ?'},
        groupPicture : 'https://via.placeholder.com/150'
    },{
        name : 'UserTwo@gmail.com',
        lastMsg : {usename:'devil',msg: 'Hi, is anyone ?'},
        groupPicture : 'https://via.placeholder.com/150'
    },
    {
        name : 'UserThree@hotmail.com',
        lastMsg : {usename:'devil',msg: 'Hi, is anyone online for chat ?'},
        groupPicture : 'https://via.placeholder.com/150'
    },
    {
        name : 'UserFour@yahoo.com',
        lastMsg : {usename:'devil',msg: 'Hi, is anyone online for chat ?'},
        groupPicture : 'https://via.placeholder.com/150'
    }
    ]

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

    return(
        <>
            <Navbar userEmail={userInfo.email}/>
            <main>
            <div className={styles.friendContainer}>

                <div className={styles.searchFriends}>
                    <input type="text" name='name' placeholder="Enter email.." value={friends.email} onChange={(e)=>dispatch(handleSearchFriendInput(e.target.value))}/>
                    <button onClick={handleSearch}>Search friends</button>
                </div>

                {
                    friends.friends.map((el)=>{
                        return (
                            <div className={styles.searchedFriend} key={uuid()}>
                                <img src={el.profilePicture}/>
                                <div className={styles.friendInformation}>
                                    <p>{el.email}</p>
                                </div>
                                <button className={styles.friendOptions}><GroupAddIcon/></button>
                            </div>
                        )
                    })
                }

                <h2>Your Friends {friends.myFriends.length}</h2>

                <div className={styles.yourFriends}>
                    {
                        yourDummyFriend.map((group)=>{
                            return(
                                <div className={styles.friend} key={uuid()}>
                                    <img src={group.groupPicture}/>
                                    <div className={styles.friendInformation}>
                                        <p>{group.name}</p>
                                        <p>Latest message : {group.lastMsg.msg}</p>
                                    </div>
                                    <button className={styles.friendOptions}><MoreVertIcon/></button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            </main>
        </>
    )
}

export default Friends