import { useEffect, useState,useContext } from 'react';
import { VALEUR } from '../../App';
import Navbar from '../baniere/Navbar'
import {FaHeart} from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Produit = () => {

    const  {card,setcard,favor,setfavor}= useContext(VALEUR)

    const [cat, setcat] = useState([])
    const [change, setchange] = useState(false)
    const [homepro, sethomepro] = useState([])

    const addFavor = () => {
        setchange(!change)
    }

    async function getAllCat() {
        try {
          const response = await axios.get('http://localhost:3000/api/cat/');
          setcat(response.data);
        } catch (error) {
          console.error(error);
        }
    }

    useEffect(() => {
        getAllCat()
        leon()
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

    const leon = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/produit/getprobycat/0`);
            sethomepro(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = async (e) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/produit/getprobycat/${e.target.value}`);
            sethomepro(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Navbar />
            <main className="container mt-5">
                <div className="row">
                    <div className="col-3">
                        <div className="mb-3">
                            <select onChange={(e)=>handleChange(e)} style={{boxShadow:'none',borderColor:'inherit'}} className="form-select" id="exampleSelect">
                                <option value={0}>Tous Les Categories</option>
                                    {
                                        cat.length!==0 && (
                                            cat.map((element,index) => {
                                                return(
                                                    <option key={index} value={element.idCat}>{element.nomCat}</option>
                                                )
                                            })
                                        )
                                    }
                            </select>
                        </div>
                    </div>
                </div>
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
                                                <span onClick={()=>addFavor(element)} className='position-absolute' style={{color:change? 'red':'black',cursor:'pointer'}}>
                                                    <FaHeart />
                                                </span>
                                            </p>
                                            <div className="card-body">
                                                <h5 className="card-title">{element.nomPro}</h5>
                                                <p className="card-text d-flex justify-content-between">
                                                    <strong className='mt-2'>{element.prixPro} FCFA</strong>
                                                    <button onClick={(e)=>addcart(element)} className='btn btn-outline-primary'>Add to Cart</button>
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

export default Produit;