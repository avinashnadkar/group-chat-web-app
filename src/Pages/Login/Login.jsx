import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import googleIcon from "../../Assets/google.png"
import { useEffect } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { loginInputHandler,login } from "../../Redux/actions";

const Login = () => {

    //state
    const userInfo = useSelector((state)=>state.userInfoReducer)
    const loginInput = useSelector((state)=>state.loginReducer)
    const isAuth = userInfo.isUserLoggedIn;

    //dispatcher to dispath actions
    const dispatch = useDispatch()

    //register user
    const loginUser = () => {
        dispatch(login({
            email : loginInput.email,
            password : loginInput.password,
        }))
    }

    //Redirect to previous page if user is already logged in
    let navigate = useNavigate();
    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    },[isAuth,navigate])

    return(
        <div className={styles.loginPage}>
            <div className={styles.loginForm}>
                <h2>Login</h2>
                <div className={styles.inputBox}>
                   <label>Enter email</label><br/>
                   <input type="email" name="email" placeholder="Email" value={loginInput.email} onChange={(e)=>{dispatch(loginInputHandler(e.target.value,e.target.name))}}/>
                </div>
                <div className={styles.inputBox}>
                   <label>Enter password</label><br/>
                   <input type="password" name="password" placeholder="Password" value={loginInput.password} onChange={(e)=>{dispatch(loginInputHandler(e.target.value,e.target.name))}}/>
                </div>
                <button className={styles.submitBtn} onClick={loginUser}>Login</button>
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