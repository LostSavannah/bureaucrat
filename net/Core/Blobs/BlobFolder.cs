namespace Bureaucrat.Core.Blobs;

public class BlobFolder(string rawPath, BureaucratBlobService service) : BlobIndexProxy(rawPath, service)
{
    public async IAsyncEnumerable<BlobFolder> Walk()
    {
        yield return this;
        foreach(var folder in await Folders)
        {
            await foreach(var innerFolder in folder.Walk())
            {
                yield return innerFolder;
            }
        }
    }

    public async Task<BlobFile> GetOrCreateFile(string name) => await Service.EnsureFile(string.Join("/", RawPath, name));
}
