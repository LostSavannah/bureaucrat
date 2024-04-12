using Bureaucrat.Core.Common;

namespace Bureaucrat.Core.Trees;

public class BureaucratTreeNode(BureaucratTreeService service, string forest, string tree, string name)
    :BureaucratNamedServiceResource<BureaucratTreeService>(service, name)
{
    public BureaucratForest Forest => new(Service, forest);
    public BureaucratTree Tree => new BureaucratTree(Service, forest, tree);
    public BureaucratTreeNode this[int index]
        => new(Service, forest, tree, $"{Name}/{index}");
    public BureaucratTreeNode this[string index]
        => new(Service, forest, tree, $"{Name}/{index}");

    public Task<T> Get<T>() => Service.Get<T>(forest, tree, Name);
    public Task Set<T>(T value) => Service.Set<T>(forest, tree, Name, value);

    public Task Remove() => Service.Remove(forest, tree, Name);
    public Task<bool> Exists() => Service.Exists(forest, tree, Name);
    public BureaucratGenericTreeNode<T> As<T>() => new(Service, forest, tree, Name);
}
