import { NavLink } from "react-router-dom";
import { VALEUR } from "../../App";
import { useContext } from "react";
import './Navbar.css';
import Baniere from "./Baniere";
import { FaBars } from "react-icons/fa";

const Navbar = () => {

    const  {card,setcard,favor,setfavor}= useContext(VALEUR)

    return (
        <header style={{backgroundColor:'#222',position:'relative'}}>
            <nav className="navbar navbar-expand-lg" aria-label="Eleventh navbar example">
                <div className="container-fluid">
                    <NavLink className="navbar-brand ms-2 text-white" to="/">CarSend</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
                        <span>
                            <FaBars className="text-white fs-3" />
                        </span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample09">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item px-3">
                                <NavLink style={({isActive})=>({color:isActive? 'yellow':'#fff'})} className="nav-link" aria-current="page" to="/">Accueil</NavLink>
                            </li>
                            <li className="nav-item px-3">
                                <NavLink style={({isActive})=>({color:isActive? 'yellow':'#fff'})} className="nav-link" to="/all-produit">Tous Les Produits</NavLink>
                            </li>
                            <li className="nav-item px-3">
                                <NavLink style={({isActive})=>({color:isActive? 'yellow':'#fff'})} className="nav-link" to="/favore-car">Favorites({favor.length})</NavLink>
                            </li>
                            <li className="nav-item px-3">
                                <NavLink style={({isActive})=>({color:isActive? 'yellow':'#fff'})} className="nav-link" to="/card">Card({card.length})</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Baniere />
            <div className="custom-shape-divider-bottom-1685287176">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
        </header>
    );
};

export default Navbar;