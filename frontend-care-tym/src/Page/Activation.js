
export default function Activation() {
    return(
        <div className="grid">
            <div className="m-4 flex flex-col md:justify-self-center md:bg-slate-300 md:w-1/2 md:max-w-lg md:rounded-xl md:shadow-xl">
                <h1 className="font-semibold text-xl my-5 md:mt-10 md:text-center md:text-2xl">Activacion de la cuenta</h1>
                <form className=" grid gap-6 m-3">
                    <div className="">
                        <label className="my-2 block font-medium">Usuario</label>
                        <input className="bg-gray-100 border border-gray-300 rounded-lg shadow-lg block w-full p-2.5" />
                    </div>
                    <div className="">
                        <label className="my-2 block font-medium">Contraseña provisoria</label>
                        <input type="password" className="bg-gray-100 border rounded-lg shadow-lg block w-full p-2.5"/>
                    </div>
                    <div className="">
                        <label className="my-2 block font-medium">Contraseña nueva</label>
                        <input type="password" className="bg-gray-100 border rounded-lg shadow-lg block w-full p-2.5"/>
                    </div>
                    <div className="">
                        <label className="my-2 block font-medium">Repita la contraseña</label>
                        <input type="password" className="bg-gray-100 border rounded-lg shadow-lg block w-full p-2.5"/>
                    </div>
                    <button className="p-3 my-2 bg-green-500 rounded-lg shadow-lg font-semibold text-xl hover:shadow-sm">Activar cuenta</button>
                </form>
            </div>
        </div>
    )
}