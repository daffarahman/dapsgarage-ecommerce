import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "./loading";

// Route yang hanya bisa dimasukin kalo login
export function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return <Loading />;

    return isAuthenticated ? children : <Navigate to="/login" />;
}

// Route yang tidak bisa dimasukin kalo lagi login
export function PublicRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return <Loading />;

    return isAuthenticated ? <Navigate to="/" /> : children;
}

export function ProtectedInformation({ children }) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return <Loading />;

    return isAuthenticated ? children : <></>;
}