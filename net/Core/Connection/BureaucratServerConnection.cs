using Bureaucrat.Core.Blobs;
using Bureaucrat.Core.Common;
using Bureaucrat.Core.Queuing;

namespace Bureaucrat.Core.Connection;

public class BureaucratServerConnection
{
    IHttpService HttpService { get; init; }

    BureaucratQueueService? queueService;
    BureaucratBlobService? blobService;
    public BureaucratQueueService QueueService => queueService ??= new(HttpService);
    public BureaucratBlobService BlobService => blobService ??= new(HttpService);
    public BureaucratServerConnection(string url, IHttpServiceProvider httpServiceProvider)
    {
        HttpService = httpServiceProvider.GetHttpService(url);
    }
}
