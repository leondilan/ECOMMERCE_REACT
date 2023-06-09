import { useParams } from "react-router-dom";
import './Home.css';
import {FaBars} from 'react-icons/fa';
import { VALEUR } from "../../App";
import { NavLink } from 'react-router-dom';
import { useEffect, useState,useContext } from "react";
import axios from "axios";

const SinglePro = () => {

    const  {card,setcard,favor,setfavor}= useContext(VALEUR) 

    const {id}=useParams()

    const [single, setsingle] = useState([])

    async function getSinglePro() {
        try {
          const response = await axios.get(`http://localhost:3000/api/produit/getsingle/${id}`);
          setsingle(response.data);
        } catch (error) {
          console.error(error);
        }
    }

    useEffect(() => {
        getSinglePro()
    }, [])

    const addcart = (produit) => {
        let existPro=card.find((item)=>item.idPro==produit.idPro)
        if (existPro) {
            let addQte=card.map((item)=>
                item.idPro==produit.idPro? (
                    {...item,qte:item.qte+1}
                ):item
            )
            setcard(addQte)
        }else{
            setcard([...card,{...produit,qte:1}])
        }
    }

    return (
        <>
            <header style={{backgroundColor:'#222'}}>
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
            </header>
            <main className="container mt-5">
                {
                    single.length!==0 && (
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-5">
                                <img src={`http://localhost:3000/images/${single.imagePro}`} alt="logo" className="img-fluid"/>
                            </div>
                            <div className="col-lg-7">
                                <p className="display-6 fw-bold">{single.nomPro}</p>
                                <p style={{textAlign:'justify'}} className="fs-4">
                                    {single.descPro}
                                </p>
                                <p className="d-flex justify-content-between">
                                    <strong className="fs-3">{single.prixPro} FCFA</strong>  
                                    <button onClick={()=>addcart(single)} className='btn btn-outline-primary w-50'>Add to Cart</button>
                                </p>
                            </div>
                        </div>
                    )
                }
            </main>
        </>
    );
};

export default SinglePro;