using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{ 
    public class StoreViewerPreferences : ViewerPreferences
    {
      
        public int StoreId { get; set; }       
      
      
    }
}