using Bureaucrat.Core.Connection;
using Bureaucrat.Core.Queuing;
using Bureaucrat.Network;
using System.Text;

BureaucratQueueService service = new(new HttpService("http://localhost:19760"));

BureaucratServerConnection connection = new(
    "http://localhost:19760", 
    new CustomHttpServiceProvider(url => new HttpService(url))
    );

var queue = connection.QueueService.GetQueue("test").Of<string>();

await queue.Enqueue("Value");

Console.WriteLine(await queue.Dequeue());

var folder = connection.BlobService.Root;

await foreach(var child in folder.Walk())
{
    Console.WriteLine(child.RawPath);
    foreach(var file in await child.Files)
    {
        Console.WriteLine(file.RawPath);
        string content = Encoding.UTF8.GetString(await file.GetContent());
        Console.WriteLine(content);
    }
}

Console.Read();