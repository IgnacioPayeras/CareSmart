import {Navigate, Outlet } from "react-router-dom"

export default function Chain() {

    //const {user}  = useContext(AuthProvider)

    if(!sessionStorage.getItem("auth-token") || sessionStorage.getItem("rol") !== "medical_chain") return <Navigate to="/"/>    

    return (
        <div className="flex justify-center flex-col">
            <Outlet />
        </div>
    )
}