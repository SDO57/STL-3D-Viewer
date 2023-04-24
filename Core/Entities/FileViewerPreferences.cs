using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{ 
    public class FileViewerPreferences : ViewerPreferences
    {
      
        public int FileId { get; set; }       
      
    }
}