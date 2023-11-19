namespace Bureaucrat.Core.Blobs;

internal class BlobPathIndexResult
{
    public BlobPathIndex Index { get; set; } = new();
}

internal class BlobPathIndex
{
    public int Status { get; set; }
    public List<string> Path { get; set; } = new();
    public List<string> Files { get; set; } = new();
    public List<string> Folders { get; set; } = new();
}
