import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BottonsUpdate from "../../Component/Bottons/BottonsUpdate"
import BottonsDelete from "../../Component/Bottons/BottonsDelete"
import BottonsCancel from "../../Component/Bottons/BottonsCancel"
import { getRequest } from "../../Services/Request"

export default function Edit(props) {

    const { id } = useParams()
    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()

    useEffect(() => {
        const getData = async () => {
            const data = await getRequest(process.env.REACT_APP_URL+"/api/admin/" + id)
            setName(data.name)
            setEmail(data.email)
        }
        getData()
    }, [id])

    const data = {
        name,
        password,
        email
    }

    return (
        <div className="m-auto">
            <div className="flex justify-center flex-col my-5 sm:mx-4 sm:w-[700px] py-5 px-2 bg-slate-50 rounded-xl shadow-lg">

                <div className="flex justify-center">
                    <div className="mt-10 mb-4 w-5/6 flex md:max-w-2xl lg:max-w-4xl">
                        <h1 className="ml-4 text-xl font-medium align-top">Editar centro médico</h1>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="my-10 w-5/6 grid md:w-1/2 md:max-w-lg">
                        <form className="grid gap-6 m-3">
                            <div>
                                <label className="my-2 block font-medium">Nombre</label>
                                <input onChange={(x) => setName(x.target.value)} value={name} autocomplete="off" type="text" className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" />
                            </div>
                            <div>
                                <label className="my-2 block font-medium">Correo institucional</label>
                                <input onChange={(x) => setEmail(x.target.value)} value={email} autocomplete="off" type="email" className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" />
                            </div>
                            <div>
                                <label className="my-2 block font-medium">Contraseña</label>
                                <input onChange={(x) => setPassword(x.target.value)} autocomplete="off" type="password" className="bg-gray-100 border border-gray-500 rounded-lg shadow-lg block w-full p-2.5" />
                            </div>
                            <div id="error" className="text-red-500 text-center"></div>

                            <div className="grid grid-cols-2">
                                <BottonsUpdate api={process.env.REACT_APP_URL+"/api/admin/" + id} text={"Actualizar"} load={"Actualizando"} data={data} error={"Error al actualizar"} />
                                <BottonsCancel redirect={"/admin"} text={"Cancelar"} />
                            </div>
                            <BottonsDelete api={process.env.REACT_APP_URL+"/api/admin/" + id} text={"Eliminar cadena medica"} load={"Eliminando"} error={"Error al eliminar la cadena"} />

                        </form>
                    </div>
                </div>

            </div>

        </div>

    )
}