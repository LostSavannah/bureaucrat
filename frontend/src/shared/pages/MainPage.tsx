import {Outlet} from 'react-router';
import { Link } from 'react-router-dom';


export default function MainPage(){
    return <>
    <div className="container">
        <div className="row">  
            <div className="col-12 col-md-3">
                <header>Bureaucrat</header>
                <nav>
                    <ul>
                        <li><Link to="/queues-page">Queues</Link></li>
                        <li><Link to="/blobs-page">Blobs</Link></li>
                        <li><Link to="/tables-page/main">Tables</Link></li>
                        <li><Link to="/trees-page/default/default">Trees</Link></li>
                    </ul>
                </nav>
            </div>
            <div className="col-12 col-md-9">
                <Outlet></Outlet>
            </div> 
        </div>
    </div>
    </>
}