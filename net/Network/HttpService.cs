using Bureaucrat.Core.Common;
using System.Net.Http.Json;

namespace Bureaucrat.Network;

public class HttpService : IHttpService
{

    public HttpClient httpClient;
    public HttpService(string baseAddress)
    {
        httpClient = new HttpClient() { 
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
}