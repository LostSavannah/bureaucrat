using Bureaucrat.Core.Common;

namespace Bureaucrat.Core.Trees;

public class BureaucratTree(BureaucratTreeService service, string forestName, string name)
    :BureaucratNamedServiceResource<BureaucratTreeService>(service, name)
{
    public BureaucratForest Forest => new BureaucratForest(Service, forestName);

    public BureaucratTreeNode Root => new(Service, forestName, Name, "$");
}
