using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infra.DB
{
    public class CAD_DBContext : DbContext
    {
        public DbSet<STLFileDescription> STLFileDescriptions { get; set; }
        public DbSet<STLStore> STLStores { get; set; }

        public string ContextPath { get; }

        public CAD_DBContext()
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            path =  @"C:\temp\";
        ContextPath = System.IO.Path.Join(path, "STLStores.db");
        }

        // The following configures EF to create a Sqlite database file in the
        // special "local" folder for your platform.
        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite($"Data Source={ContextPath}");
    }
}
