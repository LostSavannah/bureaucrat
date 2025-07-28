using System.Net;
using System.Net.Http.Json;
using System.Web;

namespace Bureaucrat.Core.Common;

public interface IHttpService
{
    Task<T> Get<T>(string url);
    Task<T> Get<T>(string url, Func<string, T> parser);
    Task<TResult> Post<T, TResult>(string url, T parameter);
    Task Post<T>(string url, T parameter);
    Task PostString(string url, string content);
    Task<T> PostString<T>(string url, string content);
    Task<T> Delete<T>(string url);
    Task<TResult> Put<TResult>(string url);
    Task<TResult?> SendAsync<TResult>(IRequest request, CancellationToken cancellationToken);
    Task SendAsync(IRequest request, CancellationToken cancellationToken);
    Task<TResult> SendAsync<TResult>(IRequest request, Func<HttpResponseMessage, TResult> parser, CancellationToken cancellationToken);
}

public enum RequestMethod
{
    Get = 1,
    Post = 2,
    Put = 3,
    Delete = 4,
    Head = 5,
    Options = 6
}

public interface IRequest
{
    public string Url { get; }
    public RequestMethod Method { get; }
    public Dictionary<string, List<string>> Headers { get; }
    public HttpContent Content { get; } 
}

public abstract class BaseRequest : IRequest
{
    protected BaseRequest(string templateUrl)
    {
        TemplateUrl = templateUrl;
    }

    public string TemplateUrl { get; set; }
    public Dictionary<string, string> QueryParams { get; set; } = new();
    public Dictionary<string, string> PathParams { get; set;  } = new();
    public Dictionary<string, List<string>> Headers { get; set;  } = new();
    public RequestMethod Method { get; set; } = RequestMethod.Get;
    public string Url
    {
        get
        {
            string url = TemplateUrl;
            PathParams.ToList().ForEach(p => {
                url = url.Replace($":{p.Key}", p.Value);
            });
            string query = QueryParams.Count > 0 ?
                "?" + string.Join("&", QueryParams.Select(q => $"{q.Key}={HttpUtility.UrlEncode(q.Value)}")) :
                string.Empty;
            return url + query;
        }
    }

    public abstract HttpContent Content { get; }
}

public abstract class Request<TBody>: BaseRequest
{
    protected Request(string templateUrl, TBody body) : base(templateUrl)
    {
        Body = body;
    }

    public TBody Body { get; set; }
}

public class Request : BaseRequest
{   
    public Request(string templateUrl, HttpContent content) : base(templateUrl) {

        WritableContent = content;
    }

    public override HttpContent Content { get => WritableContent; }
    public HttpContent WritableContent { get; set; }
}

public class JsonRequest<TBody> : Request<TBody>
{
    public JsonRequest(string templateUrl, TBody body) : base(templateUrl, body)
    {
        
    }

    public override HttpContent Content => JsonContent.Create(Body);
}

public class StringRequest : Request<string>
{
    public StringRequest(string templateUrl, string body) : base(templateUrl, body)
    {
        
    }

    public override HttpContent Content => new StringContent(Body);
}

public class EmptyRequest : Request<object?>
{
    public EmptyRequest(string templateUrl) : base(templateUrl, null)
    {

    }
    public override HttpContent Content => new EmptyContent();

    class EmptyContent : HttpContent
    {
        protected override Task SerializeToStreamAsync(Stream stream, TransportContext? context)
            => Task.CompletedTask;

        protected override bool TryComputeLength(out long length)
        {
            length = 0;
            return true;
        }
    }
}

public class FormUrlEncodedRequest : Request<Dictionary<string, string>>
{
    public FormUrlEncodedRequest(string templateUrl, Dictionary<string, string> body)
        : base(templateUrl, body)
    {
    }

    public override HttpContent Content
    {
        get => new FormUrlEncodedContent(Body);
    }
}

public class MultipartFormDataRequest : BaseRequest
{
    public MultipartFormDataRequest(string templateUrl) : base(templateUrl)
    {
        
    }

    public MultipartFormDataContent WritableContent { get; set; } = new();

    public override HttpContent Content { get => WritableContent; }
}

public interface ICustomBody
{
    public Task SerializeToStreamAsync(Stream stream, TransportContext? context);
    public (bool, long) TryComputeLength();
}

public class CustomRequest<T> : Request<T> where T : ICustomBody
{
    public CustomRequest(string templateUrl, T body)
        : base(templateUrl, body)
    {
        
    }

    public override HttpContent Content => new CustomContent(Body);

    class CustomContent(T Body) : HttpContent
    {
        protected override Task SerializeToStreamAsync(Stream stream, TransportContext? context)
            => Body.SerializeToStreamAsync(stream, context);

        protected override bool TryComputeLength(out long length)
        {
            (bool result, length) = Body.TryComputeLength();
            return result;
        }
    }
}

