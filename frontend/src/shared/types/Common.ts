

type Value = null|undefined|string|number|boolean|Value[]|{[key:string]:Value}
export type Dict = {[key:string]:Value}