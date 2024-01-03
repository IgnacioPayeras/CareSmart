import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getRequest } from "../../Services/Request"

export default function ListMedic(props) {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const api = props.api

    const history = useNavigate()


    useEffect(() => {
        const getData = async () => {
            setData(await getRequest(api))
        }
        getData()
        setLoading(false)
    }, [api])


    return (
        <div className="mx-2 min-w-fit my-5 sm:w-4/12 py-5 px-2 bg-slate-50 rounded-xl shadow-lg divide-y">
            <h1 className="text-center text-lg font-semibold mb-5">{props.title}</h1>
            {
                loading ? (
                    null
                ) : (
                    data.map((x) => (
                        <div key={x.rut} className="m-2">
                            <h1 className="font-medium">{x.full_name}</h1>
                            <h1 className="font-light">RUT {x.rut}</h1>
                        </div>
                    ))
                )

            }
            <div className="flex justify-end">
                <button className="bg-blue-700 text-white font-medium p-2.5 rounded-xl shadow-xl mt-4 hover:shadow-none" onClick={()=> history(props.route)}>Ver mas</button>
            </div>

        </div>
    )
}