import { useState } from "react"
import { useNavigate } from "react-router-dom"
import BottonsCreate from "../../Component/Bottons/BottonsCreate"
import Swal from "sweetalert2";
import { postRequest } from "../../Services/Request"


export default function CreateCenter(props) {

    const history = useNavigate()

    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()
    const [address, setAddress] = useState()
    const [city, setCity] = useState()

    const [loading, setLoading] = useState(false)

    const data = {
        name,
        password,
        address,
        email,
        city
    }

    const handleSubmit = async (x) => {
        x.preventDefault()

        setLoading(!loading)
        const resp = await postRequest(process.env.REACT_APP_URL+"/api/chain", JSON.stringify(data))
        setLoading(false)
        if (resp.status === 200) {
            await Swal.fire("Accion exitosa", "Centro creado exitosamente!!", "success")
            window.location.reload(true)
        } else {
            document.getElementById("error").innerHTML = "Error al procesar los datos."
        }

    }

    return (
        <div className="m-auto">
            <div className="flex justify-center flex-col py-5 px-2 bg-slate-50 rounded-xl shadow-lg my-5 sm:mx-4 sm:w-[700px]">

                <div className="flex justify-center">
                    <div className="mt-10 mb-4 w-5/6 flex md:max-w-2xl lg:max-w-4xl">
                        <button onClick={() => history(-1)}>
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        </button>
                        <h1 className="ml-4 text-xl font-medium align-top">Crear red centro médico</h1>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="my-10 w-5/6 grid md:w-1/2 md:max-w-lg">
                        <form className="grid gap-6 m-3" onSubmit={handleSubmit} id="form">
                            <div>
                                <label className="my-2 block font-medium">Nombre</label>
                                <input onChange={(x) => setName(x.target.value)} autocomplete="off" type="text" className="bg-gray-100 border rounded-lg shadow-lg block w-full p-2.5" required/>
                            </div>
                            <div>
                                <label className="my-2 block font-medium">Ciudad</label>
                                <input onChange={(x) => setCity(x.target.value)} autocomplete="off" type="text" className="bg-gray-100 border rounded-lg shadow-lg block w-full p-2.5" required/>
                            </div>
                            <div>
                                <label className="my-2 block font-medium">Direccion</label>
                                <input onChange={(x) => setAddress(x.target.value)} autocomplete="off" type="text" className="bg-gray-100 border rounded-lg shadow-lg block w-full p-2.5" required/>
                            </div>
                            <div>
                                <label className="my-2 block font-medium">Correo institucional</label>
                                <input onChange={(x) => setEmail(x.target.value)} autocomplete="off" type="email" className="bg-gray-100 border rounded-lg shadow-lg block w-full p-2.5" required/>
                            </div>
                            <div>
                                <label className="my-2 block font-medium">Contraseña</label>
                                <input onChange={(x) => setPassword(x.target.value)} autocomplete="off" type="password" className="bg-gray-100 border rounded-lg shadow-lg block w-full p-2.5" required/>
                            </div>
                            <div id="error" className="text-red-500 text-center"></div>
                            <BottonsCreate text={"Registrar"} load={"Registrando"} loading={loading}/>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}