namespace Bureaucrat.Core.Common;

public class BureaucratService(IHttpService httpService, string endpointName)
{
    public readonly string ServiceId = Guid.NewGuid().ToString(); 
    public IHttpService HttpService { get; init; } = httpService;
    public string EndpointName { get; init; } = endpointName;
}
