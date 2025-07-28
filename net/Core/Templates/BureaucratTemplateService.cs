using Bureaucrat.Core.Common;

namespace Bureaucrat.Core.Templates;

public class BureaucratTemplateService(IHttpService httpService)
    :BureaucratService(httpService, "templates")
{
    public BureaucratTemplate GetTemplate(string name)
        => new BureaucratTemplate(this, name);

    public async Task<IEnumerable<BureaucratTemplate>> GetTemplates()
    {
        return (await HttpService.Get<GenericResult<List<string>>>($"/{EndpointName}/template"))
            .Result!.Select(name => new BureaucratTemplate(this, name));
    }

    public async Task<IEnumerable<BureaucratRender>> GetRenders()
    {
        return (await HttpService.Get<GenericResult<List<string>>>($"/{EndpointName}/render"))
            .Result!.Select(name => new BureaucratRender(name));
    }

    public async Task<IEnumerable<BureaucratParser>> GetParsers()
    {
        return (await HttpService.Get<GenericResult<List<string>>>($"/{EndpointName}/parser"))
            .Result!.Select(name => new BureaucratParser(name));
    }

    public async Task<string> GetTemplateContent(string name)
    {
        return (await HttpService.Get<GenericResult<string>>($"/{EndpointName}/{name}"))
            .Result!;
    }

    public async Task SetTemplateContent(string name, string content)
    {
        await HttpService.PostString($"/{EndpointName}/{name}", content);
    }

    public async Task DeleteTemplate(string name)
    {
        await HttpService.Delete<TemplateResult>($"/{EndpointName}/{name}");
    }

    public async Task<(string contentType, byte[] content)> ParseTemplate<TData>(string name, string render, string parser, TData data)
    {
        var request = new JsonRequest<TData>($"/{EndpointName}/{name}", data)
        {
            QueryParams = new Dictionary<string, string>()
            {
                [nameof(render)] = render,
                [nameof(parser)] = parser
            }
        };
        var response = await HttpService.SendAsync<TemplateRenderResult>(request, CancellationToken.None) 
            ?? throw new InvalidOperationException();
        
        return (response.ContentType, Convert.FromBase64String(response.Data));
    }
}

public record TemplateResult(string Template);

public record TemplateRenderResult(string ContentType, string Data);