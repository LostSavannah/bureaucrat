﻿namespace Bureaucrat.Core.Common;

public class BureaucratNamedServiceResource<SERVICE>(SERVICE service, string name) :
    BureaucratServiceResource<SERVICE>(service) where SERVICE: BureaucratService
{ 
    public string Name => name;
}
