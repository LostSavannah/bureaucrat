import { TreeValue } from "../../../types/TreeResult";

export interface TreeValueEditorProps{
    value:TreeValue,
    path:string[],
    setValue: (value:TreeValue, path:string[]) => void    
}

export function TreeValueStringEditor({value, path, setValue}:TreeValueEditorProps){
    return (<>
        <input type="text" 
            value={value as string}
            onChange={(e) => {
                const content = e.target.value;
                setValue(content, path);
            }}
        />
    </>);
}

export function TreeListEditor({value, path, setValue}:TreeValueEditorProps){
    if(Array.isArray(value)){   
        return <> {Object.keys(value).map(key => (
        <TreeValueEditor
            value={value[parseInt(key)]}
            path={[...path, key]}
            setValue={setValue}
        ></TreeValueEditor>))} </>;
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
        return <> {Object.keys(value).map(key => (<>
            <strong>{key}</strong> <TreeValueEditor
                value={value[key]}
                path={[...path, key]}
                setValue={setValue}
            ></TreeValueEditor>
        </>))} </>;
    }
}