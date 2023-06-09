import Dash from "./Dash";
import { Routes,Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Addproduit from "./Addproduit";
import Addcat from "./Addcat";
import Order from "./Order";

const Homeadmin = () => {
    return (
        <main className="container-fluid">
            <div className="row">
                <p className="display-6">CAR SEND ADMIN</p>
                <div className="col-4">
                    <Sidebar />
                </div>
                <div className="col-8">
                    <Routes>
                        <Route path="/" element={<Dash />} />
                        <Route path="/produit" element={<Addproduit />} />
                        <Route path="/categories" element={<Addcat />} />
                        <Route path="/order" element={<Order />} />
                    </Routes>
                </div>
            </div>
        </main>
    );
};

export default Homeadmin;