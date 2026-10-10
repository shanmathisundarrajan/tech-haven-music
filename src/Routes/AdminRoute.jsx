import React, { useContext } from 'react'
import { AuthContextAPI } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { UserContextAPI } from '../context/UserContext';
import Spinner from '../utilities/Spinner';

const AdminRoute = ({children}) => {
    let {authUser} = useContext(AuthContextAPI);
    let {userDataFromDB} = useContext(UserContextAPI);

    // not logged in -> go to login
    if(authUser==null){
        return <Navigate to={"/login"}/>
    }
    // profile still loading from Firestore
    if(userDataFromDB===null){
        return <Spinner/>
    }
    if(userDataFromDB?.role==="admin"){
        return <>{children}</>
    }
    return <Navigate to={"/user-profile"}/>
}

export default AdminRoute;