import {useParams} from 'react-router'
import useTreeExplorerComponent from './useTreeExplorerComponent';
import TreeIndexView from './TreeIndexView';
import { TreeValueEditor } from './editor/TreeValueEditor';
import { TreeValue } from '../../types/TreeResult';

export default function TreeExplorerComponent() {
    const {forest, tree} = useParams();
    const {
        currentForest,
        currentTree,
        currentIndex,
        currentPath,
        setCurrentPath,
        currentItem,
        setValue,
        removeValue
    } = useTreeExplorerComponent({initialForest: forest!, initialTree: tree!});

    function onNavigate(path:string){
        setCurrentPath(path.split('/'))
    }

    function onSetValue(value:TreeValue, path:string[]){
        //console.log(path);
        setValue(value, path)
    }

    return (
        <>
            <h4>Forest: {currentForest}</h4>
            <div className="container">
                <div className="row">
                    <h5>Tree: {currentTree}</h5>
                </div>
                <div className="row">
                    <div className="d-flex">
                        <TreeIndexView
                            currentPath={currentPath}
                            index={currentIndex}
                            onNavigate={onNavigate} 
                        ></TreeIndexView>
                    </div>
                </div>
                <div className="row">
                    <h5>Nodes of {currentPath.join("/")}</h5>
                    <TreeValueEditor
                        value={currentItem}
                        path={[...currentPath]}
                        setValue={onSetValue}
                        removeValue={removeValue}
                    ></TreeValueEditor>
                </div>
            </div>
        </>
    )
}
