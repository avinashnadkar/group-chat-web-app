import Navbar from "../Dashboard/DashboardComponents/Navbar";
import { useSelector } from "react-redux";
import styles from "./Groups.module.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GroupAddIcon from '@mui/icons-material/GroupAdd';


const Groups = () => {

    //state
    const userInfo = useSelector((state)=>state.userInfoReducer)

    let yourDummyGroups = [{
        name : 'chai tapri',
        createdOn : '2 Dec 2021',
        newMsgCount : 4,
        lastMsg : {usename:'devil',msg: 'Hi, is anyone online for chat ?'},
        memberCount : 3,
        groupPicture : 'https://via.placeholder.com/150'
    },{
        name : 'chai tapri',
        createdOn : '2 Dec 2021',
        newMsgCount : 4,
        lastMsg : {usename:'devil',msg: 'Hi, is anyone ?'},
        memberCount : 3,
        groupPicture : 'https://via.placeholder.com/150'
    },
    {
        name : 'chai tapri',
        createdOn : '2 Dec 2021',
        newMsgCount : 4,
        lastMsg : {usename:'devil',msg: 'Hi, is anyone online for chat ?'},
        memberCount : 3,
        groupPicture : 'https://via.placeholder.com/150'
    },
    {
        name : 'chai tapri',
        createdOn : '2 Dec 2021',
        newMsgCount : 4,
        lastMsg : {usename:'devil',msg: 'Hi, is anyone online for chat ?'},
        memberCount : 3,
        groupPicture : 'https://via.placeholder.com/150'
    }
    ]

    return(
        <div>
            <Navbar userEmail={userInfo.email}/>
            <main>
                <div className={styles.groupContainer}>
                    <div className={styles.createGroup}>
                        <input type="text" name='name' placeholder="Enter name.."/>
                        <button>Create group</button>
                    </div>

                    <div className={styles.yourGroups}>
                        {
                            yourDummyGroups.map((group)=>{
                                return(
                                    <div className={styles.group}>
                                        <img src={group.groupPicture}/>
                                        <div className={styles.groupInformation}>
                                           <p>{group.name}</p>
                                           <p>Total members : {group.memberCount}</p>
                                           <p>Latest message : {group.lastMsg.msg}</p>
                                        </div>
                                        <button className={styles.groupOptions}><MoreVertIcon/></button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className={styles.globalChatRooms}>
                    <div className={styles.searchGroup}>
                        <input type="text" name='name' placeholder="Search global chat room.."/>
                        <button>Search group</button>
                    </div>

                    <div className={styles.yourGroups}>
                        {
                            yourDummyGroups.map((group)=>{
                                return(
                                    <div className={styles.group}>
                                        <img src={group.groupPicture}/>
                                        <div className={styles.groupInformation}>
                                           <p>{group.name}</p>
                                           <p>Total members : {group.memberCount}</p>
                                           <p>Latest message : {group.lastMsg.msg}</p>
                                        </div>
                                        <button className={styles.joinGroup}> <GroupAddIcon/></button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Groups;