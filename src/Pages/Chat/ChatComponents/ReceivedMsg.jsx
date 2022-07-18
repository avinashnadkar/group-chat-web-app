import styles from "./ChatComponent.module.css";

const ReceivedMsg = ({content}) => {
    return(
       <div className={styles.receivedMessages}>
            {content}
       </div>
    )
}

export default ReceivedMsg;