export interface TreeIndex{
    kind: "string" | "list" | "dictionary"
    value: string | string[]
    name: string
    path: string
}

export interface Dict{
    [key: string|number] : TreeValue
}

export type TreeValue = string | Dict | Dict[]