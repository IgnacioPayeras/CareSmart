import { useState } from "react";
import BottonsCreate from "../../Bottons/BottonsCreate"
import Swal from "sweetalert2";
import { postRequest } from "../../../Services/Request"


export default function CreateSpecialty() {

    const [specialty, setSpecialty] = useState()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (x) => {
        x.preventDefault()

        setLoading(!loading)
        const resp = await postRequest(process.env.REACT_APP_URL+"/api/center/specialty", JSON.stringify({ name: specialty }))
        setLoading(false)
        if (resp.status === 200) {
            await Swal.fire("Accion exitosa", "Especialidad creada exitosamente!!", "success")
            window.location.reload(true)
        } else {
            document.getElementById("error").innerHTML = "Error al procesar los datos."
        }

    }

    return (
        <form id="form" className="my-5 sm:mx-4 sm:w-2/5 py-5 px-2 bg-slate-50 rounded-xl shadow-lg" onSubmit={handleSubmit}>
            <h1 className="text-center text-lg font-semibold">Agregar especialidad</h1>
            <h1 className="text-center text-xs font-light mb-5">Recuerda que la especialidad solo se agregara al centro medico, esto no afecta a la cadena medica.</h1>

            <div className="flex flex-col">
                <label className="my-2 block font-medium">Nombre especialidad</label>
                <input className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" onChange={e => setSpecialty(e.target.value)} required />


            </div>

            <div className="my-2">
                <BottonsCreate text={"Crear especialidad"} />
            </div>

        </form>
    )
}