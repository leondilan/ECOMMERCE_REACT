import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Button from 'react-bootstrap/Button';
import ModalPaie from './ModalPaie';
import { useState } from 'react';

const ToastCard = ({data}) => {

    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <ToastContainer className="p-3 position-fixed" position={'top-center'}>
                <Toast>
                    <Toast.Header closeButton={false}>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">Car Send</strong>
                        <small>
                            {data.length > 0 && <Button onClick={() => setModalShow(true)} variant="primary">Payer</Button>}
                        </small>
                        </Toast.Header>
                    <Toast.Body>
                        <strong>Total Commande: 
                            {
                                data.reduce((somme,element) => {
                                    return somme + element.prixPro*element.qte 
                                },0)
                            }{' '}
                        FCFA</strong>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
            <ModalPaie
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
};

export default ToastCard;