namespace Bureaucrat.Core.Trees;

public class BureaucratGenericTreeNode<T>(BureaucratTreeService service, string forest, string tree, string name)
    : BureaucratTreeNode(service, forest, tree, name)
{
    public T Value
    {
        get => Get<T>().Result;
        set => Set(value).Wait();
    }
}
