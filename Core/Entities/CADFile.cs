using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities
{
    public class CADFile
    {
        [Key]
        public int FileId { get; set; }
        [ForeignKey("Store")]
        public int StoreId { get; set; }

        public string FileName { get; set; }

        public long FileSize { get; set; }

        public string FileType { get; set; }


    }
}