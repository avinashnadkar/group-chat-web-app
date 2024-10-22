import * as React from 'react';
import styles from './DashboardComponents.module.css';
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../Redux/actions";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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
import Modal from '@mui/material/Modal';
import axios from "axios";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { v4 as uuid } from 'uuid';
import { getFriends, sendFriendRequest, cancelFriendRequest, acceptFriendRequest, rejectFriendRequest } from "../../../Redux/actions";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 400,
    // overflow:'scroll',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

/*info : 
  followng urls value saved in .env file.
  Add REACT_APP_API_URL = <http://your-url> 
*/
const apiUrl = process.env.REACT_APP_API_URL;

const Navbar = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //state for toggling modal
    const [openModel, setOpenModel] = useState(false);
    const handleOpenModel = () => setOpenModel(true);
    const handleCloseModel = () => {
        setOpenModel(false);
        setSearchQuery("");
        setSearchResult([]);
    };

    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    //dispatcher to dispath actions
    const dispatch = useDispatch()

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

    //state
    const userInfo = useSelector((state) => state.userInfoReducer)

    //friends state
    const friendsState = useSelector((state) => state.friendsReducer)
    //state of search friends list
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    //search friend
    const handleSearch = (query) => {

        setSearchQuery(query);

        if (query.trim() != "") {

            const body = { 'email': query.trim() }

            axios.post(`${apiUrl}/friends/search`, body, {
                headers: {
                    'X-auth-token': userInfo.token,
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                let result = JSON.parse(JSON.stringify(response.data.results))
                setSearchResult(result.users);
            }).catch(function (error) {
                console.log(error.response.data.errorMsg);
            });
        }else{
            setSearchResult([]);
        }

    }

    //accept friend reauest 
    const acceptFriendRequestHandler = (friendsId) => {
        dispatch(acceptFriendRequest({
            "id": friendsId
        }, {
            headers: {
                'X-auth-token': userInfo.token,
                'Content-Type': 'application/json'
            }
        }))
    }

    //reject friend reauest 
    const rejectFriendRequestHandler = (friendsId) => {
        dispatch(rejectFriendRequest({
            "id": friendsId
        }, {
            headers: {
                'X-auth-token': userInfo.token,
                'Content-Type': 'application/json'
            }
        }))
    }

    //send friend reauest 
    const sendFriendRequestHandler = (friendsId) => {
        dispatch(sendFriendRequest({
            "id": friendsId
        }, {
            headers: {
                'X-auth-token': userInfo.token,
                'Content-Type': 'application/json'
            }
        }))
    }

    //cancel friend reauest 
    const cancelFriendRequestHandler = (friendsId) => {
        dispatch(cancelFriendRequest({
            "id": friendsId
        }, {
            headers: {
                'X-auth-token': userInfo.token,
                'Content-Type': 'application/json'
            }
        }))
    }

    //fetch friends
    useEffect(() => {
        dispatch(getFriends({
            'email': userInfo.email
        }, {
            headers: {
                'X-auth-token': userInfo.token,
                'Content-Type': 'application/json'
            }
        }))
    }, [userInfo, dispatch])

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
                <li onClick={handleOpenModel} className={styles.searchManuLink}><Link to="/groups">Search</Link></li>
                <li><Link to="/groups">Groups</Link></li>
                <li><Link to="/friends">Friends</Link></li>
                <li><Link to="/chat">Chat</Link></li>
            </ul>


            <React.Fragment>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Typography onClick={handleOpenModel} sx={{ minWidth: 100 }} className={styles.searchBarButtonContainer} >
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

            <Modal
                open={openModel}
                onClose={handleCloseModel}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* <h2> Search Friends </h2> */}

                    <div className={styles.searchFriendContainer}>
                        <div className={styles.searchFriends}>
                            <input type="text" name='name' placeholder="Enter email to search friend.." value={searchQuery} onChange={(e) => handleSearch(e.target.value)} />
                            {/* <button onClick={handleSearch}>Search friends</button> */}
                        </div>

                        {
                            searchResult.map((el) => {
                                return (
                                    <div className={styles.friend} key={uuid()}>
                                        {/* <img src={el.profilePicture}/> */}
                                        <div className={styles.friendInformation}>
                                            <p>{el.email}</p>
                                        </div>
                                        {friendsState.myFriends.some((myFriend) => myFriend._id === el._id) ? (
                                            <button className={styles.friendOptions}><MoreVertIcon /></button>
                                        ) : friendsState.friendRequests.some(friendRequest => friendRequest._id === el._id) ? (
                                            <div>
                                                <button className={styles.acceptButton} onClick={() => acceptFriendRequestHandler(el._id)}> Accept </button>
                                                <button className={styles.rejectButton} key={el._id} onClick={() => rejectFriendRequestHandler(el._id)}>Reject</button>
                                            </div>
                                        ) : friendsState.friendRequestsSent.some(friendRequestSent => friendRequestSent._id === el._id) ? (
                                            <div>
                                                <button className={styles.rejectButton} key={el._id} onClick={() => cancelFriendRequestHandler(el._id)}>Cancel</button>
                                            </div>
                                        ) : (
                                            <button className={styles.friendOptions} onClick={() => sendFriendRequestHandler(el._id)}>
                                                <GroupAddIcon />
                                            </button>
                                        )}
                                    </div>

                                )
                            })
                        }
                    </div>

                </Box>
            </Modal>
        </nav>
    )
}

export default Navbar