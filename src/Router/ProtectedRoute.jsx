import React from "react"
import {  Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = ({auth}) => {
    
	return auth?<Outlet/>: <Navigate to="/login"/>

}

export default ProtectedRoute;