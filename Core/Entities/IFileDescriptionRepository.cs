namespace Core.Entities
{
    public interface IFileDescriptionRepository
    {
        public STLFileDescription Get(int id);

        public STLStore GetLastStore();

    }
}
