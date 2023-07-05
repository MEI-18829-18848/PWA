import { useLocation, Navigate } from "react-router-dom";

import {getCurrentToken, isTokenExpired} from "../services/auth.service";

export function RequireAuth({ children }: { children: JSX.Element }) {
    let token = getCurrentToken()
    let location = useLocation();

    if (token == null) {
        console.log('Hello')
        return <Navigate to="/login" state={{from: location}} replace/>;

    }else if (isTokenExpired(token)){
        console.log('Hello2222')
        return <Navigate to="/login" state={{from: location}} replace/>;
    }
    return children;
}