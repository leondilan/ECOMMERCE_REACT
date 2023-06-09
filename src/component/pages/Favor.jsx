import Navbar from '../baniere/Navbar'
import { VALEUR } from '../../App';
import { useContext } from 'react';
import {FaHeart} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import $ from 'jquery'

const Favor = () => {

    const  {card,setcard,favor,setfavor}= useContext(VALEUR)

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

    const addFavor = (produit) => {
        if ($(`.${produit.idPro}`).hasClass('text-danger')) {
            $(`.${produit.idPro}`).removeClass('text-danger')
            let Find=favor.filter(item=>item.idPro!==produit.idPro)
            setfavor(Find)
        }else{
            $(`.${produit.idPro}`).addClass('text-danger')
            setfavor([...favor,{...produit}])
        }
    }

    return (
        <>
            <Navbar />
            <main className="container mt-5">
                <p className="display-6">Voitures Favorites</p>
                <p>
                    {favor.length!==0 && <Button onClick={()=>setfavor([])} variant="primary">Remove All</Button>}
                </p>
                {
                    favor.length===0? (
                        <p className='display-6 text-center'>Pas De Voiture favorites</p>
                    ):(
                        <div className='row'>
                            {favor.map((element,index) => {
                                return(
                                    <div className="col-lg-3 col-md-6" key={index}>
                                        <div className="card mb-3">
                                            <p className='position-relative'>
                                                <Link style={{all:'unset'}} to={`/single_produit/${element.idPro}`}>
                                                    <img src={`http://localhost:3000/images/${element.imagePro}`} alt="logo_card" width={"100%"} height={"180"} className='card-img-top'/>
                                                </Link>
                                                <span onClick={()=>addFavor(element)} className={element.favor===1? `position-absolute text-danger ${element.idPro}`:`position-absolute ${element.idPro}`} style={{color:(element.favor===1 && 'red')}}>
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
                            })}
                        </div>
                    )
                }
            </main>
        </>
    );
};

export default Favor;