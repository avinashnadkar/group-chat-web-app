import Navbar from "../Dashboard/DashboardComponents/Navbar";
import { useSelector } from "react-redux";
import styles from "./Friends.module.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const Friends = () => {
    //state
    const userInfo = useSelector((state)=>state.userInfoReducer)

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

    return(
        <>
            <Navbar userEmail={userInfo.email}/>
            <main>
            <div className={styles.friendContainer}>

                <div className={styles.searchFriends}>
                    <input type="text" name='name' placeholder="Enter email.."/>
                    <button>Search friends</button>
                </div>

                <h2>Your Friends</h2>

                <div className={styles.yourFriends}>
                    {
                        yourDummyFriend.map((group)=>{
                            return(
                                <div className={styles.friend}>
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