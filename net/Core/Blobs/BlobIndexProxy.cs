namespace Bureaucrat.Core.Blobs;

public class BlobIndexProxy(string rawPath, BureaucratBlobService service):BlobResource(rawPath, service)
{
    public async Task<IEnumerable<BlobFolder>> GetFolders() =>
        (await Service.GetIndex(RawPath)).Result!.Index.Folders.Select(folder => new BlobFolder(string.Join("/", RawPath, folder), Service));
    public async Task<IEnumerable<BlobFile>> GetFiles() =>
        (await Service.GetIndex(RawPath)).Result!.Index.Files.Select(folder => new BlobFile(string.Join("/", RawPath, folder), Service));

    public Task<IEnumerable<BlobFolder>> Folders => GetFolders();
    public Task<IEnumerable<BlobFile>> Files => GetFiles();
}
