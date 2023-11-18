using Bureaucrat.Core.Connection;
using Bureaucrat.Core.Queuing;
using Bureaucrat.Network;

BureaucratQueueService service = new(new HttpService("http://localhost:19760"));

BureaucratServerConnection bureaucratServerConnection = new(
    "http://localhost:19760", 
    new CustomHttpServiceProvider(url => new HttpService(url))
    );

var queue = bureaucratServerConnection.QueueService.GetQueue("test").As<string>();

await queue.Enqueue("Value");

Console.WriteLine(await queue.Dequeue());
Console.Read();