import { useEffect, useState } from "react";
import { BureaucratTemplatesService } from "../../services/BureaucratTemplatesService";

export function useTemplateEditComponent(template:string){
    const [templateContent, setTemplateContent] = useState("");

    useEffect(() => {
        new BureaucratTemplatesService()
            .getTemplate(template)
            .then(setTemplateContent);
    }, [template])

    function save(){
        new BureaucratTemplatesService()
            .setTemplate(template, templateContent);
    }

    return {
        templateContent,
        setTemplateContent,
        save
    }
}