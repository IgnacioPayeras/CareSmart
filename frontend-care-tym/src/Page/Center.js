import {Navigate, Outlet } from "react-router-dom"

export default function Center(){
    if(!sessionStorage.getItem("auth-token") || sessionStorage.getItem("rol") !== "medical_center") return <Navigate to="/"/>    

    return (
        <div className="flex justify-center flex-col">
            <Outlet />
        </div>
    )
}