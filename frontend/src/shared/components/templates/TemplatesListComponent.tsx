import { DirectoryViewer, CreateDirectory } from "../common/DirectoryViewer";
import TemplateEditComponent from "./TemplateEditComponent";
import { useTemplatesListComponent } from "./useTemplatesListComponent"

export default function TemplatesListComponent() {
    const {
        currentTemplate, 
        templates, 
        setCurrentTemplate,
        newTemplateName,
        setNewTemplateName,
        saveNewTemplate,
        remove
    } = useTemplatesListComponent();
  return (
    <div className="row h-100">
        <div className="col-6 h-100">
            <div className="d-flex flex-column">
            <h4>Templates</h4>
                <div className="w-100 d-flex">
                    <input 
                        placeholder="Insert a new path and press [+] to create a new template"
                        className="flex-grow-1" 
                        onChange={e => setNewTemplateName(e.target.value)}
                        value={newTemplateName}
                        />
                    <button
                        onClick={saveNewTemplate} 
                        className="btn btn-success">+</button>
                </div>
                <div className="flex-grow-1">
                <DirectoryViewer 
                isOpen={true}
                current={currentTemplate}
                folder={CreateDirectory(templates)}
                events={{
                    onDelete: remove,
                    onSelect: setCurrentTemplate
                }}
                />
                </div>
            </div>
        </div>
        <div className="col-6 h-100">
            {currentTemplate && <TemplateEditComponent template={currentTemplate}/>}
        </div>
    </div>
  )
}
