import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from "react-hook-form";
import Table from 'react-bootstrap/Table';
import { FaTrashAlt,FaSpinner } from 'react-icons/fa';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Addcat = () => {

    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const [load, setload] = useState(false)
    const [done, setdone] = useState(false)
    const [cat, setcat] = useState([])
    const [act, setact] = useState(false)

    const onSubmit = async (data) => {
        setload(true)
        
        try {
            const response = await axios.post('http://localhost:3000/api/cat/',{nomCat:data.categorie});
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

    const delCat = async (id) => {
        
        try {
            const response = await axios.get(`http://localhost:3000/api/cat/${id}`);
            setact(!act);
        } catch (error) {
            console.error(error);
        }
    };

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
    }, [act])

    return (
        <main className="container-fluid">
            <p className="display-6">Ajouter Une Categorie</p>
            <div className="row">
                <div className="col-md-5">
                    {
                        done && <div className="alert alert-success">Nouvelle Categorie cree avec succes!!!</div>
                    }
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nom de la Categorie</Form.Label>
                            <Form.Control type="text" {...register("categorie", { required: true })}/>
                            {errors.categorie?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                        </Form.Group>
                        <Button type='submit' variant="secondary">
                            {load && <FaSpinner className='me-3'/>}
                            Ajouter
                        </Button>
                    </Form>
                </div>
                <div className="col-md-7">
                    {
                        cat.length!==0? (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>NOM</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {   cat.map((element,index) => {
                                        return(
                                            <tr key={index}>
                                                <td>{element.idCat}</td>
                                                <td>{element.nomCat}</td>
                                                <td>
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={
                                                            <Tooltip id="tooltip-top">
                                                                Supprimer la Categorie
                                                            </Tooltip>
                                                        }
                                                    >
                                                        <span style={{cursor:'pointer'}} onClick={()=>delCat(element.idCat)}>
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
                            <p className="display-6">AUCUNE CATEGORIE</p>
                        )
                    }
                </div>
            </div>
        </main>
    );
};

export default Addcat;