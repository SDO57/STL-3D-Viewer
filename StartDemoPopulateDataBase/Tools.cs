using Core.Entities;
using Infra.DB;

public static class Tools
{
    public static void DirectoryToStore(string sourcePath, CAD_DBContext dbc, FileRepository fr)
    {
        string[] dirEntries = Directory.EnumerateDirectories(sourcePath).ToArray();

        foreach (string dirEntry in dirEntries)
        {
            DirectoryToStore(dirEntry, dbc, fr); 
        }

        // CREATE STORE
        Console.WriteLine($"Inserting a new store [{sourcePath.TrimEnd('\\').Split('\\').Last()}]");
        dbc.Add(new STLStore { Owner = sourcePath.TrimEnd('\\').Split('\\').Last(), Files = new List<STLFileDescription>() });
        dbc.SaveChanges();

        // INSERTION DES STL DANS LE DERNIER STORE CREE
        Console.WriteLine("Querying for a store");
        var store = dbc.STLStores
            .OrderByDescending(b => b.StoreId)
            .First();

        Console.WriteLine("Adding STL files in ");


        string[] fileEntries = Directory.GetFiles(sourcePath, "*.stl");
        foreach (var fullFileName in fileEntries)
        {
            string shortFileName = fullFileName.Replace(sourcePath, "").TrimStart('\\');
            Console.WriteLine($"Adding [{shortFileName}]");

            Byte[] Data = File.ReadAllBytes(fullFileName);

            fr.Put(Data, shortFileName);

            STLFileDescription stl_file = new STLFileDescription
            {
                StoreId = store.StoreId,
                FileName = shortFileName,
                FileSize = Data.Length,
                FileType = "STL",
                FileCodage = "Not Yet Implemented"

            };
            dbc.Add(stl_file);

            store.Files.Add(stl_file);
            dbc.SaveChanges();
        }
    }
}
