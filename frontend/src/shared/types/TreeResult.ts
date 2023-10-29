export interface TreeIndex{
    kind: "string" | "list" | "dictionary"
    value: string | string[]
    name: string
    path: string
}

export interface TreeValue{
    [index: string|number] : string | TreeValue | TreeValue[]
}