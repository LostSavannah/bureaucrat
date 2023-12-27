using Bureaucrat.Core.Blobs;
using Bureaucrat.Core.Common;
using Bureaucrat.Core.Queuing;
using Bureaucrat.Core.Tables;

namespace Bureaucrat.Core.Connection;

public class BureaucratServerConnection
{
    IHttpService HttpService { get; init; }

    BureaucratQueueService? queueService;
    BureaucratBlobService? blobService;
    BureaucratTableService? tableService;
    public BureaucratQueueService QueueService => queueService ??= new(HttpService);
    public BureaucratBlobService BlobService => blobService ??= new(HttpService);
    public BureaucratTableService TableService => tableService ??= new(HttpService);
    public BureaucratServerConnection(string url, IHttpServiceProvider httpServiceProvider)
    {
        HttpService = httpServiceProvider.GetHttpService(url);
    }
}
