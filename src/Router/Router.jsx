import { Routes, Route} from "react-router-dom";
import Chat from "../Pages/Chat/Chat";
import Login from "../Pages/Login/Login";

const Router = () => {
    return(
        <Routes>
            <Route  path={'/chat'} element={<Chat/>}/>
            <Route  path={'/login'} element={<Login/>}/>
        </Routes>
    )
}

export default Router;