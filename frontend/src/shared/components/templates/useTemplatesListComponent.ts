import { useCallback, useEffect, useState } from "react";
import { BureaucratTemplatesService } from "../../services/BureaucratTemplatesService";

export function useTemplatesListComponent(){
    const [templates, setTemplates] = useState<string[]>([]);
    const [currentTemplate, setCurrentTemplate] = useState<string|undefined>();
    const [newTemplateName, setNewTemplateName] = useState("");

    const refreshTemplates = useCallback(() => {
        new BureaucratTemplatesService()
        .getTemplates()
        .then(setTemplates);
    }, []);

    useEffect(() => {
        refreshTemplates();
    }, [refreshTemplates])

    function saveNewTemplate(){
        if(newTemplateName != ""){
            new BureaucratTemplatesService()
                .setTemplate(newTemplateName, `Template: ${newTemplateName}`)
                .then(() => {
                    setNewTemplateName("");
                    refreshTemplates();
                });
        }
    }

    function remove(template:string){
        new BureaucratTemplatesService()
            .deleteTemplate(template)
            .then(() => {
                setCurrentTemplate(undefined);
                refreshTemplates();
            });
    }

    return {
        templates,
        currentTemplate,
        newTemplateName,
        saveNewTemplate,
        setCurrentTemplate,
        setNewTemplateName,
        remove
    }
}