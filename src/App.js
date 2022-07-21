import Router from "./Router/Router";
import Navbar from "./Pages/Dashboard/DashboardComponents/Navbar";
import { useSelector } from "react-redux";

function App() {

  const userInfo = useSelector((state)=>state.userInfoReducer)

  return (
    <div className="App">
      {
          //render common components according to pages
          (window.location.pathname === '/' || window.location.pathname === '/groups' || window.location.pathname === '/friends' || window.location.pathname === '/user/profile'   ) ?  <Navbar userEmail={userInfo.email}/>  :<></>
      }
      <Router/>
    </div>
  );
}

export default App;
