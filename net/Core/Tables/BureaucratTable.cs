using Bureaucrat.Core.Common;

namespace Bureaucrat.Core.Tables;

public class BureaucratTable(BureaucratTableService bureaucratTableService, string name, string databaseName)
    : BureaucratNamedServiceResource<BureaucratTableService>(bureaucratTableService, name)
{
    BureaucratDatabase? database;
    public BureaucratDatabase Database => database ??= new(Service, databaseName);

    int chunkSize = 10;
    public int ChunkSize { get => chunkSize; set => chunkSize = Math.Max(1, value); }

    public async IAsyncEnumerable<T> Rows<T>()
    {
        List<T> chunk = new();
        int currentPage = 0;
        do
        {
            chunkSize = ChunkSize;
            chunk = (await Service.GetRows<T>(databaseName, Name, currentPage++, chunkSize)).ToList();
            foreach (T item in chunk)
            {
                yield return item;
            }
        } while (chunk.Count == chunkSize);
    }
    public Task<IEnumerable<BureaucratColumnInfo>> Columns => Service.GetColumns(databaseName, Name);

    public async Task Insert<T>(T item)
    {
        await Service.InsertRow(databaseName, Name, item);
    }

    public async Task Insert<T>(IEnumerable<T> items)
    {
        foreach(T item in items){
            await Service.InsertRow(databaseName, Name, item);
        }
    }
}