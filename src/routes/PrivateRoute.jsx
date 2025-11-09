import React from 'react';
import { auth } from '../firebase.config';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const[user,loading] = useAuthState(auth);
    
if(loading)
    return <p>Loading....</p>

if(!user)
    return <Navigate to="/login" />;

    return children;
};

export default PrivateRoute;