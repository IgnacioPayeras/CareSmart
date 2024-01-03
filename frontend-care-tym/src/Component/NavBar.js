import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthProvider from "../Auth/AuthProvider"

export default function NavBar() {

    const { Logout } = useContext(AuthProvider)

    const session = sessionStorage.getItem("auth-token") ? true : false // asigna booleano segun el estado del usuario (existe o no)
    const type = sessionStorage.getItem("rol")

    const history = useNavigate()

    const home = () => {
        
        if (!sessionStorage.getItem("rol")) history("/")

        if (sessionStorage.getItem("rol") === "admin") history("/admin")
        if (sessionStorage.getItem("rol") === "medical_chain") history("/chain")
        if (sessionStorage.getItem("rol") === "medical_center") history("/center")

    }

    const [navbarOpen, setNavbarOpen] = useState(false);
    return (
        <>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 m-1 rounded-2xl md:m-0 md:rounded-none mb-3">
                <div className={"container px-4 mx-auto flex flex-wrap items-center justify-between" + (type !== "medical_center" ? " flex-nowrap" : "")}>
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <button onClick={() => home()} className="font-bold text-2xl text-white">
                            {session ? sessionStorage.getItem("title") : "CareTYM"}
                        </button>
                        {   //logica de boton collapse y cerrar sesion
                            type !== "medical_center" ? (
                                null
                            ) :
                                (
                                    <button className="text-black cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded  block lg:hidden outline-none focus:outline-none" type="button" onClick={() => setNavbarOpen(!navbarOpen)}>
                                        {
                                            !navbarOpen ? (
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                                            ) : (
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                            )
                                        }
                                    </button>
                                )
                        }
                    </div>
                    <div className={"lg:flex flex-grow justify-center" + (navbarOpen ? " flex" : " hidden") + (type !== "medical_center" ? "flex grow-0 flex-row" : "")} id="example-navbar-danger">
                        <ul className="flex flex-col items-center lg:flex-row list-none lg:ml-auto">
                            {   // logica ref de tipos de usuarios
                                type === "medical_center" && session ? (
                                    <>
                                        <li>
                                            <a href="/center" className="mx-4 block py-2 pr-4 pl-3 text-white rounded md:bg-transparent dark:text-white" aria-current="page">Inicio</a>
                                        </li>
                                        <li>
                                            <a href="/center/medic" className="mx-4 block py-2 pr-4 pl-3 text-white rounded md:bg-transparent dark:text-white" aria-current="page">Medicos</a>
                                        </li>
                                        <li>
                                            <a href="/center/specialty" className="mx-4 block py-2 pr-4 pl-3 text-white rounded md:bg-transparent dark:text-white" aria-current="page">Especialidades</a>
                                        </li>
                                        <li>
                                            <a href="/center/coordinator" className="mx-4 block py-2 pr-4 pl-3 text-white rounded md:bg-transparent dark:text-white" aria-current="page">Coordinadores</a>
                                        </li>
                                    </>

                                ) :
                                    (
                                        null
                                    )
                            }

                            <li>
                                {   //cerrar sesion
                                    session === true && type === "medical_center" ? (
                                        <div className=" mx-4 self-center justify-end flex flex-row md:mr-0">
                                            <button onClick={Logout} className="bg-red-600 p-1 rounded-lg shadow-lg">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                                            </button>
                                        </div>
                                    ) :
                                        (
                                            null
                                        )
                                }
                            </li>
                        </ul>
                        {   //cerrar sesion
                            session === true && type !== "medical_center" ? (
                                <div className=" mx-4 self-center justify-end flex flex-row md:mr-0">
                                    <button onClick={Logout} className="bg-red-600 p-1 rounded-lg shadow-lg">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                                    </button>
                                </div>
                            ) :
                                (
                                    null
                                )
                        }
                    </div>

                </div>
            </nav>
        </>
    )

}