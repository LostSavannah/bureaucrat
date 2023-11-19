namespace Bureaucrat.Core.Blobs;

public class BlobResource(string rawPath, BureaucratBlobService service)
{
    protected BureaucratBlobService Service { get; init; } = service;
    public List<string> Path { get; init; } = new(rawPath.Split("/").Where(s => !string.IsNullOrEmpty(s) && s != "."));
    public string Name => Path.LastOrDefault() ?? ".";
    public string RawPath => string.Join("/", Path.ToArray());
}
