import { Routes, Route} from "react-router-dom";
import Chat from "../Pages/Chat/Chat";
import CreateAccount from "../Pages/CreateAccount/CreateAccount";
import Login from "../Pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Groups from "../Pages/Groups/Groups";
import Friends from "../Pages/Friends/Friends";

const Router = () => {

    //state for user auth
    const auth = useSelector((state)=>state.userInfoReducer.isUserLoggedIn);

    return(
        <Routes>
	        <Route element={<ProtectedRoute auth={auth}/>}>
	          <Route exact path="/chat/:groupId" element={<Chat/>} auth={auth} />
	          <Route exact path="/" element={<Dashboard/>} auth={auth} />
	          <Route exact path="/groups" element={<Groups/>} auth={auth} />
	          <Route exact path="/friends" element={<Friends/>} auth={auth} />
            </Route>
            <Route  path={'/login'} element={<Login/>}/>
            <Route  path={'/create-account'} element={<CreateAccount/>}/>
        </Routes>
    )
}

export default Router;