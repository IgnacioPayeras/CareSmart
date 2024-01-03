import BottonsGo from "../../Component/Bottons/BottonsGo";

export default function Component(props) {
    
    return (
        <div className="flex justify-center">
            <div className="my-2 pb-1 border-b border-black flex flex-row justify-between w-5/6 md:max-w-2xl lg:max-w-4xl">
                <div className="flex flex-col">
                <h1 className="text-lg font-medium">{props.name}</h1>
                <h1 className="text-sm">{props.email}</h1>
                </div>
                
                <BottonsGo redirect={"/admin/edit/"+props.id} text={"Editar"}/>
            </div>
        </div>

    )
}