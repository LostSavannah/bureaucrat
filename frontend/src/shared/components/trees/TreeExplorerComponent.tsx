import {useParams} from 'react-router'
import useTreeExplorerComponent from './useTreeExplorerComponent';
import TreeIndexView from './TreeIndexView';

export default function TreeExplorerComponent() {
    const {forest, tree} = useParams();
    const {
        currentForest,
        currentTree,
        currentIndex,
        setCurrentPath
    } = useTreeExplorerComponent({initialForest: forest!, initialTree: tree!});

    function onNavigate(path:string){
        setCurrentPath(path.split('/'))
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
                            index={currentIndex}
                            onNavigate={onNavigate} 
                        ></TreeIndexView>
                    </div>
                </div>
            </div>
        </>
    )
}
