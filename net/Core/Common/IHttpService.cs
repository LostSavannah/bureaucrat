﻿namespace Bureaucrat.Core.Common;

public interface IHttpService
{
    Task<T> Get<T>(string url);
    Task<T> Get<T>(string url, Func<string, T> parser);
    Task<TResult> Post<T, TResult>(string url, T parameter);
    Task Post<T>(string url, T parameter);
    Task PostString(string url, string content);
    Task<T> PostString<T>(string url, string content);
    Task<T> Delete<T>(string url);
}
