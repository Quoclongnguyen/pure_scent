import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'


const AdminRoute = () => {
    const { userInfo } = useContext(AuthContext)

    if (!userInfo) {
        return <Navigate to="/login" replace />
    }

    if (!userInfo.isAdmin) {
        return <Navigate to="/unauthorized" replace />
    }
    return <Outlet />

}

export default AdminRoute