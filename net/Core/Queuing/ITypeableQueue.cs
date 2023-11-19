namespace Bureaucrat.Core.Queuing;

public interface ITypeableQueue
{
    public BureaucratTypedQueue<T> Of<T>();
}
