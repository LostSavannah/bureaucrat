using Bureaucrat.Core.Common;
using System.IO;

namespace Bureaucrat.Core.Blobs;

public class BureaucratBlobService(IHttpService httpService) : BureaucratBaseService(httpService, "blobs")
{
    public async Task<byte[]> GetBlobContent(string path)
    {
        return await HttpService.Get($"/{EndpointName}/raw:{path}", Convert.FromBase64String);
    }

    BlobFolder? root = null;
    public BlobFolder Root => root ??= new BlobFolder(".", this); 
    public BlobFolder GetFolder(string path) => new (path, this);
    internal async Task<GenericResult<BlobPathIndexResult>> GetIndex(string path)
    {
        return await HttpService.Get<GenericResult<BlobPathIndexResult>>($"/{EndpointName}/{path}");
    }
}
