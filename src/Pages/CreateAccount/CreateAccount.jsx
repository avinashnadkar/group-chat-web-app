import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./CreateAccount.module.css";
import googleIcon from "../../Assets/google.png"
import { useDispatch, useSelector } from "react-redux";
import { signupInputHandler,signup } from "../../Redux/actions";

const CreateAccount = () => {

    //dispatcher to dispatch actions to reducers
    const dispatch = useDispatch()

    //state for signup
    const user = useSelector((state)=>state.signupReducer);
    const userInfo = useSelector((state)=>state.userInfoReducer)
    const isAuth = userInfo.isUserLoggedIn;
    
    //register user
    const registerUser = () => {
        dispatch(signup({
           email : user.email,
           password : user.password,
        }))
    }
    
    //Redirect to previous page if user is already logged in
    let navigate = useNavigate();
    useEffect(() => {
        if (isAuth) {
            navigate(-1);
        }
    },[isAuth,navigate])

    return(
        <div className={styles.signupPage}>
            <div className={styles.signupForm}>
                <h2>Create account</h2>
                <div className={styles.inputBox}>
                   <label>Enter email</label><br/>
                   <input type="email" name="email"  value={user.email} placeholder="Email" onChange={(e)=>dispatch(signupInputHandler(e.target.value,e.target.name))}/>
                </div>
                <div className={styles.inputBox}>
                   <label>Enter password</label><br/>
                   <input type="password" name="password" value={user.password} placeholder="Password" onChange={(e)=>dispatch(signupInputHandler(e.target.value,e.target.name))}/>
                </div>
                <div className={styles.inputBox}>
                   <label>Enter password Again</label><br/>
                   <input type="password" name="passwordTwo" value={user.passwordOne} placeholder="Retype password" onChange={(e)=>dispatch(signupInputHandler(e.target.value,e.target.name))}/>
                </div>
                <button className={styles.submitBtn} onClick={registerUser}>Create account</button>

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