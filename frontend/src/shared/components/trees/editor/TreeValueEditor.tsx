import { TreeValue } from "../../../types/TreeResult";

export interface TreeValueEditorProps{
    value:TreeValue,
    path:string[],
    setValue: (value:TreeValue, path:string[]) => void    
}

export function TreeValueStringEditor({value, path, setValue}:TreeValueEditorProps){
    return (<>
        "<input
            type="text" 
            className="text-success"
            value={value as string}
            onChange={(e) => {
                const content = e.target.value;
                setValue(content ?? "", path);
            }}
        />"
    </>);
}

export function TreeListEditor({value, path, setValue}:TreeValueEditorProps){
    if(Array.isArray(value)){   
        return <> &#91; {Object.keys(value).map(key => (
        <div className="p-2">
            <TreeValueEditor
                value={value[parseInt(key)]}
                path={[...path, key]}
                setValue={setValue}
            ></TreeValueEditor>
        </div> ))} &#93; </>;
    }
    return <></>;
}

export function TreeValueEditor({value, path, setValue}:TreeValueEditorProps){
    if(typeof value === "string"){
        return <TreeValueStringEditor
            value={value}
            path={path}
            setValue={setValue}
        ></TreeValueStringEditor>
    }else if(Array.isArray(value)){
        return <TreeListEditor
        value={value}
        path={path}
        setValue={setValue}
    ></TreeListEditor>       
    }else{
        return <> &#123; <div className="p-2">{Object.keys(value).map(key => (<>
            <div className="p-2 text-danger"><strong>"{key}":</strong>
                    <TreeValueEditor
                        value={value[key]}
                        path={[...path, key]}
                        setValue={setValue}
                    ></TreeValueEditor>,</div> 
        </>))} </div> &#125; </>;
    }
}