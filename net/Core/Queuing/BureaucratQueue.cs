using Bureaucrat.Core.Common;

namespace Bureaucrat.Core.Queuing;

public class BureaucratQueue(BureaucratQueueService bureaucratQueueService, string name):
    BureaucratNamedServiceResource<BureaucratQueueService>(bureaucratQueueService, name),
    ITypeableQueue
{
    public async Task<T?> Dequeue<T>() => await Service.Dequeue<T>(Name);
    public async Task<BureaucratQueue> Enqueue<T>(T item)
    {
        await Service.Enqueue(Name, item);
        return this;
    }
    public async Task<BureaucratQueue> Drop()
    {
        await Service.DropQueue(Name);
        return this;
    }

    public BureaucratTypedQueue<T> Of<T>() => new(this);
}
