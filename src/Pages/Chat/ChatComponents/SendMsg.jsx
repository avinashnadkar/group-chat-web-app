import styles from "./ChatComponent.module.css";

const SendMsg = ({content}) => {
    return(
        <div className={styles.sendMessages}>
            {content}
        </div>
    )
}

export default SendMsg;