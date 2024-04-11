import { useState } from "react";
import { TreeValue } from "../../../types/TreeResult";
import TreeValueControls from "./TreeValueControls";

export interface ControlsElementProps{
    actions:{
        name: string,
        className: string,
        handler: () => void
    }[]
}

export function ControlsElement({actions}:ControlsElementProps){
    const [expanded, setExpanded] = useState(false);
    return <>
        <button 
            onClick={() => setExpanded(!expanded)}
            className="btn badge text-bg-primary">
                {expanded ? "<<": ">>"}
            </button>
        {expanded && actions.map(a => <button
            onClick={() => a.handler()}
            className={`btn badge text-bg-${a.className}`}
        >{a.name}</button>)}
    </>
}

export interface TreeValueEditorProps{
    value:TreeValue,
    path:string[],
    setValue: (value:TreeValue, path:string[]) => void,
    removeValue: (path:string[]) => void   
}

export function TreeValueStringEditor({value, path, setValue, removeValue}:TreeValueEditorProps){
    return (<div className="w-100 d-flex">
        <button
            onClick={() => removeValue([...path])}
            className="btn badge text-bg-danger"
        >x</button>
        <input
            type="text" 
            className="border-0 flex-grow-1 bg-secondary"
            value={value as string}
            onChange={(e) => {
                const content = e.target.value;
                setValue(content ?? "", path);
                e.target.size = Math.max(content.length * 1.03, 1);
            }}
        />
    </div>);
}

export function TreeValueEditor({value, path, setValue, removeValue}:TreeValueEditorProps){
    const [expanded, setExpanded] = useState(false);
    if(typeof value === "string"){
        return <TreeValueStringEditor
            value={value}
            path={path}
            setValue={setValue}
            removeValue={removeValue}
        ></TreeValueStringEditor>
    }else if(Array.isArray(value)){
        return <div>
                <div className="">
                <button 
                    className="btn badge text-bg-danger"
                    onClick={() => setExpanded(!expanded)}
                >{expanded? "▲": "▼"}</button>
                <TreeValueControls
                    onAddList={() => setValue([], [...path, (1000000).toString()])}
                    onAddTree={() => setValue({}, [...path, (1000000).toString()])}
                    onAddValue={() => setValue("", [...path, (1000000).toString()])}
                    onDelete={() => {removeValue([...path])}}
                />
                </div>
                {
                    expanded && <div>
                    {Object.keys(value).map(key => (

                        <div className="p-3">
                        <div className="d-flex justify-content-begin">
                            <span className="badge text-bg-primary">[{key}]</span>
                        </div>
                        <TreeValueEditor
                            value={value[parseInt(key)]}
                            path={[...path, key]}
                            setValue={setValue}
                            removeValue={removeValue}
                        ></TreeValueEditor>
                        </div>
                        ))}  
                    </div>
                }
        </div>  
    }else{
        return <>
            <div>
                <div>
                <button 
                    className="btn badge text-bg-danger"
                    onClick={() => setExpanded(!expanded)}
                    >{expanded? "▲": "▼"}</button>
                    <TreeValueControls
                        onAddTree={() => {
                            const treeName = prompt("Tree name")
                            if(treeName){
                                setValue({}, [...path, treeName!])
                            }
                        }}
                        onAddList={() => {
                            const treeName = prompt("List name")
                            if(treeName){
                                setValue([], [...path, treeName!])
                            }
                        }}
                        onAddValue={() => {
                            const treeName = prompt("Value name")
                            if(treeName){
                                setValue("", [...path, treeName!])
                            }
                        }}
                        onDelete={() => removeValue([...path])}
                    />
                </div>
                {
                    expanded && <div>
                    {Object.keys(value).map(key => (<>
                    <div className="p-3">
                        <div className="d-flex justify-content-begin">
                            <span className="badge text-bg-primary">"{key}"</span>
                        </div>
                        <TreeValueEditor
                            key={[...path, key].join("/")}
                            value={value[key]}
                            path={[...path, key]}
                            setValue={setValue}
                            removeValue={removeValue}
                        ></TreeValueEditor>
                    </div> 
                </>))} 
                    </div>
                }
        </div></>;
    }
}