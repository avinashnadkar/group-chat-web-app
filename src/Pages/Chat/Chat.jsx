import ChatWindow from "./ChatComponents/ChatWindow";
import OnlineUsers from "./ChatComponents/OnlineUsers";
import styles from "./Chat.module.css";

const Chat = () => {
    return(
        <div className={styles.chat}>
           <OnlineUsers/>
           <ChatWindow groupName={"My Group"} groupProfilePic={"https://via.placeholder.com/300"}/>
        </div>
    )
}

export default Chat;