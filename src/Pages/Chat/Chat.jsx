import ChatWindow from "./ChatComponents/ChatWindow";
import OnlineUsers from "./ChatComponents/OnlineUsers";
import styles from "./Chat.module.css";
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { fetchGroupById } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";


const Chat = () => {

    // let dummyUsers = [
    //     {
    //         name : 'kakashi',
    //         isOnline : 'false',
    //         lastMessage: 'Last Message',
    //         newMsgCount : 2
    //     }
    // ]

    // dispatcher to despatch actions to reducers
    const dispatch = useDispatch();

    // get group id from url param
    const {groupId} = useParams()

    //state
    const userInfo = useSelector((state)=>state.userInfoReducer)
    const groupInfo  = useSelector((state)=>state.groupReducer)
    const [message,setMessage] = useState('')

    // //submit message
    const sendMessage = () => {

    }

    useEffect(()=>{
        dispatch(
            fetchGroupById(groupId,{
                headers: {
                    'X-auth-token' : userInfo.token,
                    'Content-Type': 'application/json'
                }
            })
        )

    },[userInfo,groupId,dispatch])

    return(
        <div className={styles.chat}>
           <OnlineUsers chatGroup={groupInfo.chatGroup.members}/>
           <ChatWindow 
              groupName={groupInfo.chatGroup.name}  
              groupProfilePic={"https://via.placeholder.com/300"} 
              message={message} 
              handleChange={(e)=> setMessage(e.target.value)}
              handleSubmit={sendMessage}
            />
        </div>
    )
}

export default Chat;