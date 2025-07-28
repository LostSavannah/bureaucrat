using Bureaucrat.Core.Common;
using Bureaucrat.Core.Connection;

namespace Bureaucrat.TestClient;
public static class Program
{
    public static async Task Main(string[] args)
    {
        BureaucratServerConnection connection = new BureaucratServerConnection(
            "http://localhost:19971",
            new CustomHttpServiceProvider(url => new HttpService(url))
        );

        var template = connection.TemplateService.GetTemplate("mako/example");

        var result = await template.Parse(new("mako"), new("pdf - xhtml2pdf"), new
        {
            row = new List<List<string>>
            {
                new(){"Name", "Age", "City"},
                new(){"Name", "Age", "City"}
            }
        });
    }
}