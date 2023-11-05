import Navbar from "../Dashboard/DashboardComponents/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import styles from "./Groups.module.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { addMembersToTheGroup, fetchMyGroups, handleCreateGroupInput } from "../../Redux/actions";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { getFriends, createGroup } from "../../Redux/actions";
import { v4 as uuid } from 'uuid'
import { Link } from "react-router-dom";


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
    const userInfo = useSelector((state) => state.userInfoReducer)
    const groupsInfo = useSelector((state) => state.groupReducer)
    const friendsInfo = useSelector((state) => state.friendsReducer)

    //local state
    const [groupName, setGroupName] = useState("");
    const [isGroupCreated, setIsGroupCreated] = useState(false);
    const [isMemberAdded, setIsMemberAdded] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [validationMsg, setValidationMsg] = useState("");
    const [groupId, setGroupId] = useState("");
    const [membersToBeAdded, setMemmbersToBeAdded] = useState([])

    //state for toggling modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setSuccessMsg("");
        setIsMemberAdded(false);
        setMemmbersToBeAdded([])
        setValidationMsg("");
        setGroupId("");
        setGroupName("");
        setIsGroupCreated(false);
        setOpen(false);
    };

    //dispatcher to dispatch actions to reducers
    const dispatch = useDispatch()

    //fetch friends
    useEffect(() => {
        //fetch groups
        dispatch(fetchMyGroups({
            headers: {
                'X-auth-token': userInfo.token,
                'Content-Type': 'application/json'
            }
        }))

    }, [userInfo, dispatch])

    //handle create group
    const handleCreateGroup = () => {

        dispatch(createGroup({ groupName: groupName }, {
            headers: {
                'X-auth-token': userInfo.token,
                'Content-Type': 'application/json'
            }
        })).then((response) => {
            if (response) {
                if (response.status === 'success') {
                    setIsGroupCreated(true)
                    setGroupId(response.results.groupId)
                    setValidationMsg("");
                } else {
                    setValidationMsg(response.message)
                }
            }

        });
    }

    const handleToggleAddMember = (e, groupId, flagToAdd) => {

        if (flagToAdd) {
            setMemmbersToBeAdded([...membersToBeAdded, e._id]);
        } else {
            const updatedMembers = membersToBeAdded.filter((id) => id !== e._id);
            setMemmbersToBeAdded(updatedMembers);
        }

        setValidationMsg("")
    }

    const handleAddFriends = () => {

        if(membersToBeAdded.length == 0){
           setValidationMsg("Please add atleast one member.")
        }else{
            dispatch(addMembersToTheGroup({ members: membersToBeAdded, groupId: groupId }, {
                headers: {
                    'X-auth-token': userInfo.token,
                    'Content-Type': 'application/json'
                }
            })).then((response) => {
                if (response) {
                    if (response.status === 'success') {
                        setIsMemberAdded(true)
                        setValidationMsg("");
                        setSuccessMsg(response.message)
                    } else {
                        setValidationMsg(response.message)
                    }
                }
    
            });
        }

    }


    return (
        <div>
            <Navbar userEmail={userInfo.email} />
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
                                <p className={styles.errorMessage}>{validationMsg}</p>
                                <div>
                                    {
                                        !isGroupCreated ? <>
                                            <input type="text" name='name' 
                                                   value={groupName} placeholder="Enter group name.." 
                                                   onChange={(e) => setGroupName(e.target.value)} 
                                                   className={styles.groupNameInputBox}/>
                                            <button onClick={handleCreateGroup} className={styles.createGroupBtn}>Create group</button>
                                        </> : <></>}
                                    {/* if group created then show friends to add in group */}
                                    {
                                        isGroupCreated ? <>
                                            {
                                                !isMemberAdded ? <>
                                                    <h4> Add members </h4>
                                                    {
                                                        // groupName.myGroups.map(el=>{
                                                        //     return el.name == groupName
                                                        // }).members.map(el=>{

                                                        // })
                                                        friendsInfo.myFriends.map((el) => {

                                                            let isAdded = membersToBeAdded.some((idTobeAdded) => idTobeAdded === el._id)

                                                            return (
                                                                <div className={styles.addMembers} key={uuid()}>
                                                                    <p>{el.email}</p>
                                                                    {isAdded ?
                                                                        <button onClick={() => handleToggleAddMember(el, groupId, false)} className={styles.removeBtn}>-</button>
                                                                        :
                                                                        <button onClick={() => handleToggleAddMember(el, groupId, true)} className={styles.addBtn}>+</button>
                                                                    }
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    <div>
                                                        <button className={styles.addFriendsSubmirBtn} onClick={handleAddFriends}>Submit</button>
                                                        <button className={styles.cancelBtn} onClick={handleClose}>Cancel</button>
                                                    </div>
                                                </> : <>
                                                    <h3 className={styles.successMsg}>Members added successfully.</h3>
                                                    <button onClick={handleClose} className={styles.okBtn}>OK</button>
                                                </>
                                            }
                                        </> : <></>
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
                                groupsInfo.myGroups.map((group) => {
                                    return (
                                        <div className={styles.group} key={uuid()}>
                                            <Link to={`/chat/${group._id}`}>
                                                {/* <img src={group.groupPicture}/> */}
                                                <div className={styles.groupInformation}>
                                                    <p>{group.name}</p>
                                                    {/* <p>Total members : {group.members.length}</p> */}
                                                    {/* <p>Latest message : {group.lastMsg.msg}</p> */}
                                                </div>
                                            </Link>
                                            <button className={styles.groupOptions}><MoreVertIcon /></button>
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