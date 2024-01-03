import { useEffect, useState } from "react"
import { deleteRequest, getRequest } from "../../../Services/Request"
import Swal from 'sweetalert2'

export default function ListSpecialty(props) {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const api = props.api


    useEffect(() => {
        const getData = async () => {
            setData(await getRequest(api))
        }
        getData()
        setLoading(false)
    }, [api])

    const handleEdit = (x) => {
        props.setEdit(x)
        props.setType(2)
    }

    const handleDelete = async (data, x) => {

        const deleteAccion = await Swal.fire({
            title: "Accion permanente",
            text: "Eliminar " + x.name,
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#1D4ED8",
            confirmButtonText: "Eliminar especialidad",
            confirmButtonColor: "#D33"
        })
        if (deleteAccion.isConfirmed) {
            const resp = await deleteRequest(process.env.REACT_APP_URL+"/api/center/specialty/" + x.id)
            if (resp.status === 200) {
                Swal.fire({
                    title: x.rut + " eliminado con exito!",
                    icon: "success"
                })
                const deleteData = data.filter(data => data.name !== x.name)
                setData(deleteData)
            } else {
                Swal.fire({
                    title: "Error desconocido, contactar con el administrador.",
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

    return (
        <div className="mx-2 my-5 sm:w-96 py-5 px-2 bg-slate-50 rounded-xl shadow-lg divide-y divide-slate-300">
            <h1 className="text-center text-lg font-semibold mb-5">{props.title}</h1>
            {
                loading ? (
                    null
                ) : (
                    data.map((x) => (
                        <div key={x.id} className="m-2">
                            <h1 className="font-medium">{x.name}</h1>
                            <h1 className="font-light">ID {x.id}</h1>
                            <div>
                                    <button className="m-2 p-1 ml-0 text-white border-2 border-blue-700 bg-blue-700 rounded-md font-medium" onClick={() => handleEdit(x)} >Editar</button>
                                    <button className="m-2 border-2 border-red-600 text-red-600 rounded-md p-1 font-medium" onClick={() => handleDelete(data, x)}>Eliminar</button>
                                </div>
                        </div>
                    ))
                )

            }

        </div>
    )
}