namespace Bureaucrat.Core.Queuing;

public class BureaucratTypedQueue<T>(BureaucratQueue queue)
{
    BureaucratQueue Queue { get; init; } = queue;
    public string Name => Queue.Name;
    public async Task<T?> Dequeue() => await Queue.Dequeue<T>();
    public async Task<BureaucratTypedQueue<T>> Enqueue(T item)
    {
        await Queue.Enqueue(item);
        return this;
    }
    public async Task<BureaucratTypedQueue<T>> Drop()
    {
        await Queue.Drop();
        return this;
    }

    public BureaucratTypedQueue<U> As<U>() => new BureaucratTypedQueue<U>(Queue);
}
