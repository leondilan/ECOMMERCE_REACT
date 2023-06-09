import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {FaTrash} from 'react-icons/fa'
import Form from 'react-bootstrap/Form';

moment.locale('fr')

const Order = () => {

    const [cmd, setcmd] = useState([])
    const [fresh, setfresh] = useState(false)

    async function getCmd() {
        try {
          const response = await axios.get('http://localhost:3000/api/commande/getcmd');
          setcmd(response.data);
        } catch (error) {
          console.error(error);
        }
    }

    async function handleLivre(id,e) {
        try {
          await axios.post(`http://localhost:3000/api/commande/statelivre/${id}`,{val:e.target.value});
          setfresh(!fresh)
        } catch (error) {
          console.error(error);
        }
    }

    async function delCmd(id) {
        try {
          await axios.get(`http://localhost:3000/api/commande/delCmd/${id}`);
          setfresh(!fresh)
        } catch (error) {
          console.error(error);
        }
    }

    useEffect(() => {
        getCmd()
    }, [fresh])

    return (
        <main className='container-fluid'>
            <p className="display-6">Tous Vos Commandes Recentes</p>
            <div className="row d-flex justify-content-center">
                <div className="col">
                    {
                        cmd.length!==0? (
                            <Table bordered>
                        <thead>
                            <tr>
                                <th>NOM PRODUIT</th>
                                <th>PRIX PRODUIT</th>
                                <th>QTE PRODUIT</th>
                                <th>NOM CLIENT</th>
                                <th>NUMERO CLIENT</th>
                                <th>TOTAL COMMANDES</th>
                                <th>DATE COMMANDES</th>
                                <th>LIVRER</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cmd.map((element,index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{element.nomPro}</td>
                                            <td>{element.prixPro}</td>
                                            <td>{element.qteCmd}</td>
                                            <td>{element.nomCli}</td>
                                            <td>{element.numCli}</td>
                                            <td>{element.Total}</td>
                                            <td>{moment(element.date, "YYYYMMDD").fromNow()}</td>
                                            <td>
                                                <span className='text-danger'>
                                                    {element.livre===0? 'Non':'Oui'}
                                                </span>
                                                <Form>
                                                    <Form.Select onChange={(e)=>handleLivre(element.idCmd,e)} aria-label="Default select example">
                                                        <option value="0">0</option>
                                                        <option value="1">1</option>
                                                    </Form.Select>
                                                </Form>
                                            </td>
                                            <td onClick={()=>delCmd(element.idCmd)}>
                                                <FaTrash className='text-danger' />
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                            </Table>
                        ):(
                            <p className='fs-5 text-center'>AUCUNE COMMANDES</p>
                        )
                    }
                </div>
            </div>
        </main>
    );
};

export default Order;