import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import googleIcon from "../../Assets/google.png"
import { useEffect } from "react";
import {  useSelector } from "react-redux";


const Login = () => {

    //state
    const userInfo = useSelector((state)=>state.userInfoReducer)
    const isAuth = userInfo.isUserLoggedIn;

    //Redirect to previous page if user is already logged in
    let navigate = useNavigate();
    useEffect(() => {
        if (isAuth) {
            navigate(-1);
        }
    },[isAuth,navigate])

    return(
        <div className={styles.loginPage}>
            <div className={styles.loginForm}>
                <h2>Login</h2>
                <div className={styles.inputBox}>
                   <label>Enter email</label><br/>
                   <input type="email" name="email" placeholder="Email"/>
                </div>
                <div className={styles.inputBox}>
                   <label>Enter password</label><br/>
                   <input type="password" name="password" placeholder="Password"/>
                </div>
                <button className={styles.submitBtn}>Login</button>
                <p className={styles.forgotPassword}><Link to="/retrieve-password">Forgot your password?</Link></p>
                <div className={styles.divider}>
                    <span className={styles.line}></span><p>Or</p><span className={styles.line}></span>
                </div>
                <div className={styles.googleAuthBtn}>
                   <button> <img src={googleIcon} alt=""/> login using google</button>
                </div>
                <p className={styles.signupLink}>Don't have any account yet ? <Link to="/create-account">Create account</Link></p>
            </div>
        </div>
    )
}

export default Login;