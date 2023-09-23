import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./CreateAccount.module.css";
import googleIcon from "../../Assets/google.png"
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../Redux/actions";

const CreateAccount = () => {

    //dispatcher to dispatch actions to reducers
    const dispatch = useDispatch()

    //state for signup
    const [userCredentials, setUserCredentials] = useState({ email: "", password: "", retypePassword: "" });
    // Validation error messages
    const tempErrorMsg = { emailErrorMsg: "", passwordErrorMsg: "", retypePasswordErrorMsg: "" };
    const [validationErrorsMsg, setValidationErrorMsg] = useState(tempErrorMsg);
    /*user info state from redux store to check if user 
    logged in otherwise redirect to previous page*/
    const userInfo = useSelector((state) => state.userInfoReducer)
    const isAuth = userInfo.isUserLoggedIn;


    //Redirect to previous page if user is already logged in
    let navigate = useNavigate();
    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    }, [isAuth, navigate])


    //register user
    const registerUser = () => {

        //alert user if email is not valid
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailPattern.test(userCredentials.email)) {
            setValidationErrorMsg({ ...tempErrorMsg, emailErrorMsg: "Invalid email format" });
            return;
        }

        //alert user if password and retype password are wrong
        if (userCredentials.password !== userCredentials.retypePassword) {
            setValidationErrorMsg({
                emailErrorMsg: "",
                passwordErrorMsg: "Passwords do not match",
                retypePasswordErrorMsg: "Passwords do not match",
            });
            return;
        }

        //alert user if password length is less than 6 chars
        if (userCredentials.password.length < 6 ) {
            setValidationErrorMsg({
                emailErrorMsg: "",
                passwordErrorMsg: "Passwords should be atlest 6 characters long",
                retypePasswordErrorMsg: "Passwords should be atlest 6 characters long",
            });
            return;
        }


        /*disptch login credentials with signup 
        action to create account*/
        dispatch(signup({
            email: userCredentials.email,
            password: userCredentials.password
        }))

    }

    //handle inputs change
    const handleInputsChange = (e) => {
        const tempState = {
            ...userCredentials,
            [e.target.name]: e.target.value
        }
        setUserCredentials(tempState)
    }

    return (
        <div className={styles.signupPage}>
            <div className={styles.signupForm}>
                <h2>Create account</h2>
                <div className={styles.inputBox}>
                    <label>Enter email</label><br />
                    <input type="email" name="email" value={userCredentials.email} placeholder="Email" onChange={(e) => handleInputsChange(e)} />
                    <p className={styles.errorMessage}>{validationErrorsMsg.emailErrorMsg}</p>
                </div>
                <div className={styles.inputBox}>
                    <label>Enter password</label><br />
                    <input type="password" name="password" value={userCredentials.password} placeholder="Password" onChange={(e) => handleInputsChange(e)} />
                    <p className={styles.errorMessage}>{validationErrorsMsg.passwordErrorMsg}</p>
                </div>
                <div className={styles.inputBox}>
                    <label>Enter password Again</label><br />
                    <input type="password" name="retypePassword" value={userCredentials.retypePassword} placeholder="Retype password" onChange={(e) => handleInputsChange(e)} />
                    <p className={styles.errorMessage}>{validationErrorsMsg.retypePasswordErrorMsg}</p>
                </div>
                <button className={styles.submitBtn} onClick={registerUser}>Create account</button>

                <div className={styles.divider}>
                    <span className={styles.line}></span><p>Or</p><span className={styles.line}></span>
                </div>
                <div className={styles.googleAuthBtn}>
                    <button> <img src={googleIcon} alt="" /> Signup using google</button>
                </div>
                <p className={styles.loginLink}>Already have an account ? <Link to="/login">Login to account</Link></p>
            </div>
        </div>
    )
}

export default CreateAccount;