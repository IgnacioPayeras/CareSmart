import { useEffect, useState } from "react";
import BottonsUpdate from "../../Bottons/BottonsUpdate";

export default function EditCoor(props) {

    useEffect(()=>{
        setName(props.edit.full_name)
        setRut(props.edit.rut)
        setEmail(props.edit.email)
        //setPhone(props.edit.phone)
    },[props])

    const [name,setName] = useState()
    const [rut,setRut] = useState()
    const [email,setEmail] = useState()
    //const [phone,setPhone] = useState()
    const [password,setPassword] = useState()

    const data = {
        full_name: name,
        rut,
        email,
        //phone,
        password
    }

    return (
        <div className="my-5 sm:mx-4 sm:w-2/5 py-5 px-2 bg-slate-50 rounded-xl shadow-xl">
            <h1 className="text-center text-lg font-semibold mb-5">Editar coordinador</h1>
            <div className="flex flex-col">
                <label className="my-2 block font-medium">Nombre completo</label>
                <input className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" value={name} onChange={e=>setName(e.target.value)}/>

                <label className="my-2 block font-medium">RUT</label>
                <input className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" value={rut} onChange={e=>setRut(e.target.value)}/>

                <label className="my-2 block font-medium">Correo electronico</label>
                <input className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" value={email} onChange={e=>setEmail(e.target.value)}/>

                <label className="my-2 block font-medium">Contraseña</label>
                <input className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" onChange={e=>setPassword(e.target.value)}/>

                <div className="my-2">
                    <BottonsUpdate text={"Actualizar coordinador"} data={data} api={process.env.REACT_APP_URL+"/api/center/coordinator/"+ props.edit.rut}/>
                </div>

            </div>

        </div>
    )
}