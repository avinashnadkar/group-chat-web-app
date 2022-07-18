import styles from "./ChatComponent.module.css";
import ReceivedMsg from "./ReceivedMsg";
import SendMsg from "./SendMsg";

const ChatWindow = (props) => {

    let dummyChats = [
      {
        senderName : 'notAdmin',
        time : '4.55pm',
        msg : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit distinctio error inventore incidunt velit quas iste dolor nulla quos, voluptates animi placeat, nostrum ipsam in dolores praesentium, odit at mollitia.'
      },
      {
        senderName : 'admin',
        time : '4.55pm',
        msg : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit distinctio error inventore incidunt velit quas iste dolor nulla quos, voluptates animi placeat, nostrum ipsam in dolores praesentium, odit at mollitia.'
      },
      {
        senderName : 'notAdmin',
        time : '4.55pm',
        msg : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit distinctio error inventore incidunt velit quas iste dolor nulla quos, voluptates animi placeat, nostrum ipsam in dolores praesentium, odit at mollitia.'
      },
      {
        senderName : 'admin',
        time : '4.55pm',
        msg : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit distinctio error inventore incidunt velit quas iste dolor nulla quos, voluptates animi placeat, nostrum ipsam in dolores praesentium, odit at mollitia.'
      },
      {
        senderName : 'notAdmin',
        time : '4.55pm',
        msg : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit distinctio error inventore incidunt velit quas iste dolor nulla quos, voluptates animi placeat, nostrum ipsam in dolores praesentium, odit at mollitia.'
      },
      {
        senderName : 'notAdmin',
        time : '4.55pm',
        msg : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit distinctio error inventore incidunt velit quas iste dolor nulla quos, voluptates animi placeat, nostrum ipsam in dolores praesentium, odit at mollitia.'
      },
      {
        senderName : 'admin',
        time : '4.55pm',
        msg : 'yes'
      },
      {
        senderName : 'admin',
        time : '4.55pm',
        msg : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit distinctio error inventore incidunt velit quas iste dolor nulla quos, voluptates animi placeat, nostrum ipsam in dolores praesentium, odit at mollitia.'
      },
      {
        senderName : 'admin',
        time : '4.55pm',
        msg : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit distinctio error inventore incidunt velit quas iste dolor nulla quos, voluptates animi placeat, nostrum ipsam in dolores praesentium, odit at mollitia.'
      },
      {
        senderName : 'admin',
        time : '4.55pm',
        msg : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit distinctio error inventore incidunt velit quas iste dolor nulla quos, voluptates animi placeat, nostrum ipsam in dolores praesentium, odit at mollitia.'
      }
    ]

    return(
        <div className={styles.ChatWindow}>

           <div className={styles.header}>
            <img src={props.groupProfilePic} alt="" className={styles.chatProfilePic}/>
            <h3>{props.groupName}</h3>
           </div>

           <div className={styles.chats}>
              {
                dummyChats.map((chat)=>{
                  if(chat.senderName === 'admin'){
                    return <SendMsg content={chat.msg}/>
                  }else{
                    return <ReceivedMsg content={chat.msg}/>
                  }
                })
              }
           </div>

           <div className={styles.sendMsg}>
              <div className={styles.emojiAndAttachment}></div>
              <input className={styles.inputBox} type='text' placeholder="Type a message" value={props.message} onChange={props.handleChange}/>
              <button className={styles.sendMsgBtn}>
                <svg viewBox="0 0 24 24" width="24" height="24" className={styles.sendBtnIcon}><path fill="currentColor" d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path></svg>
              </button>
           </div>

        </div>
    )
}

export default ChatWindow;