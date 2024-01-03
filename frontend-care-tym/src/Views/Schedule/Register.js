import { useState } from "react"
import { useParams } from "react-router-dom"
import BottonsCreate from "../../Component/Bottons/BottonsCreate"
import Swal from "sweetalert2"
import dni from "global-dni"
import { postRequest } from "../../Services/Request"

export default function Register() {

    const [loading, setLoading] = useState(false)

    const { rut } = useParams()
    
    const [healthCoverage, setHealthCoverage] = useState()
    const [name, setName] = useState()
    const [sex, setSex] = useState()
    const [age, setAge] = useState()
    const [date, setDate] = useState()
    const [address, setAddress] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()

    const handleSubmit = async(x) => {
        x.preventDefault()

        const data = {
            rut,
            "full_name" : name,
            "date_of_birth" : date,
            phone,
            "gender" : sex,
            address,
            email,
            "health_coverage" : healthCoverage
        }

        if(dni.CL.validate(rut)){
            setLoading(!loading)
            const resp = await postRequest(process.env.REACT_APP_URL+"/api/auth/create_account", JSON.stringify(data))
            setLoading(false)
            if (resp.status === 200) {
                await Swal.fire("Accion exitosa", "Medico creado exitosamente!!", "success")
                window.location.reload(true)
            } else {
                document.getElementById("error").innerHTML = "Error al procesar los datos."
            }
        }else{
            document.getElementById("error").innerHTML = "Rut no valido, regrese al inicio."
            document.getElementById("rut").className += " border-red-600 border-2 checked:border-red-600 "
        }  
    }


    return (
        <div className=" flex justify-center">
            <div className="my-5 sm:mx-4 sm:w-[700px] py-5 px-2 bg-slate-50 rounded-xl shadow-lg flex flex-col justify-center">
                <h1 className="font-semibold text-2xl text-center">Sistema de registro Care TYM</h1>
                <h1 className="font-base text-md text-center my-4">Al registrarte podras agendar horas medicas en todos los centros de salud que estamos disponible, es rapido, facil y seguro.</h1>

                <form className="sm:mx-32" onSubmit={handleSubmit} id="form">
                    <label className="my-2 block font-medium">Rut usuario</label>
                    <input disabled className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" value={rut}/>

                    <label className="my-2 block font-medium">Cobertura de salud</label>
                    <input className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" value={healthCoverage} onChange={(e)=> setHealthCoverage(e.target.value)}/>

                    <label className="my-2 block font-medium">Nombre completo</label>
                    <input className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" value={name} onChange={(e)=> setName(e.target.value)}/>

                    <label className="my-2 block font-medium">Sexo</label>
                    <input className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" value={sex} onChange={(e)=> setSex(e.target.value)}/>

                    <label className="my-2 block font-medium">Edad</label>
                    <input type="number" className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" value={age} onChange={(e)=> setAge(e.target.value)}/>

                    <label className="my-2 block font-medium">Fecha de nacimiento</label>
                    <input type="date" className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" value={date} onChange={(e)=> setDate(e.target.value)}/>

                    <label className="my-2 block font-medium">Direccion </label>
                    <input className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" value={address} onChange={(e)=> setAddress(e.target.value)}/>

                    <label className="my-2 block font-medium">Telefono</label>
                    <input className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" value={phone} onChange={(e)=> setPhone(e.target.value)}/>

                    <label className="my-2 block font-medium">Correo electronico</label>
                    <input className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5 mb-3" value={email} onChange={(e)=> setEmail(e.target.value)}/>

                    <BottonsCreate text={"Registrarse"} load={"Registrando..."}/>
                    <p id="error" className="text-xs text-red-600"></p>
                </form>

            </div>

        </div>
    )
}