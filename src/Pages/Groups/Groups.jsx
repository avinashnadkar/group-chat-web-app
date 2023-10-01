import Navbar from "../Dashboard/DashboardComponents/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import styles from "./Groups.module.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { fetchMyGroups, handleCreateGroupInput } from "../../Redux/actions";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { getFriends, handleAddMember,createGroup } from "../../Redux/actions";
import {v4 as uuid} from 'uuid'
import { Link, useLocation } from "react-router-dom";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const Groups = () => {

    //state
    const userInfo = useSelector((state)=>state.userInfoReducer)
    const groupsInfo  = useSelector((state)=>state.groupReducer)
    const friendsInfo = useSelector((state)=>state.friendsReducer)

    //location
    const location = useLocation()
    console.log(location)

    //state for toggling modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //dispatcher to dispatch actions to reducers
    const dispatch = useDispatch()

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

        //fetch groups
        dispatch(fetchMyGroups(userInfo.email,{
            headers: {
                'X-auth-token' : userInfo.token,
                'Content-Type': 'application/json'
            }
        }))


    },[userInfo,dispatch])

    //handle create group
    const handleCreateGroup = () => {

        dispatch(createGroup({
            groupName : groupsInfo.createGroupInput.groupName,
            u_id : userInfo.u_id,
            members : [...groupsInfo.createGroupInput.members, {email:userInfo.email, _id:userInfo._id, isAdmin: true}]
        },{
            headers: {
                'X-auth-token' : userInfo.token,
                'Content-Type': 'application/json'
            }
        }))
    }


    return(
            <div>
                <Navbar userEmail={userInfo.email}/>
                <main>
            
                    <div className={styles.groupContainer}>
                        <div className={styles.groupCard}>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <h2> Create group </h2>
                                    <div>
                                        <input type="text" name='name' value={groupsInfo.createGroupInput.groupName} placeholder="Enter name.." onChange={(e)=>dispatch(handleCreateGroupInput(e.target.value))}/>
                                        <button onClick={handleCreateGroup}>Create group</button>
                                        <h4> Add members </h4>
                                        {
                                        friendsInfo.myFriends.map((el)=>{
                                            return (
                                                <div className={styles.addMembers} key={uuid()}>
                                                    <p>{el.email}</p>
                                                    <button onClick={()=>dispatch(handleAddMember(el))}>+</button>
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                                    </Box>
                            </Modal>
            
                            <div className={styles.groupCardTitle}>
                                <h3>Your groups</h3>
                                <button onClick={handleOpen}>Add group</button>
                            </div>
                            
                            <div className={styles.groups}>

                                {
                                    groupsInfo.myGroups.map((group)=>{
                                        return(
                                            <div className={styles.group}>
                                                <Link to={`/chat/${group._id}`} key={uuid()}>
                                                    {/* <img src={group.groupPicture}/> */}
                                                    <div className={styles.groupInformation}>
                                                        <p>{group.name}</p>
                                                        <p>Total members : {group.members.length}</p>
                                                        {/* <p>Latest message : {group.lastMsg.msg}</p> */}
                                                    </div>
                                                </Link>
                                                <button className={styles.groupOptions}><MoreVertIcon/></button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>


                    <div className={styles.globalChatRooms}>
                        {/* <div className={styles.searchGroup}>
                            <input type="text" name='name' placeholder="Search global chat room.."/>
                            <button>Search group</button>
                        </div>

                        <div className={styles.groups}>
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
                        </div> */}
                    </div>
            
                </main>
            </div>
    )
}

export default Groups;