import styles from "./ChatComponent.module.css";
import {v4 as uuid} from 'uuid';

const OnlineUsers = (props) => {

    return(
        <div className={styles.users}>
            <div className={styles.userAccount}>
                <img src={"https://via.placeholder.com/300"} alt="" className={styles.chatProfilePic}/>
            </div>

            <div>
                <div className={styles.userSearchBar}>
                    <button className={styles.searchBtn}><svg viewBox="0 0 24 24" width="24" height="24" className=""><path fill="currentColor" d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"></path></svg></button>
                    <input type="text" placeholder="Search.." className={styles.inputBox}/>
                </div>
            </div>

            <div className={styles.userList}>
            {
                props.chatGroup.map((el)=>{
                    return(
                        <div className={styles.user} key={uuid()} onClick={() => props.onGroupClick(el)}>
                            <img src={"https://via.placeholder.com/300"} alt="" className={styles.chatProfilePic}/>
                            <div className={styles.userName}>
                                <p>{el.name}</p>
                                <p>{el.members.length}</p>
                            </div>
                            <div className={styles.msgCount}>

                            </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default OnlineUsers;