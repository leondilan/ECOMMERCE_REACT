import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';

const dash = () => {

    const [nbre, setnbre] = useState(0)
    const [sum, setsum] = useState(0)

    async function getnbreCmd() {
        try {
          const response = await axios.get('http://localhost:3000/api/commande/nbreCmd');
          setnbre(response.data);
        } catch (error) {
          console.error(error);
        }
    }
    async function getsomme() {
        try {
          const response = await axios.get('http://localhost:3000/api/commande/somme');
          setsum(response.data);
        } catch (error) {
          console.error(error);
        }
    }

    useEffect(() => {
        getnbreCmd()
        getsomme()
    }, [])

    return (
        <main className="container-fluid">
            <p className="display-6">Commandes</p>
            <div className="row d-flex justify-content-center">
                <div className="col-md-4">
                    <Card className='mb-3 text-center'>
                        <Card.Body>
                            <Card.Title>TODAY</Card.Title>
                            <Card.Text className='fs-1'>
                                {nbre}
                            </Card.Text>
                            <Card.Subtitle className="mb-2 text-muted">Commandes {"Aujourd'hui"}</Card.Subtitle>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <p className="display-6">Revenue</p>
            <div className="row d-flex justify-content-center">
                <div className="col-md-4">
                    <Card className='mb-3 text-center'>
                        <Card.Body>
                            <Card.Title>TODAY</Card.Title>
                            <Card.Text className='fs-1'>
                                {sum || 0}
                            </Card.Text>
                            <Card.Subtitle className="mb-2 text-muted">FCFA</Card.Subtitle>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </main>
    );
};

export default dash;