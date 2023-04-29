namespace Core.Entities
{
    public interface IFileDescriptionRepository
    {
        public STLFileDescription GetFileDesc(int id);

        public STLStore GetLastStore();

        public List<STLStore> GetAllStores();

        public STLStore GetStore(int id);

    }
}
