import './Home.css';
import { useEffect, useState,useContext } from 'react';
import { VALEUR } from '../../App';
import {FaHeart} from 'react-icons/fa';
import Navbar from '../baniere/Navbar'
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery';

const Home = () => {

    const [homepro, sethomepro] = useState([])
    const  {card,setcard,favor,setfavor}= useContext(VALEUR)

    const addFavor = (produit) => {
        if ($(`.${produit.idPro}`).hasClass('text-danger')) {
            $(`.${produit.idPro}`).removeClass('text-danger')
            let Find=favor.filter(item=>item.idPro!==produit.idPro)
            setfavor(Find)
        }else{
            $(`.${produit.idPro}`).addClass('text-danger')
            setfavor([...favor,{...produit,favor:1}])
        }
    }

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

    async function allproduit() {
        try {
          const response = await axios.get('http://localhost:3000/api/produit/getall');
          sethomepro(response.data);
        } catch (error) {
          console.error(error);
        }
    }

    useEffect(() => {
        allproduit()
    }, [])

    return (
        <>
            <Navbar />
            <main className="container mt-5">
                <p className="display-6">Nouveau Arrivage</p>
                <div className="row d-flex justify-content-center">
                    {
                        homepro.length!==0 && (
                            homepro.map((element,index) => {
                                return(
                                    <div className="col-lg-3 col-md-6" key={index}>
                                        <div className="card mb-3">
                                            <p className='position-relative'>
                                                <Link style={{all:'unset'}} to={`/single_produit/${element.idPro}`}>
                                                    <img src={`http://localhost:3000/images/${element.imagePro}`} alt="logo_card" width={"100%"} height={"180"} className='card-img-top'/>
                                                </Link>
                                                <span onClick={()=>addFavor(element)} className={`position-absolute ${element.idPro}`}>
                                                    <FaHeart />
                                                </span>
                                            </p>
                                            <div className="card-body">
                                                <h5 className="card-title">{element.nomPro}</h5>
                                                <p className="card-text d-flex justify-content-between">
                                                    <strong className='mt-2'>{element.prixPro} FCFA</strong>
                                                    <button onClick={()=>addcart(element)} className='btn btn-outline-primary'>Add to Cart</button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
            </main>
        </>
    );
};

export default Home;