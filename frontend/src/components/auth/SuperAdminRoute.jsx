import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const SuperAdminRoute = () => {
    const { userInfo } = useContext(AuthContext)
    const isSuperAdmin = userInfo && (userInfo.role === 'superAdmin' || (userInfo.isAdmin && (!userInfo.role || userInfo.role === 'user')))

    if (!userInfo) {
        return <Navigate to="/login" replace />
    }

    if (!isSuperAdmin) {
        return <Navigate to="/unauthorized" replace />
    }
    
    return <Outlet />
}

export default SuperAdminRoute
