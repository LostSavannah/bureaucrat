export interface WorkerLog{
    id: string
    epoch: number
    kind: string
    title: string
    detail: string
}

export interface WorkerStep{
    name: string
    value: number
    max: number
}

export interface WorkerStatus{
    status: number
    interval: number
    logs: WorkerLog[]
    step: WorkerStep
    meta: {[key:string]: string}
}

export interface KindStatistics{
    kind: string,
    workers: string[],
    count: number
    active: number
    paused: number
    stopped: number
}

export interface WorkerSteps{
    current: string
    step: number
    steps: number
}