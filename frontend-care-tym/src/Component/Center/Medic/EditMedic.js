import { useEffect, useState } from "react";
import BottonsUpdate from "../../Bottons/BottonsUpdate";
import { getRequest } from "../../../Services/Request";

export default function EditMedic(props) {

    useEffect(()=>{
        setName(props.edit.full_name)
        setRut(props.edit.rut)
        setEmail(props.edit.email)
        setPhone(props.edit.phone)
        setSpecialty(props.edit.id_specialty)
        setAttentionDuration(props.edit.attention_duration)


    },[props])

    const [name,setName] = useState()
    const [rut,setRut] = useState()
    const [email,setEmail] = useState()
    const [phone,setPhone] = useState()
    const [specialty,setSpecialty] = useState()
    const [attentionDuration,setAttentionDuration] = useState()
    const [password,setPassword] = useState()

    const [loading, setLoading] = useState(true)
    const [dataSpecialty, setDataSpecialty] = useState()

    useEffect(()=>{
        const getData = async() => {
            setDataSpecialty(await getRequest(process.env.REACT_APP_URL+"/api/center/specialty/"))
            setLoading(false)
        }
        getData()
    },[])



    const data = {
        full_name: name,
        rut,
        email,
        phone,
        id_specialty : specialty,
        attention_duration : attentionDuration,
        password
    }

    return (
        <div className="my-5 sm:mx-4 sm:w-2/5 py-5 px-2 bg-slate-50 rounded-xl shadow-lg">
            <h1 className="text-center text-xl font-semibold mb-5">Editar medico</h1>
            <div className="flex flex-col">
                <label className="my-2 block font-medium">Nombre completo</label>
                <input className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" value={name} onChange={e=>setName(e.target.value)}/>

                <label className="my-2 block font-medium">RUT</label>
                <input className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" value={rut} onChange={e=>setRut(e.target.value)}/>

                <label className="my-2 block font-medium">Correo electronico</label>
                <input className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" value={email} onChange={e=>setEmail(e.target.value)}/>

                <label className="my-2 block font-medium">Telefono</label>
                <input className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" value={phone} onChange={e=>setPhone(e.target.value)}/>

                <label className="my-2 block font-medium">Especialidad</label>
                <select onChange={e=>setSpecialty(e.target.value)} value={specialty} className={"bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5"}>
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

                <label className="my-2 block font-medium">Duracion de atencion</label>
                <input className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" value={attentionDuration} onChange={e=>setAttentionDuration(e.target.value)}/>

                <label className="my-2 block font-medium">Contraseña</label>
                <input className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" onChange={e=>setPassword(e.target.value)}/>

                <div className="my-2">
                    <BottonsUpdate text={"Actualizar medico"} data={data} api={"http://127.0.0.1:8000/api/center/medic/"+ props.edit.rut}/>
                </div>

            </div>

        </div>
    )
}