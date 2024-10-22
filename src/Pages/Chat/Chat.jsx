import ChatWindow from "./ChatComponents/ChatWindow";
import OnlineUsers from "./ChatComponents/OnlineUsers";
import styles from "./Chat.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMyGroups } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import BlankChatWindow from "./ChatComponents/BlankChatWindow";

const Chat = () => {
  /*info : 
  followng urls value saved in .env file.
  Add REACT_APP_API_URL = <http://your-url> 
  */
  let apiUrl = process.env.REACT_APP_API_URL;

  // dispatcher to despatch actions to reducers
  const dispatch = useDispatch();

  // get group id from url param
  const { groupId } = useParams();

  //state
  const userInfo = useSelector((state) => state.userInfoReducer);
  const groupInfo = useSelector((state) => state.groupReducer);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [flagOpenChat, setOpenChat] = useState(false);

  // //submit message
  const sendMessage = (groupId) => {
    if (socket) {
      socket.emit("chat message", groupId, userInfo.u_id, message);
      setMessage("");
    }
  };

  const connectToSocket = (groupId) => {
    if (!socket) {
      const newSocket = io(apiUrl, {
        transports: ["websocket"],
        query: { token: userInfo.token },
      });

      // Event listeners for socket
      newSocket.on("connect", () => {
        console.log("Connected to server");
      });

      newSocket.on("disconnect", () => {
        console.log("Disconnected from server");
      });

      newSocket.emit("joinGroup", groupId, userInfo.u_id);

      newSocket.on("chat message", (msg) => {
        // Handle incoming messages
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

      setSocket(newSocket);
    }
  };

  const handleGroupClick = (group) => {
    setCurrentGroup(group);
    setOpenChat(true); // Set flag to display chat window
    connectToSocket(group._id);
  };

  useEffect(() => {
    dispatch(
      fetchMyGroups({
        headers: {
          "X-auth-token": userInfo.token,
          "Content-Type": "application/json",
        },
      })
    );

    // Clean up the socket connection when the component unmounts
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [userInfo.token, dispatch, socket]);

  return (
    <div className={styles.chat}>
      <OnlineUsers
        chatGroup={groupInfo.myGroups}
        onGroupClick={handleGroupClick}
      />

      {!flagOpenChat ? (
        <BlankChatWindow />
      ) : (
        <ChatWindow
          groupName={groupInfo.myGroups.name}
          groupProfilePic={"https://via.placeholder.com/300"}
          message={message}
          messages={messages}
          u_id={userInfo.u_id}
          handleChange={(e) => setMessage(e.target.value)}
          handleSubmit={() => sendMessage(currentGroup._id)}
        />
      )}
    </div>
  );
};

export default Chat;