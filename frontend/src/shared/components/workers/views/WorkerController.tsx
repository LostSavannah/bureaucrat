import { Dict } from "../../../types/Common"

export interface WorkerControllerProps{
    status: number,
    sendCommand: (name:string, value:Dict) => void,
    terminate: () => void
}

export default function WorkerController({status, sendCommand, terminate}:WorkerControllerProps) {
    function sendStartCommand(){
        sendCommand("start", {})
    }
    function sendResumeCommand(){
        sendCommand("resume", {})
    }
    function sendPauseCommand(){
        sendCommand("pause", {})
    }
  return (
    <div className="w-100 p-2">
        {status == 1 && <button className="m-1 btn btn-success" onClick={sendStartCommand}>Start</button>}
        {status == 3 && <button className="m-1 btn btn-success" onClick={sendResumeCommand}>Resume</button>}
        {status == 4 && <button className="m-1 btn btn-warning" onClick={sendPauseCommand}>Pause</button>}
        {[3, 4].includes(status) && <button className="m-1 btn btn-danger" onClick={terminate}>Recycle</button>}
    </div>
  )
}
