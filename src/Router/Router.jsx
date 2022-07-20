import { Routes, Route} from "react-router-dom";
import Chat from "../Pages/Chat/Chat";
import CreateAccount from "../Pages/CreateAccount/CreateAccount";
import Login from "../Pages/Login/Login";

const Router = () => {
    return(
        <Routes>
            <Route  path={'/chat'} element={<Chat/>}/>
            <Route  path={'/login'} element={<Login/>}/>
            <Route  path={'/create-account'} element={<CreateAccount/>}/>
        </Routes>
    )
}

export default Router;