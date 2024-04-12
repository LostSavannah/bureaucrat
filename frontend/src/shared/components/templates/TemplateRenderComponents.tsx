import { useEffect, useState } from "react";
import Combo from "../common/Combo";
import { useTemplateRenderComponents } from "./useTemplateRenderComponents";
import EmbeddedContent from "./EmbeddedContent";

export default function TemplateRenderComponents({template}:{template:string}) {
    const {renders, parsers, result, render:doRender} = useTemplateRenderComponents();
    const [render, setRender] = useState<string>("");
    const [parser, setParser] = useState<string>("");
    
    useEffect(() => setRender(renders[0]), [renders])
    useEffect(() => setParser(parsers[0]), [parsers])
    
    const [data, setData] = useState("");
  
  return <div className="vh-100">
        <h4>Rendering: {template}</h4>
        
        <div className="row h-100">
            <div className="col-6 h-100 d-flex flex-column p-2">
                <div className="d-flex align-items-end justify-content-between p-2">
                    <div className="d-flex flex-column">
                        <span className="p-2">Render: </span>
                        <Combo
                            items={renders}
                            value={render}
                            fromString={e => e}
                            toStringV={e => e}
                            getDescription={e => e}
                            onChange={setRender}
                        />
                    </div>
                    <div className="d-flex flex-column ">
                        <span className="p-2">Parser: </span>
                        <Combo
                            items={parsers}
                            value={parser}
                            fromString={e => e}
                            toStringV={e => e}
                            getDescription={e => e}
                            onChange={setParser}
                        />
                    </div>
                    <button onClick={() =>doRender(
                        template, render, parser, data
                    )} className="btn btn-danger">Execute</button>
                </div>
                <div className="flex-grow-1 h-100 p-2">
                <textarea
                    value={data}
                    placeholder="Insert the data here..."
                    onChange={e => setData(e.target.value)} 
                    className="w-100 h-100"></textarea>
                </div>
            </div>
            <div className="col-6 h-100 d-flex flex-column p-2">
                <EmbeddedContent
                    contentType={result.contentType}
                    data={result.data}
                />
            </div>
        </div>
    </div>
}
