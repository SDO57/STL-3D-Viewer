using System.Collections.Generic;

namespace Model
{
    public class STLStore
    {
       
        public int StoreId { get; set; }

        public string Owner { get; set; }
        public List<STLFile> Files { get; set; }
    }
}