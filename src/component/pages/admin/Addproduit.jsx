import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from "react-hook-form";
import Table from 'react-bootstrap/Table';
import { FaTrashAlt,FaSpinner } from 'react-icons/fa';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Addproduit = () => {

    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const [load, setload] = useState(false)
    const [done, setdone] = useState(false)
    const [pro, setpro] = useState([])
    const [act, setact] = useState(false)
    const [cat, setcat] = useState([])

    const onSubmit = async (data) => {
        setload(true)

        const formData = new FormData();
        formData.append('nomPro', data.produit);
        formData.append('catPro', data.cat);
        formData.append('descPro', data.desc);
        formData.append('prixPro', data.prix);
        formData.append('file', data.photo[0]);
        
        try {
            const response = await axios.post('http://localhost:3000/api/produit/',formData);
            setdone(response.data);
            setact(!act);
            setload(false)
            reset()
            setTimeout(() => {
                setdone(false)
            }, 2000);
        } catch (error) {
            console.error(error);
            setload(false)
        }
    };

    async function getAllPro() {
        try {
          const response = await axios.get('http://localhost:3000/api/produit/');
          setpro(response.data);
        } catch (error) {
          console.error(error);
        }
    }
    async function getAllCat() {
        try {
          const response = await axios.get('http://localhost:3000/api/cat/');
          setcat(response.data);
        } catch (error) {
          console.error(error);
        }
    }

    const delPro = async (id) => {
        
        try {
            const response = await axios.get(`http://localhost:3000/api/produit/${id}`);
            setact(!act);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAllPro()
        getAllCat()
    }, [act])

    const validateImage = (file) => {
        if (!file) {
          return 'Le fichier est requis';
        }
        // if (file.type.index0f('image/')===-1) {
        //     return 'Le fichier doit être une image';
        // }
        if (file.size > 3000000) {
          return 'Le fichier ne doit pas dépasser 3 Mo';
        }
        return true;
    };

    return (
        <main className="container-fluid">
            <p className="display-6">Ajouter Un Produit</p>
            <div className="row">
                <div className="col-md-5">
                    {
                        done && <div className="alert alert-success">Produit cree avec succes!!!</div>
                    }
                    <Form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data format'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nom du Produit</Form.Label>
                            <Form.Control type="text" {...register("produit", { required: true, minLength: 5 })}/>
                            {errors.produit?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                        </Form.Group>
                        <Form.Select aria-label="Default select example" {...register("cat",{required:true})}>
                            <option value="">Choisir La Categorie</option>
                            {
                                cat.length!==0 && (
                                    cat.map((element,index) => {
                                        return(
                                            <option key={index} value={element.idCat}>{element.nomCat}</option>
                                        )
                                    })
                                )
                            }
                        </Form.Select>
                        {errors.cat?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                        <Form.Group className="my-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} {...register("desc",{required:true,minLength:20})}/>
                            {errors.desc?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                            {errors.desc?.type==='minLength' && <span className='text-danger'>Ce Champ trop court</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="prix">
                            <Form.Label>Prix en FCFA</Form.Label>
                            <Form.Control type="text" {...register("prix",{required:true,pattern:/^[0-9]+$/})}/>
                            {errors.prix?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                            {errors.prix?.type==='pattern' && <span className='text-danger'>Uniquement les chiffres</span>}
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Photo du Produit</Form.Label>
                            <Form.Control type="file" {...register("photo",{ validate: validateImage })}/>
                            {errors.photo && <span className='text-danger'>{errors.photo.message}</span>}
                        </Form.Group>
                        <Button type='submit' variant="secondary">
                            {load && <FaSpinner className='me-3'/>}
                            Ajouter
                        </Button>
                    </Form>
                </div>
                <div className="col-md-7">
                {
                        pro.length!==0? (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>NOM PRODUIT</th>
                                        <th>CATEGORIE</th>
                                        <th>PRIX</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {   pro.map((element,index) => {
                                        return(
                                            <tr key={index}>
                                                <td>{element.idPro}</td>
                                                <td>{element.nomPro}</td>
                                                <td>{element.nomCat}</td>
                                                <td>{element.prixPro}</td>
                                                <td>
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={
                                                            <Tooltip id="tooltip-top">
                                                                Supprimer le produit
                                                            </Tooltip>
                                                        }
                                                    >
                                                        <span style={{cursor:'pointer'}} onClick={()=>delPro(element.idPro)}>
                                                            <FaTrashAlt className='text-danger' />
                                                        </span>
                                                    </OverlayTrigger>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        ):(
                            <p className="display-6">AUCUN PRODUIT</p>
                        )
                    }
                </div>
            </div>
        </main>
    );
};

export default Addproduit;