using Bureaucrat.Core.Common;
using Bureaucrat.Core.Connection;
using System.Text;

BureaucratServerConnection connection = new(
    "http://localhost:19760", 
    new CustomHttpServiceProvider(url => new HttpService(url))
    );

var database = (await connection.TableService.GetRows<Person>("main", "people")).ToList();

var columns = await connection.TableService.GetColumns("main", "people");

await connection.TableService.EnsureTable("main", "concepts", new List<Bureaucrat.Core.Tables.BureaucratColumnInfo>()
{
    new(){ColumnName = "Name"},
    new(){ColumnName = "Description"}
});

await connection.TableService.InsertRow("main", "people", new Person { 
    Name = "Mamerto", Age = 12
});

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

public class Person
{
    public string Name { get; set; } = string.Empty;
    public int Age { get; set; }
}