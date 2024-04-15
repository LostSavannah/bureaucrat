import {Outlet} from 'react-router';
import { Link } from 'react-router-dom';


export default function MainPage(){
    const pages = [
        {
            location: "/queues-page",
            text: "Queues 🚶"
        },
        {
            location: "/blobs-page",
            text: "Blobs 📁"
        },
        {
            location: "/tables-page/main",
            text: "Tables 🛢"
        },
        {
            location: "/trees-page/default/default",
            text: "Trees 🌳"
        },
        {
            location: "/templates-page",
            text: "Templates 🎨"
        },
        {
            location: "/workers-page",
            text: "Workers ⚙"
        },
    ]
    return <>
    <div className="w-100 h4 bg-dark p-3 text-light">
        <span className="p-3">Bureaucrat</span>
    </div>
    <div className="container">
        <div className="row">  
            <div className="col-12 col-md-2">
                <div className="h-100 w-100 d-flex flex-column">
                    {pages.map(p => <Link key={p.location} to={p.location}>
                        <button className="btn btn-success w-100 m-1">
                            {p.text}
                        </button>
                    </Link>)}
                </div>
            </div>
            <div className="col-12 col-md-10">
                <Outlet></Outlet>
            </div> 
        </div>
    </div>
    </>
}