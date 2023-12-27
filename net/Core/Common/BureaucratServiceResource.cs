namespace Bureaucrat.Core.Common;

public class BureaucratServiceResource<SERVICE>(SERVICE service) where SERVICE : BureaucratBaseService
{
    protected SERVICE Service => service;
}
