import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { getRequest, postRequest } from "../../Services/Request"

export default function Schedule() {

    const history = useNavigate()

    const data_user = JSON.parse(sessionStorage.getItem("data_patient"))
    const data_chain = JSON.parse(sessionStorage.getItem("data_chain"))

    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const formatDate = year + "-" + month + "-" + day


    const [centers, setCenters] = useState([])
    const [specialtys, setSpecialtys] = useState([])
    const [medics, setMedics] = useState([])
    const [selectDate, setSelectDate] = useState()
    const [blocks, setBlocks] = useState([])


    const [center, setCenter] = useState()
    const [specialty, setSpecialty] = useState()
    const [medic, setMedic] = useState()
    const [block, setBlock] = useState([])


    const [loadingCenter, setLoadingCenter] = useState(true)
    const [loadingSpecialty, setLoadingSpecialty] = useState(true)
    const [loadingMedic, setLoadingMedic] = useState(true)
    const [loadingBlock, setLoadingBlock] = useState(true)



    useEffect(() => {
        const getCenters = async () => {
            setCenters(await getRequest(process.env.REACT_APP_URL+"/api/patient/available_centers/" + data_chain.id))
            setLoadingCenter(false)
            console.log(formatDate)
        }
        getCenters()

    }, [])

    useEffect(() => {
        const getSpecialtys = async () => {
            if (center !== undefined) {
                setSpecialtys(await getRequest(process.env.REACT_APP_URL+"/api/patient/available_specialties/" + center))
                setLoadingSpecialty(false)
            }
        }
        getSpecialtys()

    }, [center])

    useEffect(() => {
        const getMedics = async () => {
            if (center !== undefined && specialty !== undefined) {
                setMedics(await getRequest(process.env.REACT_APP_URL+"/api/patient/available_medics/" + center + "/" + specialty))
                setLoadingMedic(false)
            }
        }
        getMedics()

    }, [specialty, center])

    useEffect(() => {
        const getBlock = async () => {
            if (center !== undefined && specialty !== undefined && selectDate !== undefined && selectDate !== undefined) {
                setBlocks(await getRequest(process.env.REACT_APP_URL+"/api/patient/available_attentions/" + medic + "/" + selectDate))
                setLoadingBlock(false)
            }
            console.log(blocks)
        }
        getBlock()

    }, [specialty, center, medic, selectDate])

    const handleSubmit = async () => {

        const submit = await Swal.fire({
            title: '¿Estas seguro que quieres agendar la hora?',
            text: "Medico " + medic + " con fecha " + selectDate + " a las " + block,
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#1D4ED8",
            confirmButtonText: "Agendar hora",
            confirmButtonColor: "#1D4ED8"
        })
        if (submit.isConfirmed) {
            const resp = await postRequest(process.env.REACT_APP_URL+"/api/patient/my_attentions/", JSON.stringify({ "medicRut": medic, "patientRut": data_user.rut, "date": selectDate, "startTime": block[0], "estimatedEnd": block[1] }))
            if (resp.status === 200) {
                Swal.fire({
                    title: "Hora agendada, se envio una copia a su correo electronico.",
                    icon: "success"
                })
            } else {
                Swal.fire({
                    title: "Error al agendar la hora, intente nuevamente, si el problema persiste contacte al centro medico.",
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
        <div className="flex justify-center">
            <div className="m-2 flex-col ">

                <button className="bg-blue-600 p-3 rounded-xl shadow-lg font-medium text-white my-2 sm:m-4" onClick={()=>history("/medical-hours")}>Mis horas medicas</button>

                <div className="mb-5 sm:mx-4 sm:w-[700px] py-5 px-2 bg-slate-50 rounded-xl shadow-lg flex flex-col justify-center">
                    <h1 className="text-center text-xl font-medium mb-5">Datos del usuario</h1>
                    <div className="grid grid-cols-2 sm:grid-cols-4">
                        <h1 className="text-end mr-2 mb-2 font-medium">Nombre completo:</h1>
                        <h1>{data_user.full_name}</h1>
                        <h1 className="text-end mr-2 mb-2 font-medium">Rut:</h1>
                        <h1>{data_user.rut}</h1>
                        <h1 className="text-end mr-2 mb-2 font-medium">Fecha de nacimineto:</h1>
                        <h1>{data_user.date_of_birth}</h1>
                        <h1 className="text-end mr-2 mb-2 font-medium">Cobertura de salud:</h1>
                        <h1>{data_user.health_coverage}</h1>
                        <h1 className="text-end mr-2 mb-2 font-medium">Correo electronico:</h1>
                        <h1>{data_user.email}</h1>
                        <h1 className="text-end mr-2 mb-2 font-medium">Telefono:</h1>
                        <h1>{data_user.phone}</h1>
                    </div>
                    <h1 className="text-center text-sm my-2">Recuerda que cualquier inconsistenca con los datos registrados debes llamar a un centro medico de la red CareTYM</h1>
                </div>

                <div className="my-5 sm:mx-4 sm:w-[700px] p-5 bg-slate-50 rounded-xl shadow-lg flex flex-col justify-center">
                    <h1 className="text-center text-xl font-medium mb-5">Agendamiento de hora medica</h1>


                    <div className="flex flex-col sm:flex-row mb-5">
                        <div className=" m-auto sm:mx-5 sm:my-auto rounded-full bg-blue-600 w-10 h-10 flex justify-center ">
                            <h1 className="text-white font-medium text-xl m-auto">1</h1>
                        </div>
                        <div className="flex-auto">
                            <h1 className="my-5 text-center sm:text-start font-medium text-lg">Selecciona un centro medico</h1>
                            {
                                loadingCenter ? (<p>Cargando...</p>) :
                                    (
                                        <select onChange={(e) => setCenter(e.target.value)} className={"bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5"}>
                                            <option >Elija un centro</option>
                                            {

                                                centers.map((x) => (
                                                    <option value={x.id}>{x.name}</option>
                                                ))
                                            }
                                        </select>
                                    )
                            }
                        </div>

                    </div>


                    <div className="flex flex-col sm:flex-row mb-5">
                        <div className="mx-auto sm:mx-5 sm:my-auto rounded-full bg-blue-600 w-10 h-10 flex justify-center align-middle">
                            <h1 className="text-white font-medium text-xl m-auto">2</h1>
                        </div>
                        <div className="flex-auto">
                            <h1 className="my-5 text-center sm:text-start font-medium text-lg">Selecciona una especialidad medica</h1>
                            {
                                loadingSpecialty ? (<p>Primero debe seleccionar un centro medico</p>) :
                                    (
                                        <select onChange={(e) => setSpecialty(e.target.value)} className={"bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5"}>
                                            <option >Elija una especialidad</option>
                                            {
                                                specialtys.map((x) => (
                                                    <option value={x.id}>{x.name}</option>
                                                ))
                                            }
                                        </select>
                                    )
                            }
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row mb-5">
                        <div className="mx-auto sm:mx-5 sm:my-auto rounded-full bg-blue-600 w-10 h-10 flex justify-center align-middle">
                            <h1 className="text-white font-medium text-xl m-auto">3</h1>
                        </div>
                        <div className="flex-auto">
                            <h1 className="my-5 text-center sm:text-start font-medium text-lg">Selecciona un medic@</h1>
                            {
                                loadingMedic ? (<p>Primero debe seleccionar una especialidad</p>) :
                                    (
                                        <select onChange={(e) => setMedic(e.target.value)} className={"bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5"}>
                                            <option >Elija un medic@</option>
                                            {
                                                medics.map((x) => (
                                                    <option value={x.rut}>{x.full_name}</option>
                                                ))
                                            }
                                        </select>
                                    )
                            }
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row mb-5">
                        <div className="mx-auto sm:mx-5 sm:my-auto rounded-full bg-blue-600 w-10 h-10 flex justify-center align-middle">
                            <h1 className="text-white font-medium text-xl m-auto">4</h1>
                        </div>
                        <div className="flex-auto">
                            <h1 className="my-5 text-center sm:text-start font-medium text-lg">Selecciona una fecha</h1>
                            <input type="date" onChange={(e) => setSelectDate(e.target.value)} min={formatDate} className={"bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5"} />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row mb-5">
                        <div className="mx-auto sm:mx-5 sm:mt-9 rounded-full bg-blue-600 w-10 h-10 flex justify-center align-middle">
                            <h1 className="text-white font-medium text-xl m-auto">5</h1>
                        </div>
                        <div className="flex-auto">
                            <h1 className="my-5 text-center sm:text-start font-medium text-lg">Selecciona una hora</h1>
                            {
                                loadingBlock ? (<p>Completa todos los campos requeridos!</p>) :
                                    (
                                        <div className="grid grid-cols-2 gap-4">
                                            {
                                                blocks.map((x) => (
                                                    <button id={x} onClick={(e) => setBlock(x)} className="bg-blue-600 text-white text-base border-2 border-blue-600 rounded-full font-medium shadow-md block w-full p-2.5 focus:bg-white focus:text-black hover:bg-blue-700">
                                                        {x[0]}
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    )
                            }
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row mb-5">
                        <div className="mx-auto sm:mx-5 sm:mt-9 rounded-full bg-blue-600 w-10 h-10 flex justify-center align-middle">
                            <h1 className="text-white font-medium text-xl m-auto">6</h1>
                        </div>
                        <div className="flex-auto">
                            <h1 className="my-5 text-center sm:text-start font-medium text-lg">Resumen de agendamiento</h1>
                            {
                                block.length === 0 ? (<p>Completa hasta el punto 5 para ver tu resumen.</p>) :
                                    (
                                        <div className="flex flex-col justify-start ">
                                            <div className="flex flex-row m-1">
                                                <h1 className="text-end font-medium mr-1 w-28">Centro medico: </h1>
                                                <h1 className="text-start">{center}</h1>
                                            </div>
                                            <div className="flex flex-row m-1">
                                                <h1 className="text-end font-medium mr-1 w-28">Especialidad: </h1>
                                                <h1 className="text-start">{specialty}</h1>
                                            </div>
                                            <div className="flex flex-row m-1">
                                                <h1 className="text-end font-medium mr-1 w-28">Medico: </h1>
                                                <h1 className="text-start">{medic}</h1>
                                            </div>
                                            <div className="flex flex-row m-1">
                                                <h1 className="text-end font-medium mr-1  w-28">Fecha: </h1>
                                                <h1 className="text-start">{selectDate}</h1>
                                            </div>
                                            <div className="flex flex-row m-1">
                                                <h1 className="text-end font-medium mr-1 w-28">Hora: </h1>
                                                <h1 className="text-start">{block[0]}</h1>
                                            </div>
                                            <button className="bg-blue-600 p-2 rounded-full text-white mt-6 font-medium" onClick={handleSubmit}>Agendar hora</button>
                                        </div>
                                    )
                            }
                        </div>
                    </div>

                    

                </div>
            </div >
        </div>

    )
}