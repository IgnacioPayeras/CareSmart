import { useState } from "react"
import CreateCoor from "../../Component/Center/Coordinator/CreateCoor";
import EditCoor from "../../Component/Center/Coordinator/EditCoor";
import ListEditCoor from "../../Component/Center/Coordinator/ListEditCoor";

export default function Coordinator() {

    const [edit, setEdit] = useState([])
    const [type, setType] = useState(0)

    return (
        <div className="my-5 sm:m-7 flex flex-col justify-center">
            <h1 className="text-center font-semibold text-2xl sm:my-6">Administracion de coordinadores</h1>
            <div className="flex flex-col sm:flex-row justify-center px-1">
                <div className="flex flex-col">
                    <button className="bg-blue-700 sm:mx-4 text-white font-medium p-2.5 rounded-xl shadow-xl mt-4 hover:shadow-none" onClick={() => setType(1)}>Añadir coordinador</button>
                    <ListEditCoor api={process.env.REACT_APP_URL+"/api/center/coordinator"} title={"Lista de coordinadores"} setEdit={setEdit} setType={setType} />
                </div>

                { //temporal !!!!!!!
                    type === 0 ? (
                        <div className="my-5 sm:mx-4 sm:w-2/5 py-5 px-2 bg-slate-50 rounded-xl shadow-xl">
                            <h1 className="text-center text-lg">Selecciona un coordinador a editar o crea uno nuevo :)</h1>

                        </div>
                    ) : (
                        type === 1 ? (
                            <CreateCoor />
                        ) : (
                            <EditCoor edit={edit} />
                        )
                    )
                }
            </div>
        </div>
    )
}