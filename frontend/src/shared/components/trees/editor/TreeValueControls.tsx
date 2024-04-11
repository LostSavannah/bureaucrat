import { useState } from "react";

export interface TreeValueControlsProps{
    onAddTree: () => void,
    onAddList: () => void,
    onAddValue: () => void,
    onDelete: () => void
}

export default function TreeValueControls({onAddTree, onAddList, onAddValue, onDelete}:TreeValueControlsProps) {
    const [expanded, setExpanded] = useState(false);
    return <>
        <button 
            onClick={() => setExpanded(!expanded)}
            className="btn badge text-bg-primary">
                {expanded ? "<<": ">>"}
        </button>
        {expanded && <>
            <button onClick={onAddTree} className={`btn badge text-bg-success`}>Add Branch</button>
            <button onClick={onAddList} className={`btn badge text-bg-success`}>Add List</button>
            <button onClick={onAddValue} className={`btn badge text-bg-success`}>Add Value</button>
            <button onClick={onDelete} className={`btn badge text-bg-danger`}>Remove</button>
        </>}
    </>
}
