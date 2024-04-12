using Bureaucrat.Core.Common;

namespace Bureaucrat.Core.Trees;

public class BureaucratTreeService(IHttpService httpService)
    :BureaucratService(httpService, "trees")
{
    public async Task<IEnumerable<BureaucratForest>> GetForests()
    {
        return (await HttpService.Get<GenericResult<List<string>>>($"/{EndpointName}/"))
            .Result!.Select(name => new BureaucratForest(this, name));
    }

    public BureaucratForest GetForest(string forest) => new(this, forest);

    public async Task<IEnumerable<BureaucratTree>> GetTrees(string forest)
    {
        return (await HttpService.Get<GenericResult<List<string>>>($"/{EndpointName}/{forest}"))
            .Result!.Select(name => new BureaucratTree(this, forest, name));
    }

    public BureaucratTree GetTree(string forest, string name) => new(this, forest, name);

    public async Task<T> Get<T>(string forest, string tree, string node)
    {
        return (await HttpService.Get<GenericResult<T>>($"/{EndpointName}/{forest}/{tree}/{node}"))
            .Result!;
    }
    public async Task<string> GetRaw(string forest, string tree, string node)
    {
        return (await HttpService.Get<GenericResult<string>>($"/{EndpointName}/{forest}/{tree}/{node}"))
            .Result!;
    }

    public async Task Set<T>(string forest, string tree, string node, T value)
    {
        await HttpService.Post($"/{EndpointName}/{forest}/{tree}/{node}", value);
    }

    public async Task Remove(string forest, string tree, string node)
    {
        await HttpService.Delete<GenericResult<string>>($"/{EndpointName}/{forest}/{tree}/{node}");
    }

    public async Task<bool> Exists(string forest, string tree, string node)
    {
        try
        {
            await GetRaw(forest, tree, node);
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }
}
