﻿using Bureaucrat.Core.Common;
using System.Text.Json;

namespace Bureaucrat.Core.Queuing;

public class BureaucratQueueService(IHttpService httpService): BureaucratService(httpService, "queues")
{
    public async Task<IEnumerable<BureaucratQueue>> GetQueues()
    {
        return (await HttpService.Get<GenericResult<List<string>>>($"/{EndpointName}/")).Result!
            .Select(queueName => new BureaucratQueue(this, queueName));
    }

    public BureaucratQueue GetQueue(string queueName) => new(this, queueName);

    public async Task<T?> Dequeue<T>(string queueName)
    {
        return await HttpService.Get(
            $"/{EndpointName}/{queueName}", 
            data => data.Length > 0 ? JsonSerializer.Deserialize<T?>(data!) : default!);
    }

    public async Task<string> Enqueue<T>(string queueName, T value) => (await HttpService.Post<T, GenericResult<string>>($"/{EndpointName}/{queueName}", value)).Result!;

    public async Task DropQueue(string queueName) => await HttpService.Delete<GenericResult<string>>($"/{EndpointName}/{queueName}");
}
