import { useEffect, useRef } from "react";

export default function EmbeddedContent({contentType, data}:{contentType:string, data:string}) {
    const ref = useRef<HTMLIFrameElement>(null);
    useEffect(() => {
        if(ref.current){
            ref.current.src = `data:${contentType};base64,${data}`;
        }
    }, [ref, contentType, data]);
  return (
    <div className="p-2 h-100">
        <iframe className="w-100 h-100" ref={ref}></iframe>
    </div>
  )
}