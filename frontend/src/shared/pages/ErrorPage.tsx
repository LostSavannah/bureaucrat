import {useLocation, useRouteError} from 'react-router'

const baseName: string = import.meta.env.VITE_BASENAME;



export default function ErrorPage(){
    const location = useLocation();
    const error = useRouteError();
    console.log(error);
    const details: {name: string, data: string}[] = [
        {name: "baseName", data: baseName},
        {name: "location", data: location.pathname}
    ]
    return <>
        <h4>I Kant take it anymore 🙁</h4>
        <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {details.map(d => <tr>
                    <td>{d.name}</td>
                    <td>{d.data}</td>
                </tr>)}
            </tbody>
        </table>
    </>
}