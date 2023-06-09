import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { useForm } from "react-hook-form";
import { VALEUR } from '../../App';
import { useContext } from 'react';
import emailjs  from '@emailjs/browser';
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import axios from 'axios';

const ModalPaie = (props) => {

    const [load, setload] = useState(false)
    const [succes, setsucces] = useState(false)
    const  {card,setcard,favor,setfavor}= useContext(VALEUR)
    
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        setload(true)
        var templateParams = {
            name: data.nom,
            tel: data.tel
        };
        emailjs.send('service_hp70khi', 'template_yc7zctm', templateParams,'aeDI8UYprapWWDHxx')
            .then(function(response) {
               
            }, function(error) {
            console.log('FAILED...', error);
            });

        card.forEach(async(element) => {
            try {
                const response = await axios.post('http://localhost:3000/api/commande/addcommande',{
                    nomCli:data.nom,numCli:data.tel,idPro:element.idPro,prixPro:element.prixPro,qteCmd:element.qte
                });
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        })
        setcard([])
        reset()
        setload(false)
        setsucces(true)
        setTimeout(() => {
            setsucces(false)
        }, 4000);
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Car Send 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Information Personnel</h4>
                {succes && <Alert variant='success' className='text-center'>Commande Passée avec succes <br /> Vous allez Contactez Par notre equipe bientot</Alert>}
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="nom">
                        <Form.Label>NOM</Form.Label>
                        <Form.Control type="text" {...register("nom", { required: true })}/>
                        {errors.nom && <span className='text-danger'>Ce Champs est Requis</span>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="tel">
                        <Form.Label>TELEPHONE</Form.Label>
                        <Form.Control type="tel" {...register("tel", { required: true })}/>
                        {errors.tel && <span className='text-danger'>Ce Champs est Requis</span>}
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {load && <FaSpinner className='me-2'/>}
                        Valider
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalPaie;