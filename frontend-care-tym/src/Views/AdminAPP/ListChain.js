import Component from "../../Component/AdminAPP/Component";
import { useEffect, useState } from "react";
import { getRequest } from "../../Services/Request";
import BottonsGo from "../../Component/Bottons/BottonsGo";

export default function ListChain(props) {

    const [chain, setChain] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const request = async () => {
            setChain(await getRequest(process.env.REACT_APP_URL+"/api/" + props.type))
        }

        request()
        setLoading(false)
    }, [props.type])


    return (
        <div className="m-auto">
            <div className="my-5 sm:mx-4 sm:w-[700px] py-5 px-2 bg-slate-50 rounded-xl shadow-lg">
            <div className="flex justify-center">
                    <div className="my-10 w-5/6 flex justify-between md:max-w-2xl lg:max-w-4xl">
                        <div className="self-center">
                            <h1 className="font-semibold text-xl">Redes de centro de salud</h1>
                        </div>
                        <div className="self-center">
                            <BottonsGo redirect={"/" + props.type + "create"} text={"Añadir"} />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="col-span-3 flex flex-col w-full md:w-5/6 md:max-w-2xl lg:max-w-4xl">
                        {
                            loading ?
                                null :
                                chain.map((x) => (
                                    <Component key={x.id} name={x.name} id={x.id} email={x.email} />
                                ))
                        }
                    </div>
                </div>

            </div>

        </div>


    )
}