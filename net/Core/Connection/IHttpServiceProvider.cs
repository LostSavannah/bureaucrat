using Bureaucrat.Core.Common;

namespace Bureaucrat.Core.Connection;

public interface IHttpServiceProvider
{
    IHttpService GetHttpService(string baseUrl);
}
