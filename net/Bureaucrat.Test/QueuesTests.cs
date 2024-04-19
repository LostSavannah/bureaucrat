using Bureaucrat.Core.Common;
using Bureaucrat.Core.Connection;
using System.Collections;

namespace Bureaucrat.Test;

[TestFixture]
internal class QueuesTests
{
    private BureaucratServerConnection connection = new BureaucratServerConnection(
            "http://localhost:19971",
            new CustomHttpServiceProvider(
                url => new HttpService(url)
                )
    );

    [Test]
    public void When_Retrieving_Queues_Throws_Nothing()
    {
        Assert.That(
            async () => (await connection.QueueService.GetQueues()).ToList(), 
            Throws.Nothing
            );
    }

    [Test]
    public async Task When_Dequeue_From_Empty_Queue_Throws_Nothing()
    {
        string queueName = Guid.NewGuid().ToString();
        Assert.That(
            await connection.QueueService.Dequeue<string>(queueName), 
            Is.Null
            );
    }

    [Test]
    public async Task When_Enqueued_Multiple_Queues_Values_Gets_In_The_Correct_Queue()
    {
        Random random = new Random();
        Dictionary<string, Queue<string>> items = Enumerable
            .Range(0, 10)
            .ToDictionary(
                _ => Guid.NewGuid().ToString(), 
                _ => new Queue<string>()
        );

        for(int n = 0; n < 1000; n++)
        {
            string value = Guid.NewGuid().ToString();
            string queue = items.Keys.ElementAt(n % items.Count);
            items[queue].Enqueue(value);
            await connection.QueueService.Enqueue(queue, value);
        }

        while(items.Count > 0)
        {
            string queue = items.Keys.ElementAt(random.Next(items.Count));
            string expectedValue = items[queue].Dequeue();
            if (items[queue].Count == 0)
            {
                items.Remove(queue);
            }
            string value = (await connection.QueueService.Dequeue<string>(queue))!;
            Assert.That(value, Is.EqualTo(expectedValue));
        }
    }
}
