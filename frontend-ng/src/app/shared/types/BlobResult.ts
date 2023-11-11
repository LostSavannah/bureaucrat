export interface BlobResultIndex{
    status:number;
    path:string[],
    files:string[],
    folders:string[]
}

export interface BlobResult{
    content:string|null
    index:BlobResultIndex
}
