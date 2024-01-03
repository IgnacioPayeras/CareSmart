import { useState } from "react";
import CreateSpecialty from "../../Component/Center/Specialty/CreateSpecialty";
import EditSpecialty from "../../Component/Center/Specialty/EditSpecialty";
import ListSpecialty from "../../Component/Center/Specialty/ListSpecialty";

export default function Specialty() {

    const [edit, setEdit] = useState([])
    const [type, setType] = useState(0)

    return (
        <div className="my-5 sm:m-7 flex flex-col justify-center">
            <h1 className="text-center font-semibold text-2xl sm:my-6">Administracion de especialidades</h1>
            <div className="flex flex-col sm:flex-row justify-center px-1">
                <div className="flex flex-col">
                    <button className="bg-blue-700 sm:mx-2 text-white font-medium p-2.5 rounded-xl shadow-xl mt-4 hover:shadow-none" onClick={() => setType(1)}>Añadir especialidad</button>
                    <ListSpecialty api={process.env.REACT_APP_URL+"/api/center/specialty"} title={"Lista de especialidades"} setType={setType} setEdit={setEdit}/>
                </div>


                {
                    type === 0 ? (
                        <div className="my-5 sm:mx-4 sm:w-2/5 py-5 px-2 bg-slate-50 rounded-xl shadow-lg">
                            <h1 className="text-center text-lg">Selecciona crea, edita o elimina una especialidad.</h1>
                        </div>
                    ) : (type === 1 ? (<CreateSpecialty />) : (<EditSpecialty edit={edit}/>))
                }


            </div>
        </div>
    )
}