import { useEffect, useState } from "react";
import { BureaucratTemplatesService } from "../../services/BureaucratTemplatesService";


export function useTemplateRenderComponents(){
    
    const [renders, setRenders] = useState<string[]>([])
    const [parsers, setParsers] = useState<string[]>([])
    const [result, setResult] = useState<{
        contentType:string, data:string
    }>({
        contentType: "",
        data: ""
    })

    useEffect(() => {
        const service = new BureaucratTemplatesService();
        service.getRenders().then(setRenders)
        service.getParsers().then(setParsers)
    }, []);

    function render(template:string, render:string, parser:string, content:string){
        new BureaucratTemplatesService()
            .executeTemplate(template, content, render, parser)
            .then(setResult)
    }

    return{
        renders,
        parsers,
        result,
        render
    }
}