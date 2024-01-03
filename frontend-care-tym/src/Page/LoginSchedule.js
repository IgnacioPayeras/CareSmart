import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import dni from "global-dni"
import { getRequest, postRequest } from "../Services/Request"
import AuthProvider from "../Auth/AuthProvider";

export default function LoginSchedule() {

    const { id } = useParams()

    const { Login } = useContext(AuthProvider)

    const history = useNavigate()

    const [rut, setRut] = useState("")

    const [title, setTitle] = useState("cargando...")



    useEffect(()=>{
        const getDataChain = async() => {
            const data = await getRequest(process.env.REACT_APP_URL+"/api/auth/chainInfo/"+id)
            sessionStorage.setItem("data_chain", JSON.stringify(data))
            const title = JSON.parse(sessionStorage.getItem("data_chain")).name
            console.log(title)
            setTitle(title)
        }
        getDataChain()
    },[])


    //Realiza consulta a backend para verificar si el usuario existe
    const handleRut = async(e,rut) => {
        e.preventDefault()
        const resp = await postRequest(process.env.REACT_APP_URL+"/api/auth/",JSON.stringify({rut}))
        const verification = await resp.json()
        
        console.log(Object.entries(verification).length)

        if(Object.entries(verification).length === 0 ){
            history("/register/"+rut)
        }

        //if (verification.state === "verificado") {
            document.getElementById("password").className += "block"
            document.getElementById("password-input").focus()
            document.getElementById("button").onclick = handleValidation
            document.getElementById("button").innerText = "Iniciar sesion"
            document.getElementById("rut").disabled = true
        //}
    }

    const handleValidation = () => {
        const password = document.getElementById("password-input").value
        Login({"key" : rut, "password" : password},id)
    }

    return (
        <div className="flex justify-center">
            <div className="my-5 sm:mx-4 sm:w-[700px] py-5 px-2 bg-slate-50 rounded-xl shadow-lg flex flex-col justify-center">
                <h1 className="font-semibold text-2xl text-center">{title}</h1>
                <h1 className="font-medium text-xl text-center my-4">Sistema de agendamiento de horas medicas</h1>

                <form className="mx-2 sm:mx-32">
                    <label className="my-2 block font-medium">Ingresa tu RUT</label>
                    <input id="rut" className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" value={rut} onChange={(e) => setRut(dni.CL.format(e.target.value))} />
                    <div id="password" className="my-4 hidden">
                        <label className="my-2 block font-medium">Ingresa tu contraseña</label>
                        <input id="password-input" className="my-2 bg-gray-100 border border-gray-500 rounded-lg shadow-lg w-full p-2.5 block" type="password"/>
                    </div>
                    <button type="submit" id="button" className="my-2 p-2 ml-0 text-white border-2 bg-blue-700 rounded-lg text-lg font-medium w-full" onClick={(e) => handleRut(e,rut)}>Siguiente</button>
                </form>

            </div>

        </div>
    )
}