import {Outlet} from 'react-router';
import { Link } from 'react-router-dom';


export default function MainPage(){
    return <>
    <div className="w-100 h4 bg-dark p-3 text-light">
        <img className="p-1 bg-light rounded-circle" width="50" src="/bureaucrat.svg"/>
        <span className="p-3">Bureaucrat</span>
    </div>
    <div className="container">
        <div className="row">  
            <div className="col-12 col-md-2">
                <nav>
                    <ul>
                        <li><Link to="/queues-page">Queues</Link></li>
                        <li><Link to="/blobs-page">Blobs</Link></li>
                        <li><Link to="/tables-page/main">Tables</Link></li>
                        <li><Link to="/trees-page/default/default">Trees</Link></li>
                    </ul>
                </nav>
            </div>
            <div className="col-12 col-md-10">
                <Outlet></Outlet>
            </div> 
        </div>
    </div>
    </>
}