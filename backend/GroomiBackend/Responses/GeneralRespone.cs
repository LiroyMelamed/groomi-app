using System.Runtime.Serialization;

namespace GroomiBackend.Models
{
    [DataContract]
    public class GeneralResponse
    {
        [DataMember]
        public bool Success { get; set; }

        [DataMember]
        public string Response { get; set; }

        [DataMember]
        public string RequestLink { get; set; }

        [DataMember]
        public object? Data { get; set; } 

        public GeneralResponse() { }

        public GeneralResponse(bool success, string response, string requestLink)
        {
            Success = success;
            Response = response;
            RequestLink = requestLink;
        }

        public GeneralResponse(bool success, string response, string requestLink, object? data)
        {
            Success = success;
            Response = response;
            RequestLink = requestLink;
            Data = data;
        }

        public GeneralResponse(GeneralResponse other)
        {
            Success = other.Success;
            Response = other.Response;
            RequestLink = other.RequestLink;
            Data = other.Data;
        }
    }
}
