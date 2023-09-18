import styles from './DashboardComponents.module.css';
import {  useDispatch, useSelector } from "react-redux";
import { logoutUser} from "../../../Redux/actions";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = (props) => {

    //dropdown state
    const [isOpen, setIsOpen] = useState(false);

    //dispatcher to dispath actions
    const dispatch = useDispatch()

    //toggle dropdown
    const toggleDropdown = () => {
        if (isOpen) {
            setIsOpen(false)
        } else {
            setIsOpen(true)
        }
    }

    //dispatch action logout
    const logOut = () => {
        dispatch(logoutUser());
    }


    return (
        <nav>
            <div className={styles.logo}>
                <Link to="/"> <h2>Group chat</h2> </Link>
            </div>

            <ul className={styles.navlinks}>
                <li><Link to="/groups">Groups</Link></li>
                <li><Link to="/friends">Friends</Link></li>
            </ul>

            <div className={styles.userAccount}>
                <p onClick={toggleDropdown} className={styles.userName}> {props.userEmail} </p>
                <div className={styles.dropdown} style={{ display: isOpen ? 'flex' : 'none' }}>
                    <p className={styles.label}>Manage Account</p>
                    <Link to="/user/profile"><p>Profile</p></Link>
                    <p className={styles.logoutOption} onClick={logOut}>Log Out</p>
                </div>
            </div>
        </nav>
    )
}

export default Navbar