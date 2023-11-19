namespace Bureaucrat.Core.Blobs;

public class BlobFile(string rawPath, BureaucratBlobService service) : BlobResource(rawPath, service)
{
    public async Task<byte[]> GetContent() => await Service.GetBlobContent(RawPath);
}
