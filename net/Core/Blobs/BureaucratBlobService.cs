using Bureaucrat.Core.Common;
using System.Text;

namespace Bureaucrat.Core.Blobs;

public class BureaucratBlobService(IHttpService httpService) : BureaucratBaseService(httpService, "blobs")
{
    public Encoding DefaultEncoding { get; set; } = Encoding.UTF8;
    public async Task<byte[]> GetBlobContent(string path) =>
        await HttpService.Get($"/{EndpointName}/raw:{path}", Convert.FromBase64String);

    public async Task<string> GetBlobContent(string path, Encoding? encoding = null) =>
        (encoding ?? DefaultEncoding).GetString(await GetBlobContent(path));

    public async Task WriteBlob(string path, byte[] content) =>
        await HttpService.PostString($"/{EndpointName}/{path}", Convert.ToBase64String(content));

    public async Task WriteBlob(string path, string content, Encoding? encoding = null) => 
        await WriteBlob(path, (encoding ?? DefaultEncoding).GetBytes(content));

    public async Task<bool> Exists(string path)
    {
        try
        {
            await GetIndex(path);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public async Task<BlobFile> EnsureFile(string path)
    {
        if(!await Exists(path))
        {
            await WriteBlob(path, Array.Empty<byte>());
        }
        return new BlobFile(path, this);
    }

    public async Task DeleteBlob(string path)
    {
        await HttpService.Delete<GenericResult<string>>($"/{EndpointName}/{path}");
    }

    BlobFolder? root = null;
    public BlobFolder Root => root ??= new BlobFolder(".", this); 
    public BlobFolder GetFolder(string path) => new (path, this);
    internal async Task<GenericResult<BlobPathIndexResult>> GetIndex(string path)
    {
        return await HttpService.Get<GenericResult<BlobPathIndexResult>>($"/{EndpointName}/{path}");
    }
}
