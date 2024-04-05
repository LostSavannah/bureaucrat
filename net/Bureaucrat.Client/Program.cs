namespace Bureaucrat.Client;
public static class Program
{
    public static void Main(string[] args) => new CommandLine(args).MainEventsLoop();
}