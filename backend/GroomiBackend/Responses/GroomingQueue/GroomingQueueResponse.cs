using System.Collections.Generic;
using System.Runtime.Serialization;

namespace GroomiBackend.Models
{
    [DataContract]
    public class GroomingQueueResponse : GeneralResponse
    {
        [DataMember]
        public List<GroomingQueue> Queue { get; set; }

        public GroomingQueueResponse(GeneralResponse parent, List<GroomingQueue> queue) : base(parent)
        {
            Queue = queue;
        }
    }
}
