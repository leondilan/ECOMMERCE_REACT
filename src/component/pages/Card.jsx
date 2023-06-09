import Navbar from '../baniere/Navbar'
import { VALEUR } from '../../App';
import { useContext } from 'react';
import { FaTrashRestore } from 'react-icons/fa';
import ToastCard from './ToastCard';

const Card = () => {

    const  {card,setcard,favor,setfavor}= useContext(VALEUR)

    const incre = (id) => {
        let AddQte=card.map(element => 
            element.idPro===id? (
                {...element,qte:element.qte+1}
            ):element
        )
        setcard(AddQte)
    }

    const desincre = (id) => {
        let FindQte=card.find(item=>item.idPro===id)
        
        if (FindQte.qte===1) {
            let removePro=card.filter(item=>item.idPro!==id)
            setcard(removePro)
        } else {
            let IncQte=card.map(element => 
                element.idPro===id? (
                    {...element,qte:element.qte-1}
                ):element
            )
            setcard(IncQte)
        }
    }

    const delPro = (id) => {
        let removePro=card.filter(item=>item.idPro!==id)
        setcard(removePro)
    }


    return (
        <>
            <Navbar />
            <main className="container mt-5">
                <ToastCard data={card}/>
                <p className="display-6">Voiture(s) Commandées</p>
                <div className="row d-flex justify-content-center">
                    {
                        card.length===0? (
                            <p className='display-6 text-center'>Card Vide</p>
                        ):(
                            card.map((element,index) => {
                                return(
                                    <>
                                        <div className="col-12" key={index}>
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <img className='img-fluid' src={`http://localhost:3000/images/${element.imagePro}`} alt="logo" />
                                                </div>
                                                <div className="col-md-9">
                                                    <p style={{cursor:'pointer'}} className="fs-5 d-flex justify-content-between">
                                                        <span>{element.nomPro}</span>
                                                        <span onClick={()=>delPro(element.idPro)}><FaTrashRestore className='text-danger' /></span>
                                                    </p>
                                                    <p className="fs-5">{element.qte}*{element.prixPro}</p>
                                                    <p>
                                                        <button onClick={()=>incre(element.idPro)} className='btn btn-primary'>+</button>{' '}
                                                        <button onClick={()=>desincre(element.idPro)} className='btn btn-primary'>-</button>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                    </>
                                )
                            })
                        )
                    }
                </div>
            </main>
        </>
    );
};

export default Card;