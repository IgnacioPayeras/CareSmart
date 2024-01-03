import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getRequest, deleteRequest } from "../../Services/Request"
import Swal from "sweetalert2"

export default function MedicalHours() {

    const [hours, setHours] = useState([])
    const [loading, setLoading] = useState(true)

    const history = useNavigate()

    const handleDelete = async (data, id) => {

        const deleteAccion = await Swal.fire({
            title: "Accion permanente",
            text: "Eliminar hora de atencion",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#1D4ED8",
            confirmButtonText: "Eliminar medico",
            confirmButtonColor: "#D33"
        })
        if (deleteAccion.isConfirmed) {
            const resp = await deleteRequest(process.env.REACT_APP_URL + "/api/patient/my_attentions/" + id)
            if (resp.status === 200) {
                Swal.fire({
                    title: "Atencion eliminada con exito!",
                    icon: "success"
                })
                const deleteData = data.filter(data => data.id !== id)
                setHours(deleteData)
            } else {
                Swal.fire({
                    title: "Error desconocido, se recomienda actualizar la pagina.",
                    icon: "error",
                })
            }
        } else {
            Swal.fire({
                title: "Accion cancelada",
                icon: "error",
                confirmButtonColor: "#1D4ED8"
            })
        }
    }

    useEffect(() => {
        const getHours = async () => {
            setHours(await getRequest(process.env.REACT_APP_URL + "/api/patient/my_attentions"))
            setLoading(false)
        }
        getHours()
    }, [])

    return (
        <div className="flex justify-center">
            <div className="my-5 sm:mx-4 sm:w-[700px] py-5 px-2 bg-slate-50 rounded-xl shadow-lg flex flex-col justify-center">
                <div className="flex flex-row mb-5">
                <button className="ml-2 mr-5" onClick={()=>history(-1)}>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                </button>
                <h1 className="text-center font-medium text-xl">Mis Horas medicas</h1>
                </div>
                
                {
                    loading ? (
                        <h1>Cargando, demora unos segundos...</h1>
                    ) : (

                        hours.map((x) => (
                            <div key={x.rut} className="m-2 flex flex-row justify-between divide-y">
                                <div className="">
                                    <h1 className="font-">RUT medico: {x.rut_doctor}</h1>
                                    <h1 className="font-normal">Fecha: {x.date}</h1>
                                    <h1 className="font-normal">Hora: {x.start_time}</h1>
                                </div>

                                <div>
                                    <button onClick={()=>handleDelete(hours,x.id)} className=" m-2 border-2 border-red-600 bg-red-600 text-white rounded-md p-1 font-medium my-4 hover:bg-white hover:text-red-600" >Eliminar</button>
                                </div>
                            </div>
                        ))
                    )

                }


            </div>
        </div>

    )
}