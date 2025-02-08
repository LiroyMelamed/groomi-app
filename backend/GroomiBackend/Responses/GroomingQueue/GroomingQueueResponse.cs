using System.Collections.Generic;
using System.Runtime.Serialization;

namespace GroomiBackend.Models
{
    [DataContract]
    public class GroomingQueueResponse : GeneralResponse
    {
        public GroomingQueueResponse(GeneralResponse parent, List<GroomingQueue> queue) : base(parent)
        {
            Data = queue; 
        }

        public GroomingQueueResponse(bool success, string response, string requestLink, List<GroomingQueue> queue)
            : base(success, response, requestLink)
        {
            Data = queue; 
        }
    }
}
