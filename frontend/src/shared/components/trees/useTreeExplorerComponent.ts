import { useEffect, useState } from "react";
import { BureaucratTreesService } from "../../services/BureaucratTreesService";
import { TreeIndex, TreeValue } from "../../types/TreeResult";

export interface UseTreeExplorerComponentProps{
    initialForest:string
    initialTree:string
}

export default function useTreeExplorerComponent({initialForest, initialTree}:UseTreeExplorerComponentProps){
    const [forests, setForests] = useState<string[]>([]);
    const [trees, setTrees] = useState<string[]>([]);
    const [currentForest, setCurrentForest] = useState<string>(initialForest);
    const [currentTree, setCurrentTree] = useState<string>(initialTree);
    const [currentPath, setCurrentPath] = useState<string[]>(["$"]);
    const [currentIndex, setCurrentIndex] = useState<TreeIndex[]>([]);
    const [currentItem, setCurrentItem] = useState<TreeValue>({});

    useEffect(() => {
        new BureaucratTreesService().getForests()
            .then(result => setForests(result.result));       
    }, []);

    useEffect(() => {
        new BureaucratTreesService().getTrees(currentForest)
            .then(result => setTrees(result.result)); 
    }, [currentForest]);
    
    useEffect(() => {
        setCurrentPath(["$"]);
    }, [currentForest, currentTree]);

    useEffect(() => {
        updateIndex();
        updateValue();
    }, [currentForest, currentTree, currentPath]);

    async function updateValue() {
        const service = new BureaucratTreesService();
        const result = await service.getValue(currentForest, currentTree, currentPath.join("/"));
        setCurrentItem(result.result);
        console.log(result);
    }

    async function updateIndex() {
        const service = new BureaucratTreesService();
        let localIndex:TreeIndex[] = [];
        for(let index = 1; index <= currentPath.length; index++){
            const path:string = currentPath.slice(0, index).join("/");
            const pathIndex = await service.getIndex(currentForest, currentTree, path);
            localIndex.push(pathIndex.result);
        }
        setCurrentIndex([...localIndex]);
    }

    return{
        forests,
        trees,
        currentForest,
        currentTree,
        currentPath,
        currentIndex,
        currentItem,
        setCurrentForest,
        setCurrentTree,
        setCurrentPath
    }
}