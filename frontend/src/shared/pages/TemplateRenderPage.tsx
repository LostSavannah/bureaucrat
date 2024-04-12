import { useLocation } from "react-router"
import TemplateRenderComponents from "../components/templates/TemplateRenderComponents";

export default function TemplateRenderPage() {
    const location = useLocation();
    const template = decodeURI(location
            .pathname.split("/").filter(l => l.length > 0).slice(1).join("/")
        );
    
  return (
    <TemplateRenderComponents template={template}/>
  )
}
