
using Bureaucrat.Core.Common;
using Bureaucrat.Core.Templates;

public class BureaucratTemplate(BureaucratTemplateService service, string name)
    :BureaucratNamedServiceResource<BureaucratTemplateService>(service, name)
{
    public async Task<string> GetContent() 
        => await Service.GetTemplateContent(Name);

    public async Task SetContent(string content) 
        => await Service.SetTemplateContent(Name, content);

    public async Task Delete()
        => await Service.DeleteTemplate(Name);

    public async Task<(string contentType, byte[] content)> Parse<TData>(BureaucratRender render, BureaucratParser parser, TData data)
        => await Service.ParseTemplate(Name, render.Name, parser.Name, data);
}

public record BureaucratRender(string Name);
public record BureaucratParser(string Name);