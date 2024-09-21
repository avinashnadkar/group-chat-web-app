import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import googleIcon from "../../Assets/google.png"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/actions";

const Login = () => {
    

    //state
    const userInfo = useSelector((state) => state.userInfoReducer)
    const validationErrorsMsg = useSelector(state => state.authReducer.validationErrorsMsg);
    const [userCredentials, setUesrCredentials] = useState({ email: "", password: "" });
    const isAuth = userInfo.isUserLoggedIn;

    //Redirect to previous page if user is already logged in
    let navigate = useNavigate();
    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    }, [isAuth, navigate])

    //dispatcher to dispath actions
    const dispatch = useDispatch()

    //register user
    const loginUser = () => {

        //alert user if email is not valid
        /*const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailPattern.test(userCredentials.email)) {
            setValidationErrorMsg({ ...tempErrorMsg, emailErrorMsg: "Invalid email format" });
            return;
        }*/

        //alert user if password length is less than 6 chars
        /*if (userCredentials.password.length < 6) {
            setValidationErrorMsg({
                emailErrorMsg: "",
                passwordErrorMsg: "Passwords should be at least 6 characters long"
            });
            return;
        }*/

        dispatch(login({
            email: userCredentials.email,
            password: userCredentials.password,
        }))
    }

    const handleInputChange = (e) => {
        let tempUserCredential = {
            ...userCredentials,
            [e.target.name]: e.target.value
        }
        setUesrCredentials(tempUserCredential)
    }

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginForm}>
                <h2>Login</h2>
                <div className={styles.inputBox}>
                    <label>Enter email</label><br />
                    <input type="email" name="email" placeholder="Email" value={userCredentials.email} onChange={(e) => handleInputChange(e)} />
                    <p className={styles.errorMessage}>{validationErrorsMsg.emailErrorMsg}</p>
                </div>
                <div className={styles.inputBox}>
                    <label>Enter password</label><br />
                    <input type="password" name="password" placeholder="Password" value={userCredentials.password} onChange={(e) => handleInputChange(e)} />
                    <p className={styles.errorMessage}>{validationErrorsMsg.passwordErrorMsg}</p>
                </div>
                <button className={styles.submitBtn} onClick={loginUser}>Login</button>
                <p className={styles.forgotPassword}><Link to="/retrieve-password">Forgot your password?</Link></p>
                <div className={styles.divider}>
                    <span className={styles.line}></span><p>Or</p><span className={styles.line}></span>
                </div>
                <div className={styles.googleAuthBtn}>
                    <button> <img src={googleIcon} alt="" /> login using google</button>
                </div>
                <p className={styles.signupLink}>Don't have any account yet ? <Link to="/create-account">Create account</Link></p>
            </div>
        </div>
    )
}

export default Login;