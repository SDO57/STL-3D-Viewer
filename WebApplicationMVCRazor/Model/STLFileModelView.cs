using System;
using System.Collections.Generic;

namespace Model
{
    public class STLFileModelView
    {

        public int FileId { get; set; }

        public int StoreId { get; set; }
        public string StoreName { get; set; }
        public string FileName { get; set; }
        public string Codage { get; set; }
        public long FileSize { get; set; }
     
    }

}