import { createContext } from "react";
import { useNavigate } from "react-router-dom";
//import { UseLocalStorage } from "./UseLocalStorage";
import jwt from "jwt-decode"
import env from "react-dotenv";


const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {

    //const [user, setUser] = UseLocalStorage("auth-token", null)
    const history = useNavigate()

    const Login = async (data,idCenter) => {
        const resp = await fetch(process.env.REACT_APP_URL+"/api/login/", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data)
        })
        if (resp.status === 200) {

            const data = await resp.json();

            sessionStorage.setItem("auth-token", data.token)// se guarda jwt entregado la API
            const decode = jwt(data.token)
            sessionStorage.setItem("rol",decode.rol)
            if(decode.rol === "medical_chain" || decode.rol === "medical_center"){
                sessionStorage.setItem("title", decode.key)
            }else{
                sessionStorage.setItem("title", "CareTYM")
            }

            if (decode.rol === "admin"){
                return history("/admin/")
            }else if(decode.rol === "medical_chain"){
                return history("/chain/")
            }else if(decode.rol === "medical_center"){
                return history("/center/")
            }else if(decode.rol === "patient"){
                console.log(data.data_user)
                const data_user = data.data_user
                sessionStorage.setItem("data_patient", JSON.stringify(data_user))
                return history("/schedule/")
            }

        }


        return 400
    }

    const Logout = async () => {
        //setUser(null)
        sessionStorage.clear("auth-token")
        history("/")
    }

    const contextData = {
        Login,
        Logout
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
