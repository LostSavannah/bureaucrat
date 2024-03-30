import {useLocation} from 'react-router'

export default function ErrorPage(){
    const location = useLocation();
    return <>Boberto detectado {location.pathname} : {import.meta.env.VITE_BASENAME}</>
}