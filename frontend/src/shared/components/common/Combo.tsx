import React from "react"

export interface ComboProps<T>{
    value:T,
    items:T[]
    onChange: (item:T) => void,
    getDescription: (item:T) => string,
    toStringV: ((item:T) => string),
    fromString: ((value:string) => T)
}

export default function Combo<T>({
    value, items, onChange, getDescription, toStringV, fromString
}:ComboProps<T>){

    function handleOnChange(event:React.ChangeEvent<HTMLSelectElement>){
        onChange(fromString(event.target.value));
    }

    return <>
        <select className='form-select' value={toStringV(value)} onChange={handleOnChange}>
            {items.map(item => <option key={toStringV(item)} value={toStringV(item)}>{getDescription(item)}</option>)}
        </select>
</>
}