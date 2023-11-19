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
    var file1 = await child.GetOrCreateFile("ejemplo.txt");
    string contento = await file1.GetContent(Encoding.UTF8);
    await file1.SetContent($"{contento}+Contenido");
    await file1.Delete();

    foreach(var file in await child.Files)
    {
        Console.WriteLine(file.RawPath);
        string content = Encoding.UTF8.GetString(await file.GetContent());
        await file.SetContent("Americo");
        Console.WriteLine(content);
    }
}

Console.Read();