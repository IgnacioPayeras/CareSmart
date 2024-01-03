import { useState } from "react";
import BottonsCreate from "../../Bottons/BottonsCreate";
import dni from "global-dni"
import Swal from "sweetalert2";
import { postRequest } from "../../../Services/Request"

export default function CreateCoor() {

    const [name,setName] = useState()
    const [rut,setRut] = useState()
    const [email,setEmail] = useState()
    //const [phone,setPhone] = useState()
    const [password,setPassword] = useState()
    const [loading, setLoading] = useState(false)

    const data = {
        full_name : name,
        rut,
        email,
        //phone,
        password
    }

    const handleSubmit = async(x) => {
        x.preventDefault()
        if(dni.CL.validate(document.getElementById("rut").value)){
            setLoading(!loading)
            const resp = await postRequest(process.env.REACT_APP_URL+"/api/center/coordinator", JSON.stringify(data))
            setLoading(false)
            if (resp.status === 200) {
                await Swal.fire("Accion exitosa", "Medico creado exitosamente!!", "success")
                window.location.reload(true)
            } else {
                document.getElementById("error").innerHTML = "Error al procesar los datos."
            }
        }else{
            document.getElementById("error").innerHTML = "Rut no valido"
            document.getElementById("rut").focus()
            document.getElementById("rut").className += " border-red-600 border-2 checked:border-red-600 "
        }  
    }

    return (
        <form id="form" className="my-5 sm:mx-4 sm:w-2/5 py-5 px-2 bg-slate-50 rounded-xl shadow-xl" onSubmit={handleSubmit}>
            <h1 className="text-center text-lg font-semibold mb-5">Crear coordinador</h1>
            <div className="flex flex-col">
                <label className="my-2 block font-medium">Nombre completo</label>
                <input className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" onChange={e=>setName(e.target.value)} required/>

                <label className="my-2 block font-medium">RUT</label>
                <input id="rut" className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" value={rut} onChange={e=>setRut(dni.CL.format(e.target.value))} required/>
                {!dni.CL.validate(rut) && <span className="m-2 text-red-600 text-sm" >Rut no valido</span>}

                <label className="my-2 block font-medium">Correo electronico</label>
                <input className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" onChange={e=>setEmail(e.target.value)} type="email" required/>

                <label className="my-2 block font-medium">Contraseña</label>
                <input className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" onChange={e=>setPassword(e.target.value)} type="password" required/>

                <BottonsCreate text={"Añadir coordinador"} load={"Guardando..."} loading={loading}/>
                

            </div>

        </form>
    )
}