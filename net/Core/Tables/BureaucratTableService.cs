using Bureaucrat.Core.Common;
using System.Reflection;
using System.Text.Json;

namespace Bureaucrat.Core.Tables;

public class BureaucratTableService(IHttpService httpService) : BureaucratService(httpService, "tables")
{
    public async Task<IEnumerable<BureaucratDatabase>> GetDatabases() =>
        (await GetDatabasesNames())
        .Select(database => new BureaucratDatabase(this, database));

    public async Task<IEnumerable<string>> GetDatabasesNames() =>
       (await HttpService.Get<GenericResult<List<string>>>($"{EndpointName}/")).Result!;

    public async Task<IEnumerable<BureaucratTable>> GetTables(string databaseName) =>
        (await GetTablesNames(databaseName))
        .Select(table => new BureaucratTable(this, table, databaseName));

    public async Task<IEnumerable<string>> GetTablesNames(string databaseName) =>
       (await HttpService.Get<GenericResult<List<string>>>($"{EndpointName}/{databaseName}/")).Result!;

    public async Task<BureaucratTable> EnsureTable(string databaseName, string tableName, List<BureaucratColumnInfo> columns)
    {
        string columnsQuery = string.Join(",", columns.Select(c => c.ToString()));
        string query = $"CREATE TABLE {tableName}({columnsQuery});";
        await HttpService.PostString($"{EndpointName}/{databaseName}", query);
        return new BureaucratTable(this, tableName, databaseName);
    }

    public BureaucratTable GetTableByName(string databaseName, string tableName)
        => new BureaucratTable(this, tableName, databaseName);

    public BureaucratDatabase GetDatabaseByName(string databaseName)
        => new BureaucratDatabase(this, databaseName);

    public async Task<IEnumerable<BureaucratColumnInfo>> GetColumns(
        string databaseName,
        string tableName)
        => await ExecuteQuery<BureaucratColumnInfo>(databaseName, $"PRAGMA table_info({tableName})");

    public async Task<IEnumerable<T>> GetRows<T>(
        string databaseName, 
        string tableName,
        int pageNumber = 0,
        int pageSize = 10)
    {
        string url = $"{EndpointName}/{databaseName}/{tableName}?page_number={pageNumber}&page_size={pageSize}";
        var result = await HttpService.Get<GenericResult<List<T>>>(url);
        return result.Result!;
    }

    public async Task<IEnumerable<T>> ExecuteQuery<T>(
            string databaseName,
            string query
        )
    {
        var result = await HttpService.PostString<GenericResult<List<T>>>($"{EndpointName}/{databaseName}", query);
        return result.Result!;
    }
    public async Task ExecuteQuery(
            string databaseName,
            string query
        )
    {
        await HttpService.PostString($"{EndpointName}/{databaseName}", query);
    }



    public async Task InsertRow<T>(
        string databaseName,
        string tableName,
        T item
        )
    {
        List<PropertyInfo> properties = typeof(T)
            .GetProperties()
            .Where(p => p.CanRead)
            .ToList();

        Dictionary<BureaucratColumnInfo, PropertyInfo> propertiesMap =
            (await GetColumns(databaseName, tableName))
            .Where(c => properties.Any(p => p.Name.ToLower() == c.ColumnName.ToLower()))
            .ToDictionary(c => c, c => properties.First(p => p.Name.ToLower() == c.ColumnName.ToLower()));

        Dictionary<string, string> parameters = propertiesMap
            .ToDictionary(kv => kv.Key.ColumnName, kv => 
                SwapQuotes(JsonSerializer
                    .Serialize(kv.Value.GetValue(item)))
                );

        string columns = string.Join(",", parameters.Keys);
        string values = string.Join(",", parameters.Values);
        string query = $"INSERT INTO {tableName}({columns}) VALUES ({values});";
        await ExecuteQuery(databaseName, query);
    }
    string SwapQuotes(string source)
    {
        return source.Replace("'", ServiceId).Replace("\"", "'").Replace(ServiceId, "\"");
    }
}
