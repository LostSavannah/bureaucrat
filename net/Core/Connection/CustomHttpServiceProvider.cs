using Bureaucrat.Core.Common;

namespace Bureaucrat.Core.Connection;

public class CustomHttpServiceProvider : IHttpServiceProvider
{
    public CustomHttpServiceProvider(Func<string, IHttpService> provider)
    {
        Provider = provider;
    }

    Func<string, IHttpService> Provider { get; }

    IHttpService IHttpServiceProvider.GetHttpService(string baseUrl) => Provider(baseUrl);
}
