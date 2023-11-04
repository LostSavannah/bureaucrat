import {useParams} from 'react-router'
import useTreeExplorerComponent from './useTreeExplorerComponent';
import TreeIndexView from './TreeIndexView';
import TreeValueView from './TreeValueView';
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
        setValue
    } = useTreeExplorerComponent({initialForest: forest!, initialTree: tree!});

    function onNavigate(path:string){
        setCurrentPath(path.split('/'))
    }

    function onSetValue(value:TreeValue, path:string[]){
        console.log(value);
        //console.log(path);
        setValue(value, path)
    }

    return (
        <>
            <h2>Forest: {currentForest}</h2>
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
                    <TreeValueView value={currentItem}></TreeValueView>
                </div>
                <div className="row">
                    <TreeValueEditor
                        value={currentItem}
                        path={[...currentPath]}
                        setValue={onSetValue}
                    ></TreeValueEditor>
                </div>
            </div>
        </>
    )
}
