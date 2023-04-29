using System.Collections.Generic;

namespace Model
{
    public class STLStoreModelView
    {
       
        public int StoreId { get; set; }

        public string StoreName { get; set; }

        public string Owner { get; set; }
        public List<STLFileModelView> Files { get; set; }
    }
}