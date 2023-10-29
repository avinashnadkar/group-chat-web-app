import styles from './DashboardComponents.module.css';
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../Redux/actions";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = (props) => {

    //dropdown state
    const [isOpen, setIsOpen] = useState(false);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

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

    //toggle navbar
    const toggleNavbar = () => {
        console.log(isNavbarOpen)
        if (isNavbarOpen) {
            setIsNavbarOpen(false)
        } else {
            setIsNavbarOpen(true)
        }
    }

    //dispatch action logout
    const logOut = () => {
        dispatch(logoutUser());
    }


    return (
        <nav>

            <div className={styles.hamBurgerMenu} onClick={toggleNavbar}>
                <div className={styles.hambergerlineOne}></div>
                <div className={styles.hambergerlineTwo}></div>
                <div className={styles.hambergerlineThree}></div>
            </div>

            <div className={styles.logo}>
                <Link to="/"> <h2>Group chat</h2> </Link>
            </div>

            <ul className={`${styles.navlinks} ${isNavbarOpen ? styles.show : ''}`}>
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