namespace Bureaucrat.Client;

[AttributeUsage(
        AttributeTargets.Method | AttributeTargets.Parameter
    )]
internal class CommandAttribute(string commandName, string? commandHelp = null) : Attribute
{
    public string CommandName { get; } = commandName;
    public string? CommandHelp { get; } = commandHelp;
}
