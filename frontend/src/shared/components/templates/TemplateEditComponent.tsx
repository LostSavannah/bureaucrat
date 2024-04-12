import { useNavigate } from "react-router";
import { useTemplateEditComponent } from "./useTemplateEditComponent"

export interface TemplateEditComponentProps{
    template:string
}

export default function TemplateEditComponent({template}:TemplateEditComponentProps) {

    const navigate = useNavigate();
    const {
        templateContent, setTemplateContent, save
    } = useTemplateEditComponent(template);

  function getTemplateName(){
      return (template?.split("/") ?? [""]).pop()
  }
  return (
    <div className="d-flex flex-column w-100 h-100">
        <h5>{getTemplateName()}</h5>
        <div>
            <button onClick={() => save()} className="btn btn-success">Update</button>
            <button
                onClick={() => navigate(`/templates-page/${template}`)} 
                className="btn btn-danger">Run</button>
        </div>
        <textarea 
            onChange={e => setTemplateContent(e.target.value)}
            className="w-100 flex-grow-1"
            value={templateContent}
            >
        </textarea>
    </div>
  )
}
