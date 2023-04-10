using Core.Entities;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace Infra.DB
{
    public class FileRepository : IFileDataRepository
    {


        public Byte[] Get(string fileName)
        {
            var fc = new CAD_FileContext();

            var fullPath = System.IO.Path.Join(fc.ContextPath, fileName);

            Byte[] _data = File.ReadAllBytes(fullPath);
            return _data;
        }

        public void Put(Byte[] data, string fileName)
        {
            var fc = new CAD_FileContext();
    
            var fullPath = System.IO.Path.Join(fc.ContextPath, fileName);

            //Byte[] _data = 
            File.WriteAllBytes(fullPath, data);
        
        }
    }
}
