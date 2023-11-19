using System.Text;

namespace Bureaucrat.Core.Blobs;

public class BlobFile(string rawPath, BureaucratBlobService service) : BlobResource(rawPath, service)
{
    public async Task<byte[]> GetContent() => await Service.GetBlobContent(RawPath);
    public async Task<string> GetContent(Encoding encoding) => await Service.GetBlobContent(RawPath, encoding);
    public async Task<BlobFile> SetContent(string content, Encoding? encoding = null){
        await Service.WriteBlob(RawPath, content, encoding);
        return this;
    }
    public async Task<BlobFile> SetContent(byte[] content)
    {
        await Service.WriteBlob(RawPath, content);
        return this;
    }
    public async Task Delete() => await Service.DeleteBlob(RawPath);
}
