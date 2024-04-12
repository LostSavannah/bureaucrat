using Bureaucrat.Core.Common;
using Bureaucrat.Core.Connection;
using System.Text.RegularExpressions;
using System.Reflection;

namespace Bureaucrat.Client;

internal class CommandLine
{
    BureaucratServerConnection Connection;
    Regex token;
    public CommandLine(string[] args)
    {
        var initialArguments = GetInitialArguments(args);
        Connection = new(
            initialArguments["connection"], 
            new CustomHttpServiceProvider(url => new HttpService(url))
        );
        token = new($"(\"[^\"]+?\")|([^\\s]+)");
    }

    public Dictionary<string, string> GetInitialArguments(string[] args)
    {
        return new Dictionary<string, string>() {
            ["connection"] = args.Length > 0 ? args[0] : "http://localhost:19970"
        };
    }

    public void MainEventsLoop()
    {
        List<string> tokens = new();
        while (true)
        {
            tokens.AddRange(token.Split(Console.ReadLine() ?? string.Empty));
            if (tokens.Count == 0) continue;
            if (tokens[0] == "exit") break;
            CallMethod(tokens[0], tokens[1..^0].ToArray());
        }
    }

    void CallMethod(string method, string[] arguments)
    {
        var methodInfo = this.GetType()
            .GetMethods()
            .FirstOrDefault(m => m.GetCustomAttribute<CommandAttribute>()?.CommandName == method);
        methodInfo?.Invoke(this, arguments);
    }

    [Command("help")]
    public static void Help(
        string? command = null    
    )
    {
        Console.WriteLine("this is the help");
    }

    [Command("tables")]
    public static void Tables()
    {

    }
}
