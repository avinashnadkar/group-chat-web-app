import * as React from 'react';
import styles from './DashboardComponents.module.css';
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../Redux/actions";
import { Link } from "react-router-dom";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';



const Navbar = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                <Link to="/">
                    <div className={styles.logoIconAndNameContainer}>
                        <WhatsAppIcon sx={{ fontSize: 35 }} />
                        <h2>GC</h2>
                    </div>
                </Link>
            </div>

            <ul className={`${styles.navlinks} ${isNavbarOpen ? styles.show : ''}`}>
                <li className={styles.searchManuLink}><Link to="/groups">Search</Link></li>
                <li><Link to="/groups">Groups</Link></li>
                <li><Link to="/friends">Friends</Link></li>
            </ul>


            <React.Fragment>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Typography sx={{ minWidth: 100 }} className={styles.searchBarButtonContainer} >
                        <SearchIcon style={{ marginRight: '5px' }} />
                        <span>Search</span>
                    </Typography>
                    {/* <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>{props.userEmail[0].toUpperCase()}</Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleClose}>
                        <Avatar />   <Link to="/user/profile"><p>Profile</p></Link>
                    </MenuItem>
                    {/*  <MenuItem onClick={handleClose}>
                        <Avatar /> My account
                    </MenuItem>
                  <Divider />
                     <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Add another account
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem> */}
                    <MenuItem onClick={logOut}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </React.Fragment>

        </nav>
    )
}

export default Navbar