using Bureaucrat.Core.Common;
using Bureaucrat.Core.Queuing;

namespace Bureaucrat.Core.Connection;

public class BureaucratServerConnection
{
    IHttpService HttpService { get; init; }

    BureaucratQueueService? queueService;
    public BureaucratQueueService QueueService => queueService ??= new(HttpService);

    public BureaucratServerConnection(string url, IHttpServiceProvider httpServiceProvider)
    {
        HttpService = httpServiceProvider.GetHttpService(url);
    }
}
