using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infra.DB
{
    public class CAD_FileContext     {
     
        public string ContextPath { get; }

        public CAD_FileContext()
        {
      
            ContextPath =  @"C:\temp\store\";
       
        }

    
    }
}
