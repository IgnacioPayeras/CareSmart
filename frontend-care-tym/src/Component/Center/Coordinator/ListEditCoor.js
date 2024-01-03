import { useEffect, useState } from "react"
import { deleteRequest, getRequest } from "../../../Services/Request"
import Swal from 'sweetalert2'

export default function ListEditCoor(props) {

    const [data, setData] = useState([])
    const [backupData, setBackupData] = useState([])
    const [search, setSearch] = useState()

    const [loading, setLoading] = useState(true)

    const api = props.api

    useEffect(() => {

        const newData = backupData.filter((coor) => {
            const name = coor.full_name.toUpperCase()
            const rut = coor.rut
            return name.indexOf(search.toUpperCase()) > -1 || rut.indexOf(search) > -1
        })
        setData(newData)
    }, [search])


    useEffect(() => {
        const getData = async () => {
            const data = await getRequest(api)
            setData(data)
            setBackupData(data)
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
            text: "Eliminar coordinador con rut: " + x.rut,
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#1D4ED8",
            confirmButtonText: "Eliminar medico",
            confirmButtonColor: "#D33"
        })
        if (deleteAccion.isConfirmed) {
            const resp = await deleteRequest(process.env.REACT_APP_URL+"/api/center/coordinator/" + x.rut)
            if (resp.status === 200) {
                Swal.fire({
                    title: "Coordinador con rut: " + x.rut + " eliminado con exito!",
                    icon: "success"
                })
                const deleteData = data.filter(data => data.rut !== x.rut)
                setData(deleteData)
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



    return (
        <div className="sm:w-96 my-5 sm:mx-4 py-5 px-2 bg-slate-50 rounded-xl shadow-xl divide-y divide-slate-300">
            <div className="flex flex-col">
                <h1 className="text-center text-xl font-semibold mb-2" >{props.title}</h1>
                <input className="border rounded-md m-3 p-1" placeholder="Filtro por nombre o rut" value={search} onChange={(e) => setSearch(e.target.value)}></input>
            </div>
            <div className="flex flex-col overflow-auto sm:h-[85%] h-[400px] divide-y">

                {
                    loading ? (
                        null
                    ) : (
                        data.map((x) => (
                            <div key={x.rut} className="m-2">
                                <h1 className="font-medium text-lg">{x.full_name}</h1>
                                <h1 className="font-normal">RUT: {x.rut}</h1>
                                <h1 className="font-normal">Correo: {x.email}</h1>
                                <div>
                                    <button className="m-2 p-1 ml-0 text-white border-2 border-blue-700 bg-blue-700 rounded-md font-medium" onClick={() => handleEdit(x)} >Editar</button>
                                    <button className="m-2 border-2 border-red-600 text-red-600 rounded-md p-1 font-medium" onClick={() => handleDelete(data, x)}>Eliminar</button>
                                </div>
                            </div>
                        ))
                    )

                }
            </div>
        </div>
    )
}