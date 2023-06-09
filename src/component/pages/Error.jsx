import { Link } from "react-router-dom";
import Navbar from '../baniere/Navbar'

const Error = () => {
    return (
        <>
            <Navbar />
            <main className="container mt-5">
                <p className="display-6 text-center">
                    PAGE NOT FOUND <br />
                    CLIQUER <Link to='/'>ICI</Link> POUR ALLER A LA PAGE {"D'ACCUEIL"}
                </p>
            </main>
        </>
    );
};

export default Error;