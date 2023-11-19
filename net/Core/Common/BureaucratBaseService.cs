using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bureaucrat.Core.Common;

public class BureaucratBaseService(IHttpService httpService, string endpointName)
{
    public IHttpService HttpService { get; init; } = httpService;
    public string EndpointName { get; init; } = endpointName;
}
