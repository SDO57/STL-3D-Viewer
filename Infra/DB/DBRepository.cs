using Core.Entities;

namespace Infra.DB
{
    public class DBRepository : IFileDescriptionRepository
    {



        public STLFileDescription GetFileDesc(int id)
        {
            using var db = new CAD_DBContext();

            //Acces au File identifié

            return db.STLFileDescriptions.Where(x => x.FileId == id).FirstOrDefault();
        }

        public STLStore GetLastStore()
        {
            using var db = new CAD_DBContext();

            //Acces au dernier Store créé
            var store = db.STLStores
        .OrderByDescending(s => s.StoreId)
        .First();

            var files = db.STLFileDescriptions.Where(f => f.StoreId == store.StoreId).ToArray();

            return store;
        }



        public List<STLStore> GetAllStores()
        {
            using var db = new CAD_DBContext();

            //Acces a tous les stores du plus recent au plus ancien
            var store = db.STLStores
        .OrderByDescending(s => s.StoreId)
        .ToList();

            var files = db.STLFileDescriptions.ToArray();

            return store;
        }


        public STLStore? GetStore(int id)
        {
            using var db = new CAD_DBContext();

            //Acces a tous les stores du plus recent au plus ancien
            var store = db.STLStores
            .Where(x=>x.StoreId == id)
            .FirstOrDefault();

            var files = db.STLFileDescriptions.ToArray();

            return store;
        }

       

    }
}
