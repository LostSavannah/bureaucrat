using Bureaucrat.Core.Blobs;
using Bureaucrat.Core.Common;
using Bureaucrat.Core.Queuing;
using Bureaucrat.Core.Tables;
using Bureaucrat.Core.Templates;
using Bureaucrat.Core.Trees;

namespace Bureaucrat.Core.Connection;

public class BureaucratServerConnection
{
    IHttpService HttpService { get; init; }

    BureaucratQueueService? queueService;
    BureaucratBlobService? blobService;
    BureaucratTableService? tableService;
    BureaucratTreeService? treeService;
    BureaucratTemplateService? templateService;

    public BureaucratQueueService QueueService => queueService ??= new(HttpService);
    public BureaucratBlobService BlobService => blobService ??= new(HttpService);
    public BureaucratTableService TableService => tableService ??= new(HttpService);
    public BureaucratTreeService TreeService => treeService ??= new(HttpService);
    public BureaucratTemplateService TemplateService => templateService ??= new(HttpService);

    public BureaucratServerConnection(string url, IHttpServiceProvider httpServiceProvider)
    {
        HttpService = httpServiceProvider.GetHttpService(url);
    }
}
