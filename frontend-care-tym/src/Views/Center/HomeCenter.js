import ListMedicCoor from "../../Component/Center/ListMedicCoor";
import ListShort from "../../Component/Center/ListShort";

export default function HomeCenter() {
    return (
        <div className="flex justify-center mt-6">
            <div className="flex flex-col justify-center flex-wrap w-11/12 py-2">
                <h1 className="text-center text-2xl font-semibold mt-2">Resumen centro medico</h1>
                <div className="flex flex-col sm:flex-row flex-nowrap my-5">

                    <ListShort title={"Especialidades globales"} api={process.env.REACT_APP_URL+"/api/center/specialty"}/>

                    <ListMedicCoor title={"Medicos"} api={process.env.REACT_APP_URL+"/api/center/medic"} route={"/center/medic"}/>

                    <ListMedicCoor title={"Coordinadores"} api={process.env.REACT_APP_URL+"/api/center/coordinator"} route={"/center/coordinator"}/>

                </div>

            </div>
        </div>

    )
}