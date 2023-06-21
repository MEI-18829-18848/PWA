import { useLocation, Navigate } from "react-router-dom";

import {getCurrentUser} from "../services/auth.service";

export function RequireAuth({ children }: { children: JSX.Element }) {
    let user = getCurrentUser()
    let location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    } else {
        return children;
    }
}