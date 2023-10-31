import { useEffect, useState } from "react"

export interface UseTimerProps{
    onTick: () => void
    initialInterval: number
}

export default function useTimer({onTick, initialInterval}:UseTimerProps){
    const [intervalState, setIntervalState] = useState(initialInterval);
    
    useEffect(() => {
        const handler = setInterval(() => {
            onTick();
        }, intervalState);
        
        return () => {
            clearInterval(handler);
        };
    }, [intervalState]);

    return {
        setIntervalState
    }
}