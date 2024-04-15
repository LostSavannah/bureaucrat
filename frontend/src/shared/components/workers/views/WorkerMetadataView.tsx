import Table from "../../table/Table";

export default function WorkerMetadataView({meta}:{meta:{[key:string]: string}}) {
    const metaItems = Object.keys(meta).map(k => ({
        key: k,
        value: meta[k]
    }));
  return <div className="w-100 p-2">
  <Table 
      getId={l => l.key}
      items={metaItems}
      columns={[
          {
                name: "Key",
                displayName: "",
                renderer: l => <div>
                    <span className="fw-bold">{l.key} : </span>
                    <span>{l.value}</span>
                </div>
          }
      ]}
  ></Table>
</div>
  
}
