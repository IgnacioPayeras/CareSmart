import { useEffect, useState } from "react";
import { getRequest } from "../../../Services/Request";
import BottonsCreate from "../../Bottons/BottonsCreate";
import dni from "global-dni"
import Swal from "sweetalert2";
import { postRequest } from "../../../Services/Request"

export default function CreateMedic() {

    const [name,setName] = useState()
    const [rut,setRut] = useState()
    const [email,setEmail] = useState()
    const [phone,setPhone] = useState()
    const [specialty,setSpecialty] = useState()
    const [time,setTime] = useState()
    const [password,setPassword] = useState()


    const [loading, setLoading] = useState(true)

    const [dataSpecialty, setDataSpecialty] = useState()

    const data = {
        full_name: name,
        rut,
        email,
        phone,
        id_specialty : specialty,
        attencion_duration : time,
        password
    }

    useEffect(()=>{
        const getData = async() => {
            setDataSpecialty(await getRequest(process.env.REACT_APP_URL+"/api/center/specialty/"))
            setLoading(false)
        }
        getData()
    },[])

    const handleSubmit = async(x) => {
        x.preventDefault()
        if(dni.CL.validate(document.getElementById("rut").value)){
            setLoading(!loading)
            const resp = await postRequest(process.env.REACT_APP_URL+"/api/center/medic", JSON.stringify(data))
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
        <div name="createMedic" className="my-5 sm:mx-4 sm:w-2/5 py-5 px-2 bg-slate-50 rounded-xl shadow-lg h-fit">
            <h1 className="text-center text-xl font-semibold mb-5">Crear medico</h1>
            <form className="flex flex-col" onSubmit={handleSubmit} id="form">
                <label className="my-2 block font-medium">Nombre completo</label>
                <input className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" onChange={e=>setName(e.target.value)} required/>

                <label className="my-2 block font-medium">RUT</label>
                <input id="rut" className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" value={rut} onChange={e=>setRut(dni.CL.format(e.target.value))} required/>
                {!dni.CL.validate(rut) && <span className="m-2 text-red-600 text-sm" >Rut no valido</span>}
                
                <label className="my-2 block font-medium">Correo electronico</label>
                <input className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" onChange={e=>setEmail(e.target.value)} type="email" required/>

                <label className="my-2 block font-medium">Telefono</label>
                <input className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" onChange={e=>setPhone(e.target.value)} type="tel" required/>

                <label className="my-2 block font-medium">Especialidad</label>
                <select onChange={e=>setSpecialty(e.target.value)} className={"bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5"} required>
                    <option>Seleccione una especialidad</option>
                    {
                        loading ? (
                            <div>Cargando</div>
                        ) : (
                            dataSpecialty.map((x)=>(
                                <option value={x.id}>{x.name}</option>
                            ))
                        )
                    }
                </select>
                
                <label className="my-2 block font-medium">Duracion de atencion
                <input className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" onChange={e=>setTime(e.target.value)} type="number" required/>
                </label>
                <label className="my-2 block font-medium">Contraseña</label>
                <input className="mb-2 bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" onChange={e=>setPassword(e.target.value)} type="password" required="true"/>
                
                    
                
                
                <BottonsCreate text={"Crear medico"} load={"Creando medico ..."} loading={loading}/>
                <h1 id="error" className="text-red-600 text-sm text-center"></h1>
            </form>
            

        </div>
    )
}