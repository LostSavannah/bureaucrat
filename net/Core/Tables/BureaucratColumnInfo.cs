using System.Text.Json.Serialization;

namespace Bureaucrat.Core.Tables;

public class BureaucratColumnInfo
{
    [JsonPropertyName("cid")]
    public int ColumnId { get; set; }
    [JsonPropertyName("name")]
    public string ColumnName { get; set; } = string.Empty;
    [JsonPropertyName("type")]
    public string ColumnType { get; set; } = "TEXT";
    [JsonPropertyName("notnull")]
    public int IsNotNull { get; set; }
    [JsonPropertyName("pk")]
    public int IsPrimaryKey { get; set; }
    [JsonPropertyName("dflt_value")]
    public object? DefaultValue { get; set; }

    public override string ToString() => string.Format(
            "{0} {1}{2}{3}{4}",
            ColumnName,
            ColumnType,
            IsNotNull == 1? " NOT NULL" : "",
            DefaultValue != null? $" DEFAULT = '{DefaultValue}'" : "",
            IsPrimaryKey == 1? " PRIMARY KEY" : ""
        );

}
