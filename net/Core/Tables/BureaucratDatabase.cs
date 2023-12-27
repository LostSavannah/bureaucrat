using Bureaucrat.Core.Common;

namespace Bureaucrat.Core.Tables;

public class BureaucratDatabase(BureaucratTableService bureaucratTableService, string name)
    : BureaucratNamedServiceResource<BureaucratTableService>(bureaucratTableService, name)
{
    public Task<IEnumerable<BureaucratTable>> Tables => Service.GetTables(Name);
    public BureaucratTable GetTable(string name) => Service.GetTableByName(Name, name);
    public async Task<IEnumerable<T>> ExecuteQuery<T>(string query) => await Service.ExecuteQuery<T>(Name, query);
    public async Task ExecuteQuery(string query) => await Service.ExecuteQuery(Name, query);
}