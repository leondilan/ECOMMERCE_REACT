import { createContext,useEffect,useState } from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Card from "./component/pages/Card";
import Produit from "./component/pages/Produit";
import Home from "./component/pages/Home";
import Favor from "./component/pages/Favor";
import Error from "./component/pages/Error";
import Homeadmin from "./component/pages/admin/Homeadmin";
import SinglePro from "./component/pages/SinglePro";

export const VALEUR=createContext()

const App = () => {

  const [card, setcard] = useState(JSON.parse(localStorage.getItem('card')) || [])
  const [favor, setfavor] = useState(JSON.parse(localStorage.getItem('favor')) || [])

  const allvalues={card,setcard,favor,setfavor}

  useEffect(() => {
    localStorage.setItem('card',JSON.stringify(card))
    localStorage.setItem('favor',JSON.stringify(favor))
  }, [card,favor])

  return (
    <VALEUR.Provider value={allvalues}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/card" element={<Card />} />
          <Route path="/favore-car" element={<Favor />} />
          <Route path="/all-produit" element={<Produit />} />
          <Route path="/single_produit/:id" element={<SinglePro />} />
          <Route path="/high-tec-center-admin/*" element={<Homeadmin />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </VALEUR.Provider>
  );
};

export default App;