import Navbar from "../../Pages/Dashboard/DashboardComponents/Navbar";
import { useSelector } from "react-redux";

const Dashboard = () => {

    //state
    const userInfo = useSelector((state)=>state.userInfoReducer)

    return(
        <div>
           <Navbar userEmail={userInfo.email}/>
           <h2>Dashboard</h2>
        </div>
    )
}

export default Dashboard;