import { useState } from "react"
import { TreeValue } from "../../../types/TreeResult"

export interface TreeEditorProps{
    value:TreeValue
}

function TreeViewStringEditor({initialValue}:{initialValue: string}){
  const [value, setValue] = useState(initialValue);
  return <input type="text" className="w-25" value={value} onChange={e => setValue(e.target.value)} />
}

export default function TreeValueEditor({value}:TreeEditorProps) {
  if(typeof value === "string"){
    return <TreeViewStringEditor initialValue={value}></TreeViewStringEditor>
  }
  return (
    <div>TreeValueDictionaryEditor</div>
  )
}