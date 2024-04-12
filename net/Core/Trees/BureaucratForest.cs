using Bureaucrat.Core.Common;

namespace Bureaucrat.Core.Trees;

public class BureaucratForest(BureaucratTreeService service, string name)
    :BureaucratNamedServiceResource<BureaucratTreeService>(service, name)
{
    public Task<IEnumerable<BureaucratTree>> Trees => Service.GetTrees(Name);

    public BureaucratTree GetTree(string treeName) => Service.GetTree(Name, treeName);
}
