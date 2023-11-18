using Bureaucrat.Core.Common;
using System.Text.Json;

namespace Bureaucrat.Core.Queuing;

public class BureaucratQueueService(IHttpService httpService)
{
    public IHttpService HttpService { get; init; } = httpService;
    public async Task<IEnumerable<BureaucratQueue>> GetQueues()
    {
        return (await HttpService.Get<GenericResult<List<string>>>("/queues/")).Result!
            .Select(queueName => new BureaucratQueue(this, queueName));
    }

    public BureaucratQueue GetQueue(string queueName) => new(this, queueName);

    public async Task<T?> Dequeue<T>(string queueName)
    {
        string result = await HttpService.Get<string>($"/queues/{queueName}");
        return string.IsNullOrEmpty(result) ? default : JsonSerializer.Deserialize<T>(result);
    }

    public async Task<string> Enqueue<T>(string queueName, T value) => (await HttpService.Post<T, GenericResult<string>>($"/queues/{queueName}", value)).Result!;

    public async Task DropQueue(string queueName) => await HttpService.Delete<GenericResult<string>>($"/queues/{queueName}");
}
