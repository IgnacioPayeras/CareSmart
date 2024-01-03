import {Navigate, Outlet } from "react-router-dom"

export default function Admin() {

    //const {user}  = useContext(AuthProvider)

    if(!sessionStorage.getItem("auth-token") || sessionStorage.getItem("rol") !== "admin") return <Navigate to="/"/>    

    return (
        <div className="flex flex-col justify-center">
            <Outlet />
        </div>
    )
}