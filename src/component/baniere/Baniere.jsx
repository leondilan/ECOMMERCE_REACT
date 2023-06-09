import ModalBanniere from './ModalBanniere'
import { useState } from 'react';

const Baniere = () => {

    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <section className="container-fluid mt-5 p-lg-5 p-md-4">
                <div className="row">
                    <div className="col-lg-7">
                        <p className="display-4 text-white">Bugatti Chiron</p>
                        <p style={{textAlign:'justify',color:'gray'}}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error perspiciatis unde eveniet ea quos. Nesciunt dolorem animi commodi porro ad dolor quod sint, incidunt tenetur, pariatur ratione in ab suscipit! Soluta dolorem laudantium suscipit sunt, illo quidem fugiat libero id sapiente aspernatur! Aliquid voluptate iure, sunt quod cupiditate dolor necessitatibus!
                        </p>
                        <p>
                            <button onClick={() => setModalShow(true)} className="btn btn-outline-warning me-2 w-50">Learn More</button>
                        </p>
                    </div>
                    <div className="col-lg-5 d-none d-lg-block">
                        <img src="/public/images/car3.png" alt="image_baniere" className="img-fluid"/>
                    </div>
                </div>
            </section>
            <ModalBanniere
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
};

export default Baniere;