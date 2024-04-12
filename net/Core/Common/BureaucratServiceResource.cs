namespace Bureaucrat.Core.Common;

public class BureaucratServiceResource<SERVICE>(SERVICE service) where SERVICE : BureaucratService
{
    protected SERVICE Service => service;
}
