import { Routes, Route } from "react-router-dom"
import Footer from "./Component/Footer";
import Activation from "./Page/Activation";
import Create from "./Views/AdminAPP/Create";
import Edit from "./Views/AdminAPP/Edit";
import Admin from "./Page/Admin";
import Login from "./Page/Login";
import ListChain from "./Views/AdminAPP/ListChain";
import ListCenter from "./Views/Chain/ListCenter"
import { AuthProvider } from "./Auth/AuthProvider";
import Chain from "./Page/Chain";
import EditCenter from "./Views/Chain/EditCenter";
import CreateCenter from "./Views/Chain/CreateCenter";
import NavBar from "./Component/NavBar";
import Center from "./Page/Center";
import HomeCenter from "./Views/Center/HomeCenter";
import Medic from "./Views/Center/Medic";
import Specialty from "./Views/Center/Specialty";
import Coordinator from "./Views/Center/Coordinator";
import LoginSchedule from "./Page/LoginSchedule";
import Register from "./Views/Schedule/Register";
import Schedule from "./Views/Schedule/Schedule";
import MedicalHours from "./Views/Schedule/MedicalHours";

export default function App() {
    return (
        <div>
            <div className="min-h-screen bg-stone-200">
                <AuthProvider>
                    <NavBar/>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/activation" element={<Activation />} />

                        <Route path="/admin" element={<Admin />}>
                            <Route index element={<ListChain  type={"admin/"} text={"Redes de cadenas de salud"} />} />
                            <Route path="/admin/create" element={<Create />} />
                            <Route path="/admin/edit/:id" element={<Edit />} />
                        </Route>

                        <Route path="/chain" element={<Chain/>}>
                            <Route index element={<ListCenter type={"chain/"} text={"Centros de salud"}/>} />
                            <Route path="/chain/edit/:id/:name" element={<EditCenter />}/>
                            <Route path="/chain/create/" element={<CreateCenter />}/>
                        </Route>

                        <Route path="/center" element={<Center/>}>
                            <Route index element={<HomeCenter/>} />
                            <Route path="/center/medic" element={<Medic/>}/>
                            <Route path="/center/specialty" element={<Specialty/>}/>
                            <Route path="/center/coordinator" element={<Coordinator/>}/>
                        </Route>

                        <Route path="/:id" element={<LoginSchedule/>}/>
                        <Route path="/register/:rut" element={<Register/>}/>
                        <Route path="/schedule/" element={<Schedule/>}/>
                        <Route path="/medical-hours" element={<MedicalHours/>}/>


                        <Route path="/recovery" element={<Login />} />

                    </Routes>
                </AuthProvider>

            </div>

            <Footer />
        </div>

    )
}
