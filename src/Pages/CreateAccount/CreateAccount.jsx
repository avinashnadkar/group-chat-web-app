import { Link } from "react-router-dom";
import styles from "./CreateAccount.module.css";
import googleIcon from "../../Assets/google.png"

const CreateAccount = () => {
    return(
        <div className={styles.signupPage}>
            <div className={styles.signupForm}>
                <h2>Create account</h2>
                <div className={styles.inputBox}>
                   <label>Enter email</label><br/>
                   <input type="email" name="email" placeholder="Email"/>
                </div>
                <div className={styles.inputBox}>
                   <label>Enter password</label><br/>
                   <input type="password" name="password" placeholder="Password"/>
                </div>
                <div className={styles.inputBox}>
                   <label>Enter password Again</label><br/>
                   <input type="password" name="password" placeholder="Retype password"/>
                </div>
                <button className={styles.submitBtn}>Create account</button>

                <div className={styles.divider}>
                    <span className={styles.line}></span><p>Or</p><span className={styles.line}></span>
                </div>
                <div className={styles.googleAuthBtn}>
                   <button> <img src={googleIcon} alt=""/> Signup using google</button>
                </div>
                <p className={styles.loginLink}>Already have an account ? <Link to="/login">Login to account</Link></p>
            </div>
        </div>
    )
}

export default CreateAccount;