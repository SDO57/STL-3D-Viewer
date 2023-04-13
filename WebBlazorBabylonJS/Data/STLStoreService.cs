using Core.Entities;

namespace Data
{
    public class STLStoreService
    {
    

        public Task<STLStore> GetForecastAsync()
        {
            return Task.FromResult(
                  new Infra.DB.DBRepository().GetLastStore()
                  );
        }
    }
}