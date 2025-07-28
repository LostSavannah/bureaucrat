using System.Net.Http.Json;

namespace Bureaucrat.Core.Common;

public class HttpService : IHttpService
{

    public HttpClient httpClient;
    public HttpService(string baseAddress)
    {
        httpClient = new HttpClient()
        {
            BaseAddress = new Uri(baseAddress)
        };
    }
    async Task<T> IHttpService.Delete<T>(string url)
    {
        using var response = await httpClient.DeleteAsync(url);
        return (await response.EnsureSuccessStatusCode().Content.ReadFromJsonAsync<T>())!;
    }

    async Task<T> IHttpService.Get<T>(string url)
    {
        using var response = await httpClient.GetAsync(url);
        return (await response.EnsureSuccessStatusCode().Content.ReadFromJsonAsync<T>())!;
    }

    async Task<T> IHttpService.Get<T>(string url, Func<string, T> parser)
    {
        using var response = await httpClient.GetAsync(url);
        string rawContent = await response.EnsureSuccessStatusCode().Content.ReadAsStringAsync();
        return parser(rawContent);
    }

    async Task<TResult> IHttpService.Post<T, TResult>(string url, T parameter)
    {
        using var response = await httpClient.PostAsJsonAsync(url, parameter);
        return (await response.EnsureSuccessStatusCode().Content.ReadFromJsonAsync<TResult>())!;
    }

    async Task IHttpService.Post<T>(string url, T parameter)
    {
        using var response = await httpClient.PostAsJsonAsync(url, parameter);
        response.EnsureSuccessStatusCode();
    }

    async Task IHttpService.PostString(string url, string content)
    {
        (await httpClient.PostAsync(url, new StringContent(content))).EnsureSuccessStatusCode();
    }

    async Task<T> IHttpService.PostString<T>(string url, string content)
    {
        var response = (await httpClient.PostAsync(url, new StringContent(content))).EnsureSuccessStatusCode();
        return (await response.Content.ReadFromJsonAsync<T>())!;
    }

    async Task<TResult> IHttpService.Put<TResult>(string url)
    {
        using var response = await httpClient.PutAsync(url, null);
        return (await response.EnsureSuccessStatusCode().Content.ReadFromJsonAsync<TResult>())!;
    }

    private async Task<HttpResponseMessage> SendInner(IRequest request, CancellationToken cancellationToken)
    {
        var message = new HttpRequestMessage
        {
            Method = Map(request.Method),
            Content = request.Content,
            RequestUri = new Uri(request.Url, UriKind.RelativeOrAbsolute)
        };

        request.Headers
            .ToList()
            .ForEach(header => message.Headers.Add(header.Key, header.Value));


        return await httpClient.SendAsync(message, cancellationToken);
    }

    public async Task<TResult?> SendAsync<TResult>(IRequest request, CancellationToken cancellationToken)
    {
        var response = await SendInner(request, cancellationToken);
        var result = await response.EnsureSuccessStatusCode().Content.ReadFromJsonAsync<TResult>();
        return result;
    }

    public async Task SendAsync(IRequest request, CancellationToken cancellationToken)
    {
        (await SendInner(request, cancellationToken)).EnsureSuccessStatusCode();
    }

    public async Task<TResult> SendAsync<TResult>(IRequest request, Func<HttpResponseMessage, TResult> parser, CancellationToken cancellationToken)
    {
        return parser((await SendInner(request, cancellationToken)).EnsureSuccessStatusCode());
    }

    private HttpMethod Map(RequestMethod method) => method switch
    {
        RequestMethod.Get => HttpMethod.Get,
        RequestMethod.Post => HttpMethod.Post,
        RequestMethod.Put => HttpMethod.Put,
        RequestMethod.Delete => HttpMethod.Delete,
        RequestMethod.Options => HttpMethod.Options,
        RequestMethod.Head => HttpMethod.Head,
        _ => throw new NotImplementedException()
    };
}

