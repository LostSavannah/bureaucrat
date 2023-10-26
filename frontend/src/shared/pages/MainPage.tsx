import {Outlet} from 'react-router';


export default function MainPage(){
    return <>
    <div className="container">
        <div className="row">  
            <div className="col-12 col-md-3">
                <header>Bureaucrat</header>
                <nav>
                    <ul>
                        <li><a href="/queues-page">Queues</a></li>
                        <li><a href="/blobs-page">Blobs</a></li>
                        <li><a href="/tables-page">Tables</a></li>
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