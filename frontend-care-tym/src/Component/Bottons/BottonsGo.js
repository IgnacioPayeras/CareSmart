import { useNavigate } from "react-router-dom"
export default function BottonsGo(props){

    const history = useNavigate()

    return(
        <button className="p-2 my-2 bg-green-400 rounded-lg shadow-lg font-semibold text-lg hover:shadow-sm" onClick={() => history(props.redirect)}>
            {props.text}
        </button>
    )
}