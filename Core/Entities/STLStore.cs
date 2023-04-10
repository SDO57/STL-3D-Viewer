using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{ 
    public class STLStore
    {
        [Key]
        public int StoreId { get; set; }

        public string Owner { get; set; }
        public List<STLFileDescription> Files { get; set; }
    }
}