import { useEffect, useState } from "react"
import BottonsUpdate from "../../Bottons/BottonsUpdate"

export default function EditSpecialty(props){

    const [name, setName] = useState()

    useEffect(()=>{
        setName(props.edit.name)
    },[props])
    

    return(
        <div className="my-5 sm:mx-4 sm:w-2/5 py-5 px-2 bg-slate-50 rounded-xl shadow-lg">
            <h1 className="text-center text-xl font-semibold mb-5">Editar medico</h1>
            <div className="flex flex-col">
                <label className="my-2 block font-medium">Nombre completo</label>
                <input className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" value={name} onChange={e=>setName(e.target.value)}/>

                <div className="my-2">
                    <BottonsUpdate text={"Actualizar especialidad"} data={{name: name}} api={process.env.REACT_APP_URL+"/api/center/specialty/"+ props.edit.id}/>
                </div>

            </div>

        </div>
    )
}