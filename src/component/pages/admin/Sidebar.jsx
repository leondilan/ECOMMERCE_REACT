import { Link,useNavigate } from "react-router-dom";
import {FaHome,FaShoppingBag,FaBars,FaSignOutAlt,FaCartPlus} from 'react-icons/fa'

const Sidebar = () => {

    const history=useNavigate()

    return (
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Link to='' style={{all:'unset',cursor:'pointer'}}>
              <FaHome className="me-2" />
              Dashboard
            </Link>
          </li>
          <li className="list-group-item">
            <Link to='categories' style={{all:'unset',cursor:'pointer'}}>
              <FaBars className="me-2" />
              Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to='produit' style={{all:'unset',cursor:'pointer'}}>
              <FaShoppingBag className="me-2" />
              Produit
            </Link>
          </li>
          <li className="list-group-item">
            <Link to='order' style={{all:'unset',cursor:'pointer'}}>
              <FaCartPlus className="me-2" />
              Commandes
            </Link>
          </li>
          <li className="list-group-item" onClick={()=>history('/')}>
            <Link to='categories' style={{all:'unset',cursor:'pointer'}}>
              <FaSignOutAlt className="me-2" />
              Deconnexion
            </Link>
          </li>
        </ul>
    );
};

export default Sidebar;